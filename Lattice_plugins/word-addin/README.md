# Lattice Scholar Word Add-in

[中文说明](./README.zh-CN.md)

![Lattice Scholar Word Add-in Demo](./demo/demo.png)

This plugin lets you search your Lattice Scholar library from Microsoft Word, insert citation placeholders, and generate formatted citations plus a bibliography inside the document.

The current implementation is a local Office Add-in hosted by Lattice itself. It talks to the Lattice Local API on `127.0.0.1` and installs a Word manifest into the local Word container on macOS.

## Requirements

- Lattice Scholar `> 1.2`
- Local API enabled in Lattice Scholar
- Microsoft Word that supports `WordApi 1.4`
- macOS for the installer in this repository

## What This Plugin Does

- Search your Lattice library by title, author, year, or citekey
- Show recent papers when the search box is empty
- Insert citation placeholders into the current Word selection
- Render formatted citations and a bibliography using CSL
- Support built-in styles:
  - `IEEE Numeric`
  - `APA 7th`
- Support loading a custom CSL file
- Persist citation metadata and style selection inside the Word document

## How It Works

This add-in depends on the Lattice Local API and local plugin hosting.

It uses these API endpoints:

- `GET /api/v1/status`
- `GET /api/v1/search?q=...&limit=...`
- `GET /api/v1/papers/:id`

It also loads the add-in web assets from the Lattice local origin:

- `http://127.0.0.1:<port>/plugins/word-addin/...`

Port behavior:

- The installer automatically reads the port from the macOS defaults key `com.aurelian.Lattice:citationBridgePort`
- If no saved port exists, it falls back to `52731`
- In normal use, you do not need to specify the port manually
- If the Local API port changes later, uninstall and reinstall the Word add-in so the manifest points to the new local origin

Because of this architecture, Lattice Scholar must be running whenever Word needs to:

- connect to the add-in
- search the library
- fetch paper metadata
- refresh citations and bibliography

## Install

Download the release package first:

- Release page:
  `https://github.com/stringer07/Lattice_release/releases/tag/word-addin-v1.0.0.0`
- Direct zip download:
  `https://github.com/stringer07/Lattice_release/releases/download/word-addin-v1.0.0.0/Lattice-Word-Addin-macOS-1.0.0.0.zip`

Installation steps:

1. Launch Lattice Scholar at least once.
2. Enable the Local API in Lattice Scholar.
3. Keep Lattice Scholar running.
4. Download `Lattice-Word-Addin-macOS-1.0.0.0.zip`.
5. Extract the downloaded zip file.
6. Open the extracted `Lattice-Word-Addin-macOS-1.0.0.0/word-addin/` folder.
7. Double-click `install.command` to run the installer.

If you prefer the command line, run:

```bash
cd Lattice-Word-Addin-macOS-1.0.0.0/word-addin
./install.command
```

If macOS blocks the script, right-click `install.command`, choose `Open`, and confirm the prompt.

After installation:

1. Quit Microsoft Word completely.
2. Reopen Word.
3. Open the `Home` tab and look in the `Add-ins` area for the Lattice entry.

## Use

1. Open a Word document.
2. Click `Home` -> `Add-ins` and open `Lattice`.
3. Wait for the connection badge to show the Lattice app version.
4. Search by title, author, year, or citekey.
5. Click a result to insert a citation placeholder at the current cursor position.
6. Choose a citation style or load a custom CSL file.
7. Click `Update Citations & Bibliography`.

What happens during update:

- the add-in scans the document for Lattice citation controls
- missing citation metadata is fetched from the Local API
- citations are re-rendered in document order
- a managed bibliography block is inserted or updated near the end of the document

## Uninstall

1. Quit Microsoft Word.
2. Open the extracted `Lattice-Word-Addin-macOS-1.0.0.0/word-addin/` folder.
3. Double-click `uninstall.command`.

If you prefer the command line, run:

```bash
cd Lattice-Word-Addin-macOS-1.0.0.0/word-addin
./uninstall.command
```

4. Reopen Word.

This removes:

- the plugin files copied into the Lattice container
- the Word manifest installed into Word's local `wef` directory

If the Lattice Local API port has changed, use this uninstall flow first and then run `./install.command` again.

## Contributing

PRs are welcome.

That includes more than the Word add-in. Contributions are welcome for:

- improvements to `word-addin`
- new plugins built on top of the Lattice Local API
- better install flows
- better citation rendering and style support
- footnote or endnote support
- documentation, tests, and examples for Local API-based plugins

If you open a PR, please include:

- what problem the change solves
- any Local API assumptions or endpoint changes
- installation or migration notes if needed
- manual test steps for user-visible behavior

If you are building a new plugin on top of the Local API, this repository is a good place to contribute it.
