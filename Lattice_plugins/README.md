# Lattice Scholar Plugins

[中文版](./README.zh-CN.md)

This repository contains community-driven plugins and extensions for [Lattice Scholar](https://stringer07.github.io/Lattice_release/), built on top of the Lattice Scholar Local API.

## Available Plugins

### Word Add-in

A Microsoft Word add-in for inserting citations and generating bibliographies directly from your Lattice Scholar library.

- Search your library without leaving Word
- Insert citations as inline references
- Generate formatted bibliographies (IEEE, APA, or custom CSL styles)
- Automatic metadata sync with Lattice Scholar

See [`word-addin/`](./word-addin/) for details.

## Local API

When Lattice Scholar is running, it exposes a local HTTP API that plugins can use to interact with the user's library:

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/status` | Check connection status and app version |
| `GET /api/v1/search?q=...&limit=...` | Search papers in the library |
| `GET /api/v1/papers/:id` | Fetch full metadata for a paper |

You can build plugins in any language or platform — desktop apps, browser extensions, editor integrations, CLI tools, or anything else that can make HTTP requests.

## Contributing

Contributions are welcome! You can:

- Build a **new plugin** on the Local API (for any editor, platform, or workflow)
- Improve the **existing Word add-in** (features, bug fixes, etc.)
- Improve **documentation** and examples

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

All contributors retain copyright of their work and are equally protected under the project license 

## License

This project is **source-available** under the [PolyForm Shield 1.0.0](./LICENSE).

- You are free to use, modify, and redistribute this software for any non-competing purpose.
- Public redistributions must include **prominent attribution** to the Lattice Scholar project.

This is not OSI-approved open source software. See [LICENSING.md](./LICENSING.md) for full details.
