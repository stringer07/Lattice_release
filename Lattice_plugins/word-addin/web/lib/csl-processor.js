// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// Copyright (c) 2026 The Lattice Scholar Project Contributors
const builtinStyles = [
  {
    id: "ieee",
    label: "IEEE Numeric",
    noteStyle: false,
    url: "/plugins/word-addin/vendor/csl/ieee.csl"
  },
  {
    id: "apa",
    label: "APA 7th",
    noteStyle: false,
    url: "/plugins/word-addin/vendor/csl/apa.csl"
  }
  // Note-style CSLs (e.g. Chicago Notes) are excluded because the current
  // word-bridge inserts inline content controls, not Word footnotes.
  // Adding footnote support requires WordApi footnote insertion + separate
  // citation collection from footnote bodies.
];

const localeUrl = "/plugins/word-addin/vendor/locales/locales-en-US.xml";
const textCache = new Map();

export function getBuiltinStyles() {
  return builtinStyles.map((style) => ({ ...style }));
}

export async function renderCitationsAndBibliography(store, citationIds) {
  if (!globalThis.CSL) {
    throw new Error("citeproc-js failed to load.");
  }

  const uniqueCitationIds = [...new Set(citationIds)];
  const resolvedItems = Object.fromEntries(
    uniqueCitationIds.map((id) => {
      const item = store.items[id];
      if (!item) {
        throw new Error(`Missing metadata for citation ${id}.`);
      }
      return [id, item.cslItem];
    })
  );

  const localeMarkup = await loadText(localeUrl);
  const styleSelection = resolveStyleSelection(store.style);
  const styleMarkup = styleSelection.type === "custom"
    ? styleSelection.customCSL
    : await loadText(styleSelection.url);

  if (!styleMarkup) {
    throw new Error("No CSL style markup is available.");
  }

  const processor = new CSL.Engine(
    {
      retrieveItem(id) {
        return resolvedItems[id] ?? null;
      },
      retrieveLocale() {
        return localeMarkup;
      }
    },
    styleMarkup
  );
  processor.setOutputFormat("text");
  processor.updateItems(uniqueCitationIds);

  const renderedCitations = new Array(citationIds.length).fill("");
  const citationRegistry = [];

  citationIds.forEach((id, index) => {
    const citation = {
      citationID: `lattice-citation-${index}`,
      citationItems: [{ id }],
      properties: {
        noteIndex: styleSelection.noteStyle ? index + 1 : 0
      }
    };

    const result = processor.processCitationCluster(
      citation,
      citationRegistry.map((entry) => [entry.citationID, entry.noteIndex]),
      []
    );

    const updates = Array.isArray(result?.[1]) ? result[1] : [];
    for (const update of updates) {
      const position = update?.[0];
      const text = update?.[1];
      if (Number.isInteger(position) && typeof text === "string") {
        renderedCitations[position] = cleanupText(text);
      }
    }

    citationRegistry.push({
      citationID: citation.citationID,
      noteIndex: citation.properties.noteIndex
    });
  });

  const bibliography = processor.makeBibliography();
  const entries = Array.isArray(bibliography?.[1])
    ? bibliography[1].map((entry) => cleanupText(entry)).filter(Boolean)
    : [];
  const bibliographyText = [
    "Bibliography",
    "",
    ...entries
  ].join("\n");

  return {
    bibliographyText,
    renderedCitations
  };
}

function resolveStyleSelection(style) {
  if (style?.type === "custom" && style.customCSL) {
    // noteStyle is always false: word-bridge only inserts inline content
    // controls. Note-style CSLs (class="note") require Word footnote/endnote
    // insertion which is not yet implemented. Forcing noteStyle: false makes
    // citeproc produce in-text citations, which is an acceptable degradation
    // compared to dumping full footnote text inline.
    return {
      type: "custom",
      label: style.customName || "Custom CSL",
      customCSL: style.customCSL,
      noteStyle: false
    };
  }

  const builtin = builtinStyles.find((entry) => entry.id === style?.builtinId) ?? builtinStyles[0];
  return {
    ...builtin,
    type: "builtin"
  };
}

async function loadText(url) {
  if (!textCache.has(url)) {
    textCache.set(
      url,
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "text/plain, text/xml, application/xml"
        }
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
    );
  }

  return textCache.get(url);
}

function cleanupText(value) {
  const stripped = value.replace(/<[^>]+>/g, "");
  const parsed = new DOMParser().parseFromString(`<body>${stripped}</body>`, "text/html");
  return (parsed.body.textContent || stripped).trim();
}
