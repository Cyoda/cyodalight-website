# Cyoda Developer Console v0.1.0 Website Implementation Specification

**Target:** `https://cyoda.dev`  
**Audience:** Codex or an experienced frontend engineer working in the existing Cyoda website repository  
**Status:** Approved implementation specification  
**Release:** `cyoda-dev-console` v0.1.0  
**Date:** 20 July 2026

---

## 1. Objective

Add the released **Cyoda Developer Console v0.1.0** to `cyoda.dev` without changing the website’s primary positioning.

The website must continue to present **Cyoda as an open-source EDBMS and workflow runtime**. The Developer Console is an optional companion application that provides visual evidence of the growing developer ecosystem and improves the AI-assisted development loop.

The implementation must:

1. Preserve the current homepage hero and its single primary runtime-install journey.
2. Add one substantial Developer Console section to the homepage.
3. Create one dedicated `/dev-console` page.
4. Add the console to the installation documentation as an optional preview.
5. Position the console around the differentiated workflow:
   **generate with AI → inspect and refine visually → run on the Cyoda runtime**.
6. Describe only capabilities that are demonstrably present in v0.1.0.
7. Clearly state that the release is an early preview for **macOS Apple Silicon**.
8. Prefer screenshots and video evidence over unsupported marketing claims.

---

## 2. Product and Messaging Principles

### 2.1 Primary product hierarchy

The hierarchy must remain:

1. **Cyoda runtime**
2. **AI-assisted development with Cyoda skills**
3. **Cyoda Developer Console as an optional visual companion**

The console must not be presented as:

- a replacement for the runtime;
- a separate runtime;
- a co-equal platform pillar;
- a mature, cross-platform desktop product;
- a complete development environment;
- required to use Cyoda.

### 2.2 Core positioning

Use this conceptual positioning throughout:

> Cyoda Developer Console is an early-preview desktop application for inspecting and refining Cyoda workflows visually. It connects to the same Cyoda runtime used by application code and AI coding agents.

### 2.3 Proof over adjectives

Do not rely on unsupported phrases such as:

- powerful visual editor;
- complete developer platform;
- seamless development experience;
- production-ready console;
- full-featured IDE;
- cross-platform;
- enterprise-grade desktop tooling.

Instead, show:

- a real screenshot of the workflow editor;
- a real screenshot of the code/editor view if shipped;
- a short product video showing an actual workflow;
- the exact version, platform, installation command, and release link.

### 2.4 Preview language

Every first-level introduction of the console must include at least one of:

- `Preview`
- `Early preview`
- `v0.1.0`
- `macOS Apple Silicon`

Do not imply support for Intel macOS, Linux, or Windows.

---

## 3. Confirmed Release Information

Use the following release data exactly unless the implementation owner supplies a newer release before merge.

### Product

`Cyoda Developer Console`

### Version

`v0.1.0`

### Supported public build

`macOS Apple Silicon`

### GitHub releases page

`https://github.com/Cyoda/cyoda-dev-console/releases`

### Direct DMG URL

`https://github.com/Cyoda/cyoda-dev-console/releases/download/v0.1.0/cyoda-dev-console_0.1.0_aarch64.dmg`

### Homebrew command

```bash
brew install --cask cyoda/cyoda/cyoda-dev-console
```

### Canonical runtime Homebrew command

The current `cyoda.dev` runtime command is:

```bash
brew install cyoda-platform/cyoda-go/cyoda
```

Do not shorten or alter this command unless the runtime repository confirms a new canonical command.

---

## 4. Scope

### 4.1 In scope

- One new homepage section.
- One new `/dev-console` page.
- Navigation or internal links required to reach `/dev-console`.
- Optional Developer Console installation content in the existing installation documentation.
- Responsive design.
- SEO metadata for `/dev-console`.
- Accessible image, video, link, button, and code-block behaviour.
- Lightweight analytics for measurable website interactions.
- Asset placeholders that can be replaced with final screenshots and video.
- Automated and manual tests.

### 4.2 Out of scope

