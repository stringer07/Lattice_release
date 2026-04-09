# Changelog

 [中文更新日志](./CHANGELOG.zh-CN.md)

This file records notable changes for Lattice.

## v2.0(7)

#### Added

- Added macOS 14.0 support.

## v2.0(4)

#### Added

- Added a collection context menu option to choose whether papers from subcollections are shown.

## v2.0(2)

#### Major

- Added support for multi-level collections, with up to three levels.
- Collections and tags can now be reordered via drag and drop.

#### Fixed

- Fixed lag when expanding or collapsing the right panel at the minimum window width.

#### Improved

- Reworked much of the concurrency logic, which is expected to improve overall stability.

## v1.3.2

#### Added

- Added a local port that allows external plugins to be built and used through it, including plugins such as a Word plugin.
- Added two new export template variables, `latticeurl` and `pdfurl`. Clicking `latticeurl` jumps back to Lattice and focuses the specified reference; clicking `pdfurl` opens the linked PDF when available.

#### Improved

- Updated the default template to include `latticeurl` and `pdfurl`, along with minor style adjustments.
- Significantly improved performance and reduced memory usage when importing large numbers of PDFs.
- Refactored the main page internals to make the experience smoother and lower in memory usage while keeping the visual appearance unchanged. This also fixes the occasional squeezing and lag when expanding or collapsing the left sidebar.

#### Fixed

- Fixed several bugs, including the issue where the template interface height could jump unexpectedly.

## v1.0-rc - 2026-03-31

#### Major

- Modified the shortcut popup page; selecting papers via shortcuts now supports searching.
- Renamed the application to Lattice Scholar to avoid naming conflicts with existing apps.

## v1.0-beta11-pre1 - 2026-03-28

#### Improved

- Strengthened abstract retrieval so more abstracts can be found reliably.

#### Fixed

- Fixed some cases where PDFs could be matched to incorrect metadata.

## v1.0-beta10 - 2026-03-28

#### Major

- Added language switching in Settings, with support for Simplified Chinese and English.
- Refined the layout of the right-side detail inspector so page numbers no longer wrap automatically and disrupt the visual rhythm.

## v1.0-beta9 - 2026-03-28

#### Major

- Added book metadata retrieval support.
- Further improved metadata retrieval accuracy and speed.
- Moved the metadata retrieval progress bar to the left column so it stays quieter and less intrusive.
- Added full help documentation, available from `Help` in the top-right corner and from `Lattice Help`.
- Added light cleanup for PDF annotations so extracted content reads more naturally.
- Refined the typography in the right-side detail inspector for better visual consistency.
- Refreshing metadata from the context menu now updates only metadata and PDF annotations; it no longer organizes or renames PDFs as part of the refresh flow.

## v1.0-beta8 - 2026-03-27

#### Major

- Added folder drag-and-drop import: Lattice now recursively scans the dropped folder and subfolders for PDFs and imports them.
- Import/refresh now shows a progress bar indicator.
- Enhanced metadata retrieval to cover more cases that previously failed.
- Tweaked the Settings layout so the “Lattice Settings” title no longer overlaps the content.

## v1.0-beta7 - 2026-03-25

#### Major

- Items added via drag-and-drop or creation while a specific collection/tag is selected now inherit that collection/tag, and organize operations follow the currently selected collection.
- Added PDF renaming: configure a naming template and either rename attachments via the item context menu or auto-rename on import.
- Added an option to delete the PDF attachment when deleting an item.
- Merged Export and Citation settings into a single tab to keep the Settings page simpler.

## v1.0-beta6 - 2026-03-24

#### Major

- Fully rebuilt the Settings UI using AppKit. This is a substantial refactor and should also help resolve the previous layout compression issues on different monitor sizes.

## v1.0-beta5 - 2026-03-23

#### Major

- Added PDF attachment organizing: you can now specify whether to move or copy attachments into a chosen folder and have them grouped by year, collection, or the first letter of the author’s surname.
- Rebuilt the Settings page for a cleaner, more coordinated, and more refined layout.

## v1.0-beta5-pre3 - 2026-03-23

#### Fixed

- Addressed the display compression issue that could occur on some monitor sizes within the Settings page.

## v1.0-beta5-pre2 - 2026-03-23

#### Fixed

- Urgent: fixed an issue where specifying certain third-party PDF readers would fail to open some PDFs.

## v1.0-beta4-pre2 - 2026-03-22

#### Added

- Added a new `General` section in Settings where users can manually specify their preferred PDF reader and the app appearance; the main window now labels the placeholder item list as `Missing PDF` instead of `Missing Attachment` for a cleaner visual match.

## v1.0-beta4-pre1 - 2026-03-22

#### Note

- This build includes a relatively large internal refactor and is therefore published as `pre1` for the `beta4` cycle. Additional edge cases may still surface, so feedback is especially valuable in this release.

#### Fixed

- Fixed a resource leak where file access permissions could remain unreleased after previewing a PDF and then closing the preview window.
- Fixed a data corruption issue in the detail inspector where authors written in `"Last, First"` format could be incorrectly split into two separate people when edited.
- Fixed a crash that could occur when HTML abstract decoding was invoked on a background thread during metadata retrieval.
- Fixed an occasional crash when switching sidebar filters after a batch BibTeX import.
- Fixed a crash caused by concurrent background metadata fetch tasks accessing the database at the same time during batch import, which could lead to memory corruption.
- Fixed a crash that could occur when deleting a paper that was currently being previewed, while the detail inspector was still attempting to access deleted data.
- Fixed a potential crash during import where the paper list could still try to read data that was not yet ready under certain filter conditions.

#### Improved

- Updated several views that do not need real-time paper updates from persistent subscriptions to on-demand queries, reducing unnecessary UI refreshes.
- Optimized sidebar filter count calculation by moving it from per-paper iteration to direct database-level aggregation, improving performance for large libraries.
- Optimized citekey collection queries so that only papers with citekeys are scanned, reducing unnecessary database load.

## v1.0-beta3 - 2026-03-21

#### Fixed

- Fixed a critical crash that could occur when deleting an item after previewing an attached PDF.
- Attempting to preview or open a PDF for an item without an attachment, or with a missing attachment, now shows an alert instead of failing silently or behaving unexpectedly.

#### Improved

- Improved title metadata cleanup. After a title is extracted, it is now cleaned once more to remove garbled HTML tags and similar artifacts.

## v1.0-beta2 - 2026-03-20

- Initial public beta release.
