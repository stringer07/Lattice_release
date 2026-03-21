# Changelog

 [中文更新日志](./CHANGELOG.zh-CN.md)

This file records notable changes for Lattice.

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