- Changes to the homepage hero.
- A new Tools page.
- Changes to the “Three ways to use Cyoda” section.
- A second console CTA in the homepage closing section.
- Repositioning the console as a primary product.
- Claims about unreleased platforms or features.
- A public feature list containing future capabilities.
- Implementing runtime or console product telemetry.
- Building screenshots or the demo video.
- Redesigning the existing website.
- Replacing conceptual documentation diagrams with screenshots.
- Adding roadmap dates or release commitments.

---

## 5. Current Homepage Constraints

The current homepage already has:

1. runtime-led hero;
2. runtime Homebrew installation;
3. AI coding-agent skills section;
4. “What Cyoda is” explanation;
5. install-and-first-entity section;
6. runtime capability grid;
7. growth-path section;
8. “Three ways to use Cyoda” delivery-model section;
9. FAQs;
10. final runtime CTA.

Preserve those structures.

The console section must be inserted **after the complete AI coding-agent section and before “What Cyoda is.”**

Rationale:

- It completes the AI development loop.
- It does not interrupt the initial runtime conversion path.
- It provides visual proof before the deeper architectural explanation.
- It avoids mixing tooling with the delivery-model taxonomy.

---

## 6. Homepage Change

### 6.1 Section placement

Insert the new section immediately after:

> Use Cyoda with your AI coding agent

and before:

> What Cyoda is

Do not modify the hero.

Do not add a console button beside the hero’s existing primary runtime CTAs.

### 6.2 Section purpose

The homepage section has one job:

> Show that an AI-generated Cyoda workflow can be opened and refined visually using an optional desktop preview.

It must not attempt to document every console feature.

### 6.3 Recommended layout

Desktop:

- Two-column section.
- Copy and actions in one column.
- Screenshot or muted product video in the larger column.
- Media should occupy approximately 55–65% of the section width.

Mobile:

- Copy first.
- Media second.
- Actions below the copy or media depending on the existing component system.
- No horizontal overflow.

### 6.4 Homepage section copy

Use the following copy unless small adaptations are required to match the existing site’s component grammar.

#### Eyebrow

`Developer Console · Preview`

#### Heading

`Generate with AI. Refine the workflow visually.`

#### Body

> Cyoda Developer Console is an early-preview desktop application for inspecting and editing Cyoda workflows. Generate a workflow with your AI coding agent, open it in the console, refine the states and transitions visually, then run it against your local Cyoda runtime.

#### Evidence labels

Use a maximum of three short labels, only where supported by the shipped application:

- `Visual workflow editing`
- `Source editing`
- `Local runtime connection`

If any label is not demonstrably available in v0.1.0, remove it. Do not replace it with a future capability.

#### Primary action

`View Developer Console`

Destination:

`/dev-console`

#### Secondary action

`Download v0.1.0`

Destination:

`https://github.com/Cyoda/cyoda-dev-console/releases/download/v0.1.0/cyoda-dev-console_0.1.0_aarch64.dmg`

The primary action should visually outrank the direct download because the visitor should see platform requirements and preview status before downloading.

#### Metadata line

`v0.1.0 · Preview · macOS Apple Silicon`

### 6.5 Homepage media

Preferred media:

1. short muted looping video;
2. static screenshot fallback.

The media must show the real application, not a conceptual mock-up.

Required poster image:

`/media/dev-console/dev-console-workflow-poster.webp`

Preferred video files:

- `/media/dev-console/dev-console-demo.webm`
- `/media/dev-console/dev-console-demo.mp4`

Recommended attributes:

```html
<video
  autoplay
  muted
  loop
  playsinline
  preload="metadata"
  poster="/media/dev-console/dev-console-workflow-poster.webp"
  aria-label="Cyoda Developer Console showing a workflow being inspected and edited"
>
```

Requirements:

- Do not autoplay with sound.
- Respect `prefers-reduced-motion`.
- For reduced motion, display the poster image rather than auto-playing.
- Do not delay Largest Contentful Paint with an unnecessarily large file.
- Lazy-load the media if the current framework supports it without layout shift.

### 6.6 Homepage section visual treatment

Reuse the current website’s:

- typography;
- spacing scale;
- border radius;
- code styling;
- button hierarchy;
- light/dark behaviour;
- container width.

