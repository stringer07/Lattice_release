# Changelog

 [中文更新日志](./CHANGELOG.zh-CN.md)

This file records notable changes for Lattice.

## v1.0-beta3 - 2026-03-21

#### Fixed

- Fixed a critical crash that could occur when deleting an item after previewing an attached PDF.
- Attempting to preview or open a PDF for an item without an attachment, or with a missing attachment, now shows an alert instead of failing silently or behaving unexpectedly.

#### Improved

- Improved title metadata cleanup. After a title is extracted, it is now cleaned once more to remove garbled HTML tags and similar artifacts.

## v1.0-beta2 - 2026-03-20

- Initial public beta release.
