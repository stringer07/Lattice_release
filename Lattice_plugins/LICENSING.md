# Licensing Notes

> Effective date: 2026-04-07 · Version: 1.0

This repository is intended to be published as source-available, not as OSI-approved open source.

The current licensing uses:

- [LICENSE](./LICENSE): PolyForm Shield 1.0.0 for original project-authored material
- [NOTICE](./NOTICE): pass-through notices, prominent attribution requirement (with anti-removal language), and the licensor's line of business
- [TRADEMARKS.md](./TRADEMARKS.md): no trademark license and anti-confusion policy
- [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md): bundled third-party materials that stay under their own licenses (notably citeproc-js under CPAL §14 and CSL styles under CC BY-SA 3.0)

## Contributions

By submitting a pull request or other contribution to this repository, you agree to the terms in [CONTRIBUTING.md](./CONTRIBUTING.md). In summary:

- Your contribution is licensed inbound under the same PolyForm Shield 1.0.0 as the rest of the project (inbound = outbound).
- You retain copyright ownership of your contribution.
- You additionally grant the project maintainer a perpetual, non-exclusive license to relicense your contribution under any other license — including future commercial licenses — so the project can offer commercial terms to customers without chasing every historical contributor. The public version remains under PolyForm Shield 1.0.0.
- You are equally protected by the license's Noncompete clause in the public version: no competing reference-management product may use your contributed code through that public grant.

All contributors are collectively credited as "The Lattice Scholar Project Contributors" in the copyright notice.

## Important notes

- The `Required Notice:` lines in [NOTICE](./NOTICE) define the prominent attribution requirement. Any public redistribution must credit the Lattice Scholar project in a location visible to end users, and must not remove, hide, obscure, or replace that attribution surface with a non-equivalent one.
- The repository includes third-party code and style assets under other licenses. Those files are not automatically relicensed by the project-level license. The Word add-in's runtime Credits panel (in `word-addin/web/taskpane/taskpane.html`) is the user-visible attribution surface that satisfies CPAL §14 for citeproc-js and acknowledges the CSL project for bundled styles. **Forks and redistributions must preserve a functionally equivalent runtime attribution surface.**
- The trademark policy refers to `Lattice Scholar` as the product name and reserves the standalone word `Lattice` within the field of reference-management and citation software.

## Pre-publication checklist

1. Verify that your distribution of `citeproc.js` and vendored CSL/locales satisfies their upstream terms, including the runtime Credits panel.
2. Ensure CPAL attribution requirements for citeproc.js are met in any user-facing "About" or Credits area.
3. If you remove or restyle the taskpane footer, ensure the "Credits & Open Source Notices" link remains reachable.