Do not make the console section look like a separate microsite or product brand.

The section may use a restrained `Preview` badge, but no animated badge or release ribbon.

---

## 7. Dedicated `/dev-console` Page

### 7.1 Route

Create:

`/dev-console`

Do not create `/tools`, `/tools/dev-console`, or a Tools index page.

### 7.2 Page goal

The page should answer, in order:

1. What is the Developer Console?
2. How does it fit with the Cyoda runtime?
3. What can the released preview visibly do?
4. What platforms are supported?
5. How do I install it?
6. Where is the source/release?
7. Where is the product heading, without turning direction into a promise?

### 7.3 Page structure

Use the following section order.

#### A. Page hero

Eyebrow:

`Cyoda Developer Console · v0.1.0 Preview`

Heading:

`Inspect and refine Cyoda workflows visually.`

Body:

> An optional desktop companion for the Cyoda runtime. Generate workflows with an AI coding agent, inspect their states and transitions visually, edit the model, and continue running the same workflow against your local Cyoda environment.

Primary action:

`Install with Homebrew`

Secondary action:

`Download DMG`

Tertiary text link:

`View release on GitHub`

Support line:

`Available now for macOS Apple Silicon.`

Do not use “Download for macOS” without specifying Apple Silicon.

#### B. Product demo

Place the 45-second product video directly below the page hero or immediately alongside it on large screens.

Recommended video sequence:

1. Cyoda runtime already running locally, or briefly shown starting.
2. AI coding agent creates or modifies a workflow.
3. Developer Console opens the workflow.
4. States and transitions are visible.
5. A genuine visual edit is made.
6. Source/model view is shown if available.
7. Updated workflow is saved or applied.
8. Result is run or inspected against the local runtime.

Do not fake actions not supported by the release.

Add standard controls on the dedicated page even if the homepage version loops without controls.

#### C. AI-to-visual loop

Heading:

`One model across AI, visual editing, and runtime execution.`

Use a real designed diagram or structured HTML flow, not ASCII art:

`AI coding agent` → `Cyoda workflow model` → `Developer Console` → `Cyoda runtime`

Supporting copy:

> The console does not introduce a separate application model or privileged runtime path. It works with the same explicit workflow model used by application code, AI tools, and the Cyoda runtime.

Implementation note:

- Prefer semantic HTML cards and arrows rendered with CSS or existing icon components.
- If an SVG is used, include accessible text.
- Avoid implying a proprietary or hidden API path.

#### D. Shipped capabilities

Heading:

`What the v0.1.0 preview shows`

Use screenshots as the primary evidence. Pair each screenshot with restrained explanatory copy.

Candidate blocks, only when confirmed against the shipped application:

1. **Inspect workflow structure**  
   Show states, transitions, criteria, and processors in context.

2. **Edit workflows visually**  
   Show a real visual editing action.

3. **Work with source**  
   Show the editor only if source editing is available in v0.1.0.

4. **Connect to a local runtime**  
   Show actual connection or runtime context only if visibly supported.

Do not present unavailable features.

#### E. Installation

Heading:

`Install the preview`

Intro:

> Cyoda Developer Console is optional. Install and start the Cyoda runtime first, then install the console.

##### Step 1 — Install and run Cyoda

```bash
brew install cyoda-platform/cyoda-go/cyoda
cyoda
```

##### Step 2 — Install Developer Console

```bash
brew install --cask cyoda/cyoda/cyoda-dev-console
```

Alternative action:

`Download the Apple Silicon DMG`

Link to the exact v0.1.0 DMG.

Add:

`Requires macOS on Apple Silicon.`

Do not state a minimum macOS version unless confirmed from the release/build configuration.

##### Step 3 — Open the application

Use wording grounded in the product’s real behaviour. Do not invent connection steps, port numbers, authentication steps, or menu names without confirming them against v0.1.0.

If no reliable setup instructions are available, state:

> Open Cyoda Developer Console after starting your local Cyoda runtime. Follow the connection controls shown in the application.

#### F. Open-source and release links

Heading:

`Open source and early`

Copy:

> The Developer Console is released as an early preview. Inspect the source, review the current release, report issues, and follow development on GitHub.

