# Third-Party Notices

> Effective date: 2026-04-07 · Version: 1.0

This repository contains third-party materials. The project license in [LICENSE](./LICENSE) (PolyForm Shield 1.0.0) applies only to original material that the licensor is able to license. Third-party files remain under their own upstream terms and are **not** relicensed by this project.

The Lattice Scholar project ships these third-party materials with mandatory user-visible attribution. The Word add-in displays a Credits panel that satisfies these obligations at runtime; see [`word-addin/web/taskpane/taskpane.html`](./word-addin/web/taskpane/taskpane.html).

## `word-addin/web/vendor/citeproc/citeproc.js` — citeproc-js

- **Author / Copyright**: Copyright (c) 2009-2019 Frank Bennett
- **Upstream project**: https://github.com/Juris-M/citeproc-js
- **Upstream notice in file header** ([citeproc.js](./word-addin/web/vendor/citeproc/citeproc.js#L1)) states the file is offered under **either**:
  - the Common Public Attribution License (CPAL), version 1 or later, **OR**
  - the GNU Affero General Public License (AGPL), version 3 or later

### License election

The Lattice Scholar project **elects to use citeproc-js under the Common Public Attribution License (CPAL) version 1**, as offered by the dual-license option in the file header. The AGPL option is **not** elected, and no AGPL obligations are accepted or imposed by inclusion of this file in this repository.

This election applies to all current and future distributions of citeproc-js made by or as part of the Lattice Scholar project, unless explicitly stated otherwise.

### CPAL §14 Attribution Information

CPAL §14 requires that any product derived from or incorporating CPAL-licensed code display an Attribution Notice in a user-visible part of the user interface every time the product is used. The Lattice Scholar Word add-in satisfies this by:

- Displaying a "Credits / Open Source Notices" link in the taskpane footer that opens an inline Credits panel.
- The Credits panel names citeproc-js, its author Frank Bennett, the CPAL license election, and a link to the upstream project.

Downstream redistributors who modify the Word add-in **must preserve a functionally equivalent attribution surface** in their user interface. Removing, hiding, or obscuring the Credits panel without an equivalent replacement is a violation of CPAL §14 and terminates the CPAL grant for citeproc-js.

### CPAL Source Availability

CPAL also requires source-form availability. The full, unmodified source of citeproc-js is included in this repository at [`word-addin/web/vendor/citeproc/citeproc.js`](./word-addin/web/vendor/citeproc/citeproc.js) and is distributed alongside any binary or compiled distribution of the Word add-in.

## CSL styles and locales — `word-addin/web/vendor/csl/` and `word-addin/web/vendor/locales/`

Bundled example files include:

- [`apa.csl`](./word-addin/web/vendor/csl/apa.csl)
- [`ieee.csl`](./word-addin/web/vendor/csl/ieee.csl)
- [`chicago-notes-bibliography.csl`](./word-addin/web/vendor/csl/chicago-notes-bibliography.csl)
- [`locales-en-US.xml`](./word-addin/web/vendor/locales/locales-en-US.xml)

- **Source**: The Citation Style Language (CSL) project — https://citationstyles.org/ — and the official CSL styles repository at https://github.com/citation-style-language/styles
- **License**: As declared in each file's embedded `<info>` metadata, these files are licensed under the **Creative Commons Attribution-ShareAlike 3.0 Unported license (CC BY-SA 3.0)** — https://creativecommons.org/licenses/by-sa/3.0/

### CC BY-SA 3.0 obligations

- **ShareAlike scope**: ShareAlike applies to derivative works of the CSL files themselves. It does **not** propagate to JavaScript code that merely consumes these files at runtime. This project distributes the CSL files unmodified; if you modify them, you must release the modified `.csl` files under CC BY-SA 3.0 (or a compatible later version) and preserve their `<info>` metadata.
- **Attribution**: The Word add-in's Credits panel acknowledges the CSL project as the source of bundled citation styles. Downstream redistributors must preserve this attribution.

## Pre-publication checklist

1. Verify the bundled `citeproc.js` matches an upstream release and that the file header (license block) is intact and unmodified.
2. Verify that the Credits panel in the Word add-in renders in production builds and is reachable from the taskpane footer.
3. Verify that bundled CSL styles and locale files retain their `<info>` metadata blocks (the metadata is the legal vehicle for the CC BY-SA 3.0 declaration).
4. If you add new third-party dependencies, append them to this file and update the Credits panel before publishing.
