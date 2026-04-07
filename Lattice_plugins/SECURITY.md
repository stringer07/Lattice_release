# Security Policy

The Lattice Scholar project takes security issues seriously, particularly because the Word add-in in this repository communicates with a local HTTP API exposed by the Lattice Scholar desktop application. We appreciate responsible disclosure from security researchers and the wider community.

## Scope

This security policy covers the contents of this repository (`Lattice_plugins`), which includes:

- The Word add-in source code under `word-addin/web/`
- The installer scripts (`install.command`, `uninstall.command`) and the Office manifest template
- Any plugin clients that talk to the Lattice Scholar Local API and that are distributed from this repository

The Lattice Scholar desktop application itself is **not** open source and is **not** in the scope of this repository. If you find a vulnerability in the Lattice Scholar desktop application (for example, in the Local API server, the document store, or the macOS app bundle), please report it through the same channel below — we will route it to the appropriate maintainer.

## Reporting a vulnerability

**Please do not file public GitHub issues for security problems.** Public issues are visible to everyone and create a window of exposure for unpatched users.

Instead, please report vulnerabilities through one of the following:

1. **Preferred — GitHub private security advisory**:
   Open a private security advisory at [https://github.com/stringer07/Lattice_release/security/advisories/new](https://github.com/stringer07/Lattice_release/security/advisories/new). This keeps the report private to the maintainer until a fix is ready.
2. **Alternative — direct contact**:
   If you cannot use the GitHub advisory flow, open a public issue **without any vulnerability details** asking the maintainer to contact you privately, and we will respond with a private channel.

When reporting, please include as much of the following as you can:

- A description of the vulnerability and the impact you believe it has
- Steps to reproduce, ideally with a minimal proof of concept
- Affected file paths, versions, or commit hashes
- Whether the vulnerability requires user interaction, network access, or specific Lattice Scholar versions
- Any suggested mitigations, if you have them
- Whether you would like public credit when the issue is disclosed

## What to expect

- **Acknowledgement**: We aim to acknowledge new reports within a few days.
- **Triage**: We will investigate, attempt to reproduce, and assess severity.
- **Fix and disclosure**: Once a fix is ready, we will coordinate disclosure timing with you. Public disclosure normally happens after a release that includes the fix, with credit to the reporter unless they prefer to remain anonymous.

## Areas of particular interest

Because the Word add-in talks to a local HTTP API on `127.0.0.1`, we are especially interested in reports about:

- **Cross-origin exposure** of the Local API to unintended web origins (other browsers, other Word add-ins, or other local processes)
- **Path or query injection** in the API client paths (`/api/v1/search`, `/api/v1/papers/:id`)
- **Untrusted input rendering** in the taskpane UI, including search results, paper metadata, and CSL output
- **Custom CSL file parsing** — the add-in lets users load arbitrary CSL files; we want to know about any way this could be abused (e.g. XML external entities, injection into the bibliography)
- **Word content control tag manipulation** that could trick the add-in into reading or writing the wrong document state
- **Installer behavior** on macOS — the `install.command` script copies files into Office and Lattice container directories; we want to know about any way it could be abused as a privilege escalation or arbitrary write vector

## Out of scope

The following are generally **not** considered vulnerabilities for this repository on their own:

- Issues that require physical access to a user's already-unlocked machine
- Denial of service against the Lattice Scholar desktop application caused by sending oversized requests to its Local API (this is a desktop application concern, not a plugin concern)
- Self-XSS in user-supplied custom CSL files where the user is the only victim
- Best-practice deviations without a demonstrated impact (e.g. "you should add HSTS to a localhost server")

If in doubt, **report it anyway** — we would rather triage a borderline report than miss a real issue.

## Safe harbor

We will not pursue legal action against security researchers who:

- Make a good-faith effort to follow this policy
- Avoid privacy violations, data destruction, and degradation of service
- Do not exploit a vulnerability beyond the minimum needed to demonstrate it
- Give us a reasonable opportunity to respond before any public disclosure

Thank you for helping keep Lattice Scholar users safe.