Links:

- `View repository`
- `View v0.1.0 release`
- `Report an issue`

Repository URL:

`https://github.com/Cyoda/cyoda-dev-console`

Release URL:

`https://github.com/Cyoda/cyoda-dev-console/releases`

Issues URL:

`https://github.com/Cyoda/cyoda-dev-console/issues`

#### G. Direction, not commitments

Optional section heading:

`Where this is heading`

This section may be included only if there is approved direction copy.

Rules:

- Label it as direction, not roadmap commitments.
- No dates.
- No quarter labels.
- No status bars.
- No promises of named platforms unless formally approved.
- Do not mix future items into the shipped-capabilities section.
- Include a disclaimer such as:

> This is product direction, not a committed release schedule. Priorities may change as the preview develops.

If no approved direction exists at implementation time, omit the section entirely.

#### H. Closing CTA

Heading:

`Start with the runtime.`

Body:

> Install Cyoda locally, then add the Developer Console when you want to inspect and refine workflows visually.

Primary action:

`Install Cyoda`

Destination:

the existing install-and-first-entity documentation.

Secondary action:

`Install Developer Console`

Destination:

the Homebrew anchor on the current page or the DMG download.

This closing CTA is allowed on `/dev-console`. Do not duplicate it at the bottom of the homepage.

---

## 8. Navigation and Discoverability

### 8.1 Main navigation

Do not add a top-level `Tools` item.

Preferred options, in order:

1. Add a `Developer Console` link to an existing product/developer navigation group if one exists.
2. Add it to the footer near GitHub and documentation links.
3. Rely on the homepage section plus footer link if the top navigation is intentionally minimal.

Do not overcrowd the current top navigation merely to advertise a 0.1.0 preview.

### 8.2 Footer

Add:

`Developer Console`

Destination:

`/dev-console`

Place it with developer/open-source resources, not enterprise or cloud links.

---

## 9. Documentation Change

Update the existing install-and-first-entity guide or its nearest equivalent.

### 9.1 Required insertion

After runtime installation and startup, add:

#### Optional: install Cyoda Developer Console

> Cyoda Developer Console is an early-preview desktop companion for visually inspecting and editing workflows. It is optional and currently available for macOS Apple Silicon.

```bash
brew install --cask cyoda/cyoda/cyoda-dev-console
```

Alternative:

`Download the v0.1.0 Apple Silicon DMG`

Link to the direct release asset.

Then link:

`Learn more about Developer Console → /dev-console`

### 9.2 Documentation rules

- Preserve the runtime as the required first step.
- Use the word `Optional`.
- Do not insert screenshots into conceptual documentation pages.
- Use screenshots only in console-specific how-to content.
- Do not duplicate the complete `/dev-console` marketing page in the docs.
- Do not add connection instructions that have not been tested against v0.1.0.

---

## 10. Asset Specification

The implementation must work with temporary placeholders, but the final merge should use user-supplied real assets.

### 10.1 Required assets

1. Homepage workflow screenshot/poster.
2. Dedicated-page hero/demo poster.
3. 45-second demo video.
4. At least two detailed screenshots for shipped capabilities.
5. Optional application icon in SVG or high-resolution PNG if already approved.

### 10.2 Recommended filenames

```text
/public/media/dev-console/dev-console-workflow-poster.webp
/public/media/dev-console/dev-console-demo.webm
/public/media/dev-console/dev-console-demo.mp4
/public/media/dev-console/dev-console-workflow-editor.webp
/public/media/dev-console/dev-console-source-editor.webp
/public/media/dev-console/dev-console-runtime-connection.webp
```

Adjust the root path to the framework’s existing public/static asset convention.

### 10.3 Image requirements

- Use WebP or AVIF where supported.
- Supply explicit width and height.
- Avoid cumulative layout shift.
- Prefer 16:10 or 16:9 captures.
- Do not include personal data, tokens, local file paths, usernames, or unrelated desktop content.
- Use a legible application scale.
- Capture a realistic but non-sensitive workflow.
- Do not fabricate UI in post-production.

### 10.4 Video requirements

