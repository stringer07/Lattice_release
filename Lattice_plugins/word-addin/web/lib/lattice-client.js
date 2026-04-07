// SPDX-License-Identifier: LicenseRef-PolyForm-Shield-1.0.0
// Copyright (c) 2026 The Lattice Scholar Project Contributors
async function requestJson(path) {
  const response = await fetch(`/api/v1${path}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`;
    try {
      const payload = await response.json();
      if (payload?.error) {
        message = payload.error;
      }
    } catch {
      // Ignore invalid error payloads.
    }
    throw new Error(message);
  }

  return await response.json();
}

export async function getBridgeStatus() {
  return requestJson("/status");
}

export async function searchLattice(query, limit = 10) {
  const encodedQuery = encodeURIComponent(query ?? "");
  const encodedLimit = encodeURIComponent(String(limit));
  return requestJson(`/search?q=${encodedQuery}&limit=${encodedLimit}`);
}

export async function fetchPaperSnapshot(id) {
  return requestJson(`/papers/${encodeURIComponent(id)}`);
}
