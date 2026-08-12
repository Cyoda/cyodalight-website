# Website Fact-Check — Reconciliation Against Source Repositories

**Date:** 2026-08-12
**Ground truth:** GitHub `Cyoda/cyoda-go` (v0.8.3), `Cyoda/cyoda-dev-console` (v0.3.0, incl. `apps/model-editor-mcp` 0.2.1), `Cyoda/cyoda-skills`, `Cyoda/cyoda-workflow-editor`, docs.cyoda.net, ai.cyoda.net, cyoda.com.
**Method:** every factual statement on the site was extracted and verified against repo file contents (`gh api`), release assets, npm registry, Homebrew taps, and live URLs. Local sibling repos could not be read (macOS denies this process access outside the project folder), so the GitHub `Cyoda` org — where all four repos live — was used as the anchor.

**Cross-check against local cyoda-go (2026-08-12, after read access was granted):** `/Users/paul/go-projects/cyoda-light/cyoda-go` is on `release/v0.8.4`, 14 commits ahead of `origin/main`. All load-bearing findings hold there unchanged: storage default is still `memory` (`app/config.go:247`), README still documents `brew install cyoda/cyoda-go/cyoda`, `CYODA_IAM_MODE` still defaults to `mock`, all four quickstart routes exist in `api/openapi.yaml` (`/model/{entityName}/{modelVersion}/workflow/import`, `/entity/{format}/{entityName}/{modelVersion}`, `/entity/{format}/{entityId}/{transition}`, `/entity/{entityId}`), `WorkflowImportRequestDto` is unchanged, and `grpc.md` still frames gRPC as "for compute members and entity management". The 14 unreleased commits are fixes/perf/security only — none affect any website claim. The README mentions no Kotlin/Go client libraries in 0.8.4 either.

---

## Status update — no-decision fixes applied (2026-08-12)

Applied on branch `dev-console-website` (build verified):
- **A2** brew tap corrected to `cyoda/cyoda-go/cyoda` (`install.ts`, `QuickStart.astro`, `llms-full.txt`).
- **A3** Codex tab grounded in reality: copy glob `cyoda/skills/*`, expected names `app/auth/build/setup/test`.
- **A6** "under 2 seconds" removed from llms-full.txt.
- **A7** "Test harness" bullet reframed to the real `DELETE /api/entity/{entityName}/{modelVersion}` state reset.
- **A8** dev-console og:image now uses the existing `/og-card.png`; "45-second product demo placeholder" caption replaced; dead `runtimeConnection` media entry removed. Bonus fix: `BaseLayout` was silently dropping `ogTitle/ogDescription/ogImage/twitterDescription` props — now forwarded to `BaseHead`.
- **A9** dead `/changelog` link removed from llms.txt.
- **B1** `cyoda init` added to all install flows (install tab, quickstart steps, final CTA command).
- **B2** `/cyoda:auth` added to the skill list.
- **B3** `connection_info` wording corrected to "get the live editor's URL".
- **B4** GitHub org updated to `Cyoda/…` in site.ts, faq.ts, llms files, star-count script, and skills clone URLs. Intentionally left: the `/plugin marketplace add Cyoda-platform/cyoda-skills` command (matches the skills README verbatim) and the AGENTS.md curls (pending A4).

Decision-dependent fixes applied later the same day (per maintainer decisions):
- **A1** (decision: only Java and Python client example/template projects exist; no "client libraries"): feature card retitled "REST and gRPC APIs"; FAQ languages answer, site meta description, and both llms files reworded to REST-first with gRPC for external compute processors and Java/Python templates; ProofBar reduced to Java + Python with a "REST API" pill; architecture SVG arrow and accessible title changed gRPC → REST; JSON-LD `programmingLanguage` corrected to `Go`.
- **A4** (decision: reword): all four AGENTS.md tabs (Cursor, Windsurf, Copilot, Any agent) now clone/point at the skills repo and ask the agent to read the `SKILL.md` files; the footer note no longer cites AGENTS.md.
- **A5** (decision: remove for now): Cyoda Cloud removed from NavBar (desktop + drawer), Footer, ProgressionDiagram (now "Two ways to use Cyoda"), FAQ, site.ts (`cyodaCloud` key), and both llms files.
- **B6** (decision: domain is cyoda.dev): `site.url`, `astro.config.mjs`, robots.txt (now pointing at the real `sitemap-index.xml`), and all llms URLs set to `https://cyoda.dev`; `DOMAIN_PLACEHOLDER` eliminated. Built pages verified: canonicals and og:image on cyoda.dev, zero placeholder/ai.cyoda.net/Kotlin occurrences.