- Target duration: 35–50 seconds.
- Muted by default.
- No voiceover required.
- Captions or short on-screen labels preferred.
- Avoid tiny cursor movement or long pauses.
- Encode WebM and MP4.
- Target a reasonable web payload; compress before merge.
- Include poster fallback.
- Ensure the final frame loops cleanly if used on the homepage.
- The dedicated page version must expose controls.

### 10.5 Placeholder handling

Until final assets are supplied:

- use clearly named placeholder files or a bordered placeholder component;
- do not ship generic stock imagery;
- do not invent a console screenshot;
- add a code comment or issue reference identifying each asset to replace.

---

## 11. Analytics and Success Measurement

### 11.1 Product success model

The intended activation funnel is:

1. homepage visit;
2. runtime install intent;
3. runtime successfully started;
4. Developer Console install;
5. first workflow opened or created.

The website alone cannot measure all five stages.

### 11.2 Website events that may be instrumented now

Use the existing analytics system if present. Do not introduce a new analytics vendor solely for this feature.

Recommended events:

```text
dev_console_home_section_view
dev_console_home_view_page_click
dev_console_home_download_click
dev_console_page_view
dev_console_brew_copy
dev_console_dmg_download_click
dev_console_github_release_click
dev_console_repo_click
dev_console_demo_play
dev_console_demo_complete
```

Suggested properties:

```text
source: homepage | dev_console_page | docs
version: 0.1.0
platform: macos_apple_silicon
asset: brew | dmg | github_release
```

### 11.3 Measurement boundary

Do not claim to measure:

- runtime successfully started;
- console successfully installed;
- first workflow created;
- first workflow edited;
- runtime-to-console conversion;

unless corresponding product telemetry exists and has been reviewed for privacy and open-source expectations.

In reporting, distinguish:

- **website intent metrics**, such as click and copy events;
- **actual product activation metrics**, which require runtime/console instrumentation.

### 11.4 Privacy

Do not add fingerprinting, invasive cross-site tracking, or product telemetry as part of this website task.

---

## 12. SEO and Metadata

### 12.1 Page title

`Cyoda Developer Console Preview | Visual Workflow Editor`

Avoid describing it as a general-purpose IDE.

### 12.2 Meta description

> Inspect and refine Cyoda workflows visually with the Cyoda Developer Console v0.1.0 preview for macOS Apple Silicon.

### 12.3 Canonical URL

`https://cyoda.dev/dev-console`

### 12.4 Open Graph

Use the workflow-editor screenshot or poster.

Recommended OG title:

`Cyoda Developer Console v0.1.0 Preview`

Recommended OG description:

`Generate Cyoda workflows with AI, inspect and refine them visually, and run them against your local Cyoda runtime.`

### 12.5 Structured data

Use existing site conventions. Do not introduce unsupported review scores, download counts, or software compatibility claims.

If SoftwareApplication schema is already used by the project, it may include:

- name;
- version;
- operatingSystem: `macOS on Apple Silicon`;
- applicationCategory: `DeveloperApplication`;
- download URL;
- open-source repository URL.

Omit schema rather than inventing uncertain values.

---

## 13. Accessibility Requirements

Meet the accessibility standard already used by the site, with WCAG 2.2 AA as the minimum target.

Required:

- semantic heading order;
- keyboard-operable buttons and links;
- visible focus states;
- meaningful image alt text;
- no critical text embedded only in video;
- video controls on `/dev-console`;
- reduced-motion behaviour;
- sufficient contrast for the `Preview` badge;
- code blocks readable by screen readers;
- copy buttons with accessible names and confirmation state;
- no action identified only by colour;
- external links handled consistently with the existing site.

Suggested screenshot alt text:

> Cyoda Developer Console displaying a workflow graph with states and transitions.

Do not use alt text such as `screenshot1` or repeat surrounding copy verbatim.

---

## 14. Performance Requirements

The new media must not materially degrade the current homepage.

Targets:

- no unexpected layout shift from media;
- poster image loaded before video where appropriate;
- homepage video lazy-loaded or deferred;
- no video download for users with reduced-motion where avoidable;
- responsive images with appropriate source sizes;
- no uncompressed PNG screen captures when WebP/AVIF is suitable;
- no new large client-side framework dependency;
- no animation library added solely for this section.

