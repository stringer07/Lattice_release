// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// Copyright (c) 2026 The Lattice Scholar Project Contributors
const citationPrefix = "lattice-citation:v1:";
const bibliographyTag = "lattice-bibliography:v1";

export function hasRequiredWordApi() {
  return Office.context.requirements.isSetSupported("WordApi", "1.4");
}

export async function insertCitationPlaceholder(snapshot) {
  return Word.run(async (context) => {
    const selection = context.document.getSelection();
    const contentControl = selection.insertContentControl();
    contentControl.tag = `${citationPrefix}${snapshot.id}`;
    contentControl.title = `Lattice Citation ${snapshot.citekey}`;
    contentControl.appearance = Word.ContentControlAppearance.boundingBox;
    contentControl.insertText(`[${snapshot.citekey}]`, Word.InsertLocation.replace);
    await context.sync();
  });
}

export async function collectCitationIds() {
  return Word.run(async (context) => {
    const controls = context.document.contentControls;
    controls.load("items/tag");
    await context.sync();

    return controls.items
      .map((control) => control.tag || "")
      .filter((tag) => tag.startsWith(citationPrefix))
      .map((tag) => tag.slice(citationPrefix.length))
      .filter(Boolean);
  });
}

export async function applyRenderedCitations(renderedCitations) {
  return Word.run(async (context) => {
    const controls = context.document.contentControls;
    controls.load("items/tag");
    await context.sync();

    const citationControls = controls.items.filter((control) => (control.tag || "").startsWith(citationPrefix));
    citationControls.forEach((control, index) => {
      const text = renderedCitations[index];
      if (typeof text === "string" && text.length) {
        control.insertText(text, Word.InsertLocation.replace);
      }
    });

    await context.sync();
  });
}

export async function upsertBibliography(bibliographyText) {
  return Word.run(async (context) => {
    const controls = context.document.contentControls;
    controls.load("items/tag");
    await context.sync();

    const bibliographyControl = controls.items.find((control) => control.tag === bibliographyTag);
    if (bibliographyControl) {
      bibliographyControl.insertText(bibliographyText, Word.InsertLocation.replace);
      await context.sync();
      return;
    }

    const paragraph = context.document.body.insertParagraph("", Word.InsertLocation.end);
    const contentControl = paragraph.insertContentControl();
    contentControl.tag = bibliographyTag;
    contentControl.title = "Lattice Bibliography";
    contentControl.appearance = Word.ContentControlAppearance.boundingBox;
    contentControl.insertText(bibliographyText, Word.InsertLocation.replace);
    await context.sync();
  });
}
