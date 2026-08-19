# Cyoda Developer Console Website Reference

This note replaces the original implementation brief, which no longer described
the released Console or its supported platforms. Use the Console repository's
[`README.md`](https://github.com/cyoda/cyoda-dev-console/blob/main/README.md)
and [`RELEASE.md`](https://github.com/cyoda/cyoda-dev-console/blob/main/RELEASE.md)
as the authoritative sources when updating website copy.

## Product facts

- Cyoda Developer Console is a Tauri desktop application for inspecting and
  correcting generated workflow JSON during the build phase.
- It works with local workflow files and does not require a running Cyoda
  environment.
- The website must not present the Console as read-only or as a runtime client.

## Availability and installation

- macOS supports Apple Silicon and Intel through the Homebrew cask.
- Linux supports ARM64 and x86_64 through versioned AppImage downloads.
- Windows is supported through a documented source build; no prebuilt Windows
  binary is published.
- The Console's install journey must stand on its own. Do not require users to
  install, start, or connect a Cyoda runtime before using it.

The release page is the appropriate link for platform downloads. The Windows
source-build instructions are in the Console repository's release guide.

## Website representation

Any workflow diagram used on the website is an illustrative workflow display,
not a product screenshot or evidence that the Console is read-only. Label it as
an example unless it is replaced with an accurate, current Console capture.
