// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// Copyright (c) 2026 The Lattice Scholar Project Contributors
const STORE_NAMESPACE = "https://lattice.app/word-citation-store/v1";
const STORE_ROOT = "latticeCitationStore";

export function createEmptyStore() {
  return {
    schemaVersion: 1,
    style: {
      type: "builtin",
      builtinId: "ieee",
      label: "IEEE Numeric",
      customName: null,
      customCSL: null
    },
    items: {},
    updatedAt: new Date().toISOString()
  };
}

export function upsertStoreItem(store, snapshot) {
  return {
    ...normalizeStore(store),
    items: {
      ...normalizeStore(store).items,
      [snapshot.id]: snapshot
    },
    updatedAt: new Date().toISOString()
  };
}

export function setStoreStyle(store, styleSelection) {
  return {
    ...normalizeStore(store),
    style: { ...styleSelection },
    updatedAt: new Date().toISOString()
  };
}

export async function loadStore() {
  return Word.run(async (context) => {
    const scopedParts = context.document.customXmlParts.getByNamespace(STORE_NAMESPACE);
    scopedParts.load("items");
    await context.sync();

    if (!scopedParts.items.length) {
      return createEmptyStore();
    }

    const xmlResult = scopedParts.items[0].getXml();
    await context.sync();
    return parseStoreXml(xmlResult.value);
  });
}

export async function saveStore(store) {
  const normalizedStore = normalizeStore(store);

  return Word.run(async (context) => {
    const scopedParts = context.document.customXmlParts.getByNamespace(STORE_NAMESPACE);
    scopedParts.load("items");
    await context.sync();

    for (const part of scopedParts.items) {
      part.delete();
    }

    context.document.customXmlParts.add(serializeStoreXml(normalizedStore));
    await context.sync();
    return normalizedStore;
  });
}

function normalizeStore(store) {
  const normalized = store && typeof store === "object" ? store : createEmptyStore();
  const style = normalized.style && typeof normalized.style === "object" ? normalized.style : createEmptyStore().style;
  const items = normalized.items && typeof normalized.items === "object" ? normalized.items : {};

  return {
    schemaVersion: 1,
    style: {
      type: style.type === "custom" ? "custom" : "builtin",
      builtinId: style.builtinId ?? "ieee",
      label: style.label ?? "IEEE Numeric",
      customName: style.customName ?? null,
      customCSL: style.customCSL ?? null
    },
    items,
    updatedAt: normalized.updatedAt ?? new Date().toISOString()
  };
}

function serializeStoreXml(store) {
  const payload = escapeXml(JSON.stringify(store));
  return `<?xml version="1.0" encoding="UTF-8"?><${STORE_ROOT} xmlns="${STORE_NAMESPACE}"><payload>${payload}</payload></${STORE_ROOT}>`;
}

function parseStoreXml(xml) {
  try {
    const document = new DOMParser().parseFromString(xml, "text/xml");
    const payloadNode = document.getElementsByTagName("payload")[0];
    if (!payloadNode?.textContent) {
      return createEmptyStore();
    }
    return normalizeStore(JSON.parse(payloadNode.textContent));
  } catch {
    return createEmptyStore();
  }
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&apos;");
}