- **B5** applied: WhatItIs diagram and GrowthPath alt text now read "Cassandra (commercial)".

Re-verified directly (not just via subagent): cyoda-go v0.8.3 release assets include `cyoda_0.8.3_windows_amd64.zip` and `cyoda_0.8.3_windows_arm64.zip` with cosign signatures and SBOMs — the Windows-binaries finding in B7/G16 is correct.

- **B7** applied: install tab, quickstart step, and llms-full now note that Windows users can download signed binaries (zip) from the cyoda-go releases page; the Model Editor MCP section states "Requires Node.js 22 or newer".

**All findings from this audit are now resolved.**

---

## A. Fabricated or contradicted claims (must fix)

### A1. "gRPC API with client libraries for Java, Python, Go, and Kotlin" — WRONG on both counts
**Truth (cyoda-go):** The app-facing API is **REST/HTTP on port 8080**. gRPC (port 9090) exists primarily as the **compute-member protocol** for external processors, secondarily for programmatic entity/model management (`cmd/cyoda/help/content/grpc.md`). docs.cyoda.net: "Cyoda speaks REST for CRUD, search, and workflow invocation, gRPC for external processors." Client libraries: **Java and Python exist** (e2e-tested per `Cyoda/cyoda-client-lib-e2e-tests`); **Kotlin has only an example app** (`hello-cyoda`); **no Go client library exists** (`cyoda-go` is the server, not a Go SDK). The docs document no per-language client libraries at all.
**Where it appears:**
- `src/data/features.ts:50-53` — "gRPC API … client libraries for Java, Python, Go, and Kotlin"
- `src/data/faq.ts:54-56` — "What languages are supported? Java, Python, Go, and Kotlin via gRPC client libraries"
- `src/data/site.ts:20` — site description "…Java, Python, Go, and Kotlin via gRPC"
- `src/components/ProofBar.astro` — entire strip: Java/Python/Go/Kotlin logos + "gRPC API" pill
- `src/components/WhatItIs.astro:66-83` — architecture SVG shows "Your Application Code → gRPC → Cyoda"
- `public/llms.txt:6`, `public/llms-full.txt:23,26-28`
**Fix direction:** REST-first ("REST API; gRPC for external compute processors"). Language claims must be reduced to what exists (Java + Python client libraries; any language via REST; compute processors via gRPC), or reframed as "examples/templates available".

### A2. Homebrew tap for cyoda-go is wrong
**Claim:** `brew install cyoda-platform/cyoda-go/cyoda`
**Truth:** `brew install cyoda/cyoda-go/cyoda` (README + docs quickstart; tap repo is `Cyoda/homebrew-cyoda-go`). The `cyoda-platform` tap path does not match any tap repo.
**Where:** `src/data/install.ts:19,47`, `src/components/QuickStart.astro:35`, `public/llms-full.txt:50`.

### A3. Codex install instructions cannot work
**Claim:** `cp -R cyoda-skills/cyoda/skills/cyoda-* ~/.agents/skills/` and "Expected skill names: cyoda-app, cyoda-build, cyoda-setup, cyoda-test".
**Truth:** skill directories are `cyoda/skills/app`, `build`, `setup`, `test`, … (no `cyoda-` prefix anywhere; frontmatter names are `app`, `build`, `setup`, `test`). The glob `cyoda-*` matches **zero directories**; the verification greps would show none of the "expected" names. The skills repo README has no Codex section at all.
**Where:** `src/data/agentInstallTabs.ts:53-96`.