Use the project’s existing performance tooling and thresholds.

---

## 15. Implementation Guidance for Codex

### 15.1 Repository inspection

Before editing, Codex must:

1. inspect the framework, routing model, styling system, and component conventions;
2. identify the homepage source file;
3. identify shared button, badge, media, code-block, and layout components;
4. identify the documentation source and build system;
5. identify existing analytics utilities;
6. identify test commands and CI requirements;
7. find the canonical runtime install command in source;
8. avoid creating duplicate components where reusable ones already exist.

### 15.2 Implementation sequence

1. Add route and page shell for `/dev-console`.
2. Add reusable console metadata/constants:
   - version;
   - platform;
   - release URL;
   - DMG URL;
   - Homebrew command;
   - repository URL.
3. Build the dedicated page using existing design primitives.
4. Build the homepage section using the same shared data and components.
5. Add footer/navigation link.
6. Update installation documentation.
7. Add analytics using existing infrastructure.
8. Add metadata and social preview configuration.
9. Add tests.
10. Run formatting, linting, type checking, unit tests, production build, and relevant accessibility checks.
11. Review all public copy against the release-state rules in this specification.

### 15.3 Shared data

Do not repeat release URLs and commands in multiple components if the project architecture supports shared constants or content data.

Example conceptual object:

```ts
export const developerConsoleRelease = {
  name: "Cyoda Developer Console",
  version: "0.1.0",
  status: "Preview",
  platform: "macOS Apple Silicon",
  brewCommand: "brew install --cask cyoda/cyoda/cyoda-dev-console",
  repositoryUrl: "https://github.com/Cyoda/cyoda-dev-console",
  releasesUrl: "https://github.com/Cyoda/cyoda-dev-console/releases",
  dmgUrl:
    "https://github.com/Cyoda/cyoda-dev-console/releases/download/v0.1.0/cyoda-dev-console_0.1.0_aarch64.dmg",
};
```

Follow the actual project’s language and content architecture.

### 15.4 External links

Use existing external-link conventions.

For direct downloads, make the destination clear in the accessible label, for example:

`Download Cyoda Developer Console v0.1.0 DMG for macOS Apple Silicon`

Do not use `target="_blank"` unless that is already the site convention and includes the required security attributes.

### 15.5 Copy command behaviour

The Homebrew code block should use the website’s existing copy interaction.

On copy:

- preserve the exact command;
- provide accessible success feedback;
- optionally emit `dev_console_brew_copy`;
- do not automatically execute or redirect.

---

## 16. Testing Requirements

### 16.1 Automated checks

Run all existing project checks.

At minimum verify:

- `/dev-console` builds;
- homepage builds;
- documentation builds;
- no broken imports;
- no type errors;
- no lint errors;
- no invalid internal links;
- canonical URLs are correct;
- copy button returns the exact Homebrew command;
- DMG link is exact;
- release and repository links are correct;
- responsive rendering does not overflow;
- reduced-motion media fallback works.

### 16.2 Page-level tests

Where the project uses component or end-to-end tests, add coverage for:

#### Homepage

- section renders in the specified location;
- `Preview` and platform text are visible;
- primary action links to `/dev-console`;
- direct download link is correct;
- hero remains unchanged;
- “Three ways to use Cyoda” remains unchanged.

#### `/dev-console`

- page metadata is present;
- runtime install appears before console install;
- console is described as optional;
- platform limitation is visible;
- Homebrew command is exact;
- direct DMG URL is exact;
- GitHub links are correct;
- no unsupported platform claim is present;
- video has poster/fallback;
- reduced-motion handling is present.

#### Documentation

- optional console section exists after runtime setup;
- canonical commands are used;
- platform limitation is stated.

### 16.3 Manual review checklist

Review at:

- narrow mobile;
- standard mobile;
- tablet;
- laptop;
- wide desktop;
- light mode;
- dark mode, if supported;
- keyboard only;
- reduced motion;
- slow network simulation.

Check:

- the console does not dominate the homepage;
- the runtime remains the primary action;
- media is legible;
- preview/platform restrictions cannot be missed;
- no roadmap item appears as a shipped feature;
- no unsupported claim has entered alt text, metadata, or structured data.

---

## 17. Acceptance Criteria

The implementation is complete only when all criteria below are satisfied.

### Strategy

- [ ] Homepage hero is unchanged.
- [ ] Runtime remains the primary product and install path.
- [ ] Console appears in one substantial homepage section only.
- [ ] No Tools page is created.
- [ ] “Three ways to use Cyoda” is unchanged.
- [ ] No redundant homepage bottom CTA is added.

### Messaging

- [ ] Console is labelled Preview or Early preview.
- [ ] v0.1.0 is shown.
- [ ] macOS Apple Silicon limitation is explicit.
- [ ] Console is described as optional.
- [ ] AI → visual refinement → runtime is the central console narrative.
- [ ] No “complete platform,” “production-ready,” “cross-platform,” or equivalent unsupported claim appears.
- [ ] Future capabilities are not listed as current features.
- [ ] Any direction section is clearly non-committal and has no dates.

### Homepage

- [ ] Section is after the AI-agent content and before “What Cyoda is.”
- [ ] Real screenshot/video is used or a clearly marked implementation placeholder remains.
- [ ] Primary action goes to `/dev-console`.
- [ ] Secondary direct-download action uses the exact v0.1.0 DMG URL.
- [ ] Hero install remains runtime-only.

### Dedicated page

- [ ] `/dev-console` exists.
- [ ] Demo is prominent.
- [ ] Runtime installation precedes console installation.
- [ ] Homebrew command is exact.
- [ ] Direct DMG link is exact.
- [ ] Repository, release, and issue links are present.
- [ ] Architecture flow shows the same workflow model and runtime API relationship.
- [ ] Shipped capabilities are supported by screenshots or the real application.

### Documentation

- [ ] Optional console installation is added after runtime setup.
- [ ] Runtime command is `brew install cyoda-platform/cyoda-go/cyoda`.
- [ ] Console command is `brew install --cask cyoda/cyoda/cyoda-dev-console`.
- [ ] Documentation links to `/dev-console`.

### Quality

- [ ] Existing build, lint, type-check, and test commands pass.
- [ ] No material homepage performance regression.
- [ ] Accessibility requirements are met.
- [ ] Responsive layouts are verified.
- [ ] Analytics reflect website intent only unless product telemetry genuinely exists.

---

## 18. Required Handoff Information

When Codex finishes, it must report:

1. files created;
2. files modified;
3. final route;
4. final homepage insertion point;
5. asset filenames still requiring replacement;
6. analytics events added or omitted;
7. tests run and results;
8. any assumptions made;
9. any capability copy removed because it could not be verified in v0.1.0;
10. any remaining manual verification required.

Codex must not claim the task is complete if placeholder imagery remains without explicitly stating that the final screenshots/video still need to be supplied.

---

## 19. Codex Execution Prompt

Use the following prompt after placing this specification in the website repository:

> Read this specification in full before changing code. Inspect the repository to identify the framework, homepage structure, shared components, content architecture, analytics utilities, documentation source, and test commands. Implement the specification using existing design and code conventions. Preserve the homepage hero and the “Three ways to use Cyoda” section. Add one homepage Developer Console preview section after the AI-agent section and before “What Cyoda is,” create `/dev-console`, add the optional installation instructions to the documentation, and use shared release constants where appropriate. Do not invent features or platform support. Use clearly named media placeholders where final screenshots and videos are not present. Run all available formatting, lint, type-check, test, link-check, and production-build commands. Report changed files, tests, assumptions, and outstanding asset replacements.

---

## 20. Source References

Current website:

`https://cyoda.dev`

Developer Console releases:

`https://github.com/Cyoda/cyoda-dev-console/releases`

Developer Console repository:

`https://github.com/Cyoda/cyoda-dev-console`

Developer Console v0.1.0 DMG:

`https://github.com/Cyoda/cyoda-dev-console/releases/download/v0.1.0/cyoda-dev-console_0.1.0_aarch64.dmg`