### A4. AGENTS.md does not exist — four install tabs curl a 404
**Claim (Cursor, Windsurf, GitHub Copilot, "Any agent" tabs):** `curl -L https://raw.githubusercontent.com/Cyoda-platform/cyoda-skills/main/AGENTS.md -o AGENTS.md`.
**Truth:** no `AGENTS.md` exists in `Cyoda/cyoda-skills` (root files: `.gitignore`, `CLAUDE.md`, `LICENSE`, `README.md`). The curl returns a 404 body. The repo *does* ship `cyoda/GEMINI.md` and `cyoda/gemini-extension.json` (the Gemini tab's `gemini extensions link .` is structurally valid).
**Where:** `src/data/agentInstallTabs.ts:126,145,163,192`.

### A5. "Cyoda Cloud: hosted SaaS at ai.cyoda.net — get started immediately" — the service is retired
**Truth:** ai.cyoda.net currently serves a retirement notice: "Cyoda AI Studio has been retired" and "Cyoda Cloud is coming back online" (i.e., coming soon, not live). cyoda.com likewise references an *upcoming* Cyoda Cloud SaaS.
**Where:** `src/data/faq.ts:49-51`, `src/components/ProgressionDiagram.astro:46-62` ("Get started immediately", "Try Cyoda Cloud →"), `src/components/Footer.astro:38`, `src/data/site.ts:32`, `public/llms.txt:21`, `public/llms-full.txt:36-38,150`.
**Fix direction:** either present Cyoda Cloud as "coming soon" or remove the tier until it is live.

### A6. "In-memory mode … starts in under 2 seconds" — invented figure
**Truth:** no startup-time claim exists anywhere in cyoda-go (its `CYODA_STARTUP_TIMEOUT` default is 30 s; the memory-engine docs talk about microsecond transactions, never startup time).
**Where:** `public/llms-full.txt:21`.

### A7. "Test harness: reset entity state between tests with a single API call. No teardown scripts" — no such feature
**Truth:** no user-facing test harness exists (only an internal `cmd/compute-test-client` parity harness). The kernel of truth: `DELETE /api/entity/{entityName}/{modelVersion}` deletes all entities of a model in one call. Reframe or remove.
**Where:** `public/llms-full.txt:24`.

### A8. Dev-console page og:image (and demo media) point to files that don't exist
**Truth:** `public/media/` does not exist. `developerConsoleRelease.media.*` references six files (`dev-console-workflow-poster.webp`, `dev-console-demo.webm/.mp4`, three screenshots); `dev-console.astro:14` builds `og:image` from the missing poster → broken social card. The visible caption "45-second product demo placeholder" (`dev-console.astro:120-122`) is placeholder copy shipped to production.
**Where:** `src/data/developerConsole.ts:22-29`, `src/pages/dev-console.astro:14,119-122`.

### A9. llms.txt links to a /changelog page that doesn't exist
**Truth:** `src/pages/` contains only `index.astro` and `dev-console.astro`. `https://…/changelog` 404s. Also both llms files still contain `DOMAIN_PLACEHOLDER` in live URLs.
**Where:** `public/llms.txt:23,20,27`, `public/llms-full.txt:91,167`.

---

## B. Misleading / needs qualification

### B1. "SQLite-backed local storage by default"
**Truth:** the binary's built-in default is **memory** (`app/config.go:247`: `envString("CYODA_STORAGE_BACKEND", "memory")`). SQLite becomes the default only after `cyoda init` (which the brew caveat instructs, the curl installer runs automatically, and deb/rpm packages preconfigure). docs.cyoda.net's quickstart *does* say "The default backend is SQLite" — but that is true only for the documented install flow, and the website's own Run tab omits `cyoda init` entirely, so a user following the site's exact commands gets an in-memory server that loses data on restart.
**Where:** `src/components/HeroSection.astro:58-63`, `src/data/faq.ts:44-46` , `src/data/site.ts:44`, `src/data/install.ts:22-27` (missing `cyoda init` step), `public/llms.txt:5`, `public/llms-full.txt:9,147`.
**Fix direction:** add `cyoda init` to the install flow, or qualify the claim ("SQLite by default after `cyoda init`").

### B2. Claude Code skill list is incomplete
**Truth:** the plugin ships **11** skills: `app, auth, build, compute, debug, design, docs, migrate, setup, status, test`. The site lists 10 and omits `/cyoda:auth`. (`/cyoda:test` does exist — that one is fine.)
**Where:** `src/data/agentInstallTabs.ts:38-47`.

### B3. Developer Console description narrower than reality; one wording error
**Truth:** repo describes itself as tools for "workflow **and entity** models … with an optional in-app AI assistant" (assistant off by default, LLM-API-only allowlist). "No running Cyoda environment required" is **correct** — no runtime connection exists. The MCP `connection_info` tool **returns** the live editor's URL/port; it does not "open" the editor.
**Where:** `src/pages/dev-console.astro:72-76,175-180`, `src/components/DeveloperConsolePreview.astro:27-35`, `public/llms-full.txt:66-68`.
Note: `developerConsole.ts:28` names a screenshot `dev-console-runtime-connection.webp` — a runtime connection feature does not exist; drop it.

### B4. Old GitHub org slug `Cyoda-platform` throughout
**Truth:** both repos were transferred to the `Cyoda` org; old links 301-redirect and still work. The skills README itself still documents `/plugin marketplace add Cyoda-platform/cyoda-skills`, so the site matches the README — but FAQ text literally says "The source code is at github.com/Cyoda-platform/cyoda-go". Cosmetic; recommend updating to `Cyoda/…` sitewide (`src/data/site.ts:23-25`, `src/data/faq.ts:60`, `agentInstallTabs.ts`, llms files).

### B5. Cassandra shown as a plain storage option without the commercial note
**Truth:** memory/sqlite/postgres are open source; **Cassandra backend is commercial** ("commercial (Cyoda)" in the README engine table).
**Where:** `src/components/WhatItIs.astro:122-124` (diagram), `src/components/GrowthPath.astro` (fine as growth story, but same nuance), `public/llms-full.txt`.

### B6. Domain confusion
`astro.config.mjs:7` sets `site: 'https://cyoda.org'`; `dev-console.astro` hardcodes canonical/OG on `https://cyoda.dev`; `site.ts:8,18` still uses `DOMAIN_PLACEHOLDER`; cyoda.com refers to the open-source home as **cyoda.dev**. Pick one domain and align config, canonicals, llms files.

### B7. Minor understatements (optional)
- cyoda-go v0.8.3 also publishes **Windows** binaries (zip, amd64+arm64) — the site implies mac/Linux only (true for brew specifically).
- Dev-console v0.3.0 release also ships `install.sh` + `SHA256SUMS` alongside the four installers (site's four download links are all valid).
- MCP requires Node ≥ 22 — worth stating next to the npx snippet.

---

## C. Confirmed accurate (no change needed)

- Quickstart API calls are **exactly right**: `POST /api/model/{entity}/{version}/workflow/import`, `POST /api/entity/JSON/{entity}/{version}` (returns array; `jq -r '.[0].entityIds[0]'` matches the OpenAPI example), `PUT /api/entity/JSON/{id}/{transition}`, `GET /api/entity/{id}` — all in `api/openapi.yaml`.
- Workflow import JSON shape (`workflows[].version/name/initialState/active/states/transitions[].name/next/manual`) matches `WorkflowImportRequestDto`; the HelloWorld/treasury sample JSONs are structurally valid.
- Mock auth default (`CYODA_IAM_MODE=mock`), REST on `localhost:8080`, bare `cyoda` starts serving mode.
- Single binary; cluster mode opt-in (`CYODA_CLUSTER_ENABLED` default false); Apache 2.0; "EDBMS" is cyoda-go's own self-description.
- Storage backend lineup memory/SQLite/PostgreSQL/Cassandra matches.
- `cyoda init` exists and does what llms-full says.
- Dev Console: v0.3.0 is the latest desktop release; all four DMG/AppImage download URLs resolve; `brew install --cask cyoda/cyoda/cyoda-dev-console` matches README and the `Cyoda/homebrew-cyoda` cask; `RELEASE.md#build-from-source-on-windows` anchor exists; platform matrix (macOS AS+Intel, Linux ARM64+x86_64, Windows source-only) is correct; "local files, no running Cyoda environment" is accurate.
- Model Editor MCP: `@cyoda/model-editor-mcp@0.2.1` is latest on npm; the `.mcp.json` snippet is byte-identical to the repo README; `connection_info` exists (among 24 tools); "agent owns content, human arranges canvas" matches the README's role split.
- Claude Code plugin commands (`/plugin marketplace add …`, `/plugin install cyoda@cyoda`, `/reload-plugins`) match the skills README verbatim; Gemini `gemini extensions link .` is backed by `cyoda/gemini-extension.json`.
- All six docs.cyoda.net URLs return 200 with matching content; cyoda.com presents Enterprise Cyoda as claimed.
- Website's workflow viewer deps (`@cyoda/workflow-core` 0.6.0, `@cyoda/workflow-viewer` 0.4.1) are real npm packages sourced from `Cyoda/cyoda-workflow-editor`.

---

## Suggested fix order

1. **A1 (gRPC/languages)** — touches 7 files including the hero-adjacent ProofBar and architecture diagram; biggest credibility risk.
2. **A2 (brew tap)** — one-line fix in 4 places; anyone copy-pasting today gets a failure.
3. **A3 + A4 (agent install tabs)** — Codex tab is non-functional; 4 tabs curl a 404. Either fix against reality (dirs without prefix; drop AGENTS.md or add it to the skills repo) or cut the untested tabs.
4. **A5 (Cyoda Cloud)** — "Try Cyoda Cloud" currently lands on a retirement notice.
5. **A6/A7 (llms-full fabrications)** — delete or reframe.
6. **A8/A9 (broken og:image, placeholder caption, /changelog, DOMAIN_PLACEHOLDER)**.
7. **B1 (`cyoda init` / storage default)** and the remaining B items.
