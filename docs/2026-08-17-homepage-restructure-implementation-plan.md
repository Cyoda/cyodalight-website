# Homepage Restructure & De-duplication — Implementation Plan

## Context

`docs/2026-08-13-improvement-suggestions.md` is a UX/content audit of the Cyoda homepage (`src/pages/index.astro` and the ~12 components it composes). It documents three concrete problems, all verified directly against source in this planning pass:

1. **Literal duplication** — the install commands appear 3 times, the "first entity" curl script is exported twice as an identical string in `src/data/install.ts`, and Developer Console gets 5 separate CTAs across the page.
2. **Backwards funnel** — the page asks visitors to install AI-agent skills (section 4) before explaining what Cyoda is (section 6), and offers ~7 competing "start" actions with no hierarchy.
3. **Trust-eroding copy** — a leaked internal dev note in `agentInstallTabs.ts`, three tabs labeled "(untested)", a domain mismatch between the QuickStart graph (HelloWorld) and its code sample (`orders`), a wrong `analyticsSource` value, and a one-bullet "evidence" list that just restates the sentence above it.

**Target audience constraint governing every decision below**: this site is for backend developers and system architects technically evaluating Cyoda, and for AI coding agents consuming `public/llms.txt` / `public/llms-full.txt` to generate Cyoda code on a developer's behalf. Copy should stay dense with verifiable facts, not marketing language. Any change to homepage narrative or facts must be mirrored in `llms-full.txt` or the AI-facing content goes stale relative to what a human visitor sees.

This plan implements the doc's suggested restructure, resolves its open decision points with a specific recommendation, and — critically — fixes two things the improvement-suggestions doc didn't know about: `scripts/verify-dev-console.mjs` hardcodes assertions that the *current* (soon-to-be-fixed) section order is correct and that a specific evidence-list string exists. Both will fail once this restructure lands unless updated as part of the same change.

`docs/fact-check-2026-08-12.md` already resolved all factual-accuracy issues on this branch — this work is structural/UX only and must not reintroduce any of the fixed claims (no "Cyoda Cloud", no overstated startup speed, gRPC only for external compute processors not general client language).

---

## Resolved decision points

**(a) HelloWorld vs `orders` for the "first entity" walkthrough → use `orders`, fix the diagram not the code.**
Verified `src/data/helloworld-workflow.json`: every transition (`ToMorning`, `ToAfternoon`, `MorningToDone`, `AfternoonToDone`) has `"manual": false` and requires either a `criterion` function or `processors` tagged `calculationNodesTags: "helloworld"` — i.e. an external gRPC compute node must be running before any transition fires. There is no manual transition a developer can trigger with a bare `curl -X PUT .../submit`, which is exactly what the existing `firstEntityCommands` script does. The `orders` domain is a plain `draft`→`submitted` workflow with `"manual": true`, curl-drivable, and is already the domain `public/llms-full.txt` documents in full (lines 92–127, including the exact workflow JSON). Conclusion: keep the curl script on `orders`; replace the *visual* (`HelloWorldWorkflowViewer`) with a new orders-domain viewer, reusing content already vetted for accuracy on this branch.

**(b) Where "First entity" commands live → Get Started section only, not the hero.**
Drop `installTabs[2]` ("First entity" tab, byte-for-byte identical to `firstEntityCommands`) from the hero's `InstallPanel`. Hero panel becomes 2 tabs: Install, Run — a pure "get the binary running" flow. `firstEntityCommands` becomes the sole source of the first-entity script, living only in the Get Started section (current `QuickStart.astro`).

**(c) Agent tabs → cut Cursor, Windsurf, GitHub Copilot; keep Claude Code, Codex, Gemini CLI, Any agent.**
Verified `src/scripts/main.ts`'s `initInstallPanels()` queries `[role="tab"]`/`[role="tabpanel"]` generically at runtime with no hardcoded count — shrinking `agentInstallTabs` is a data-only change, zero JS risk. All three cut tabs are marked "(untested)" and contain identical generic "clone the repo, read `SKILL.md`" instructions already covered word-for-word by the "Any agent" tab, so cutting loses no information.

**(d) `WhatItIs.astro` SVG storage box → trim, don't remove.**
Removing it breaks the diagram's narrative (App → Cyoda → nothing). Collapse the In-Memory/Persistent two-column comparison into a single labeled "Storage" box with one caption line, since `GrowthPath.astro` now owns the full storage-progression story exclusively.

**(e) FinalCTA — keep the code block, drop only the second button.**
The doc's own restructure wants FinalCTA to keep "code block + link" as a bookend. Keep `localRunCommand`'s `CodeBlock` and "Get started →" button; remove only the "View on GitHub" button (GitHub is already in nav + hero + footer). Not adding a "Full guide →" link next to it — it would point at the same URL as "Get started →" one line above, which is clutter, not de-duplication.

---

## Phase 0 — Pre-flight: fix stale/soon-to-be-stale verify assertions

`scripts/verify-dev-console.mjs` currently hardcodes two things this restructure will break. Fix both **before** touching component files, so there's a clean, currently-passing (or knowingly-failing-for-a-documented-reason) baseline to work against.

1. **Line 66**: `assertIncludes(homepage, 'Three ways to use Cyoda', ...)` — the actual heading (`ProgressionDiagram.astro` line 20, and `llms-full.txt` line 30) is **"Two ways to use Cyoda"**. This is a pre-existing stale assertion, unrelated to this restructure (likely left over from a removed "Cyoda Cloud" third option per the fact-check doc) — it is almost certainly failing right now. Fix: change the string to `'Two ways to use Cyoda'`.
2. **Lines 58–63**: the script asserts `agentIndex < consoleIndex < whatIndex` — i.e. it currently *requires* "Use Cyoda with your AI coding agent" to appear before "Generate with AI. Refine the workflow visually." (Dev Console heading) to appear before "What Cyoda is". **This assertion encodes the exact backwards ordering the improvement-suggestions doc is asking us to fix.** It must be rewritten to match the new order from Phase 6 below: `whatIndex < agentIndex < consoleIndex` (What Cyoda is → ... → AI agent section → Dev Console section). Do this rewrite in the same commit as Phase 6's reorder, not here — but flag it now so it isn't missed; leaving it stale would silently break CI-equivalent verification.

Run `npm run build && npm run verify:dev-console` now to confirm a clean baseline (after fix #1; fix #2 will still fail until Phase 6 lands — that's expected and fine, just don't let it be a surprise).

---

## Phase 1 — Data-layer dedup

1. **`src/data/install.ts`** — delete the `"First entity"` object from `installTabs` (lines 34–49). Leave `firstEntityCommands` (lines 56–67) as the sole remaining source. `installTabs` now has 2 entries: Install, Run.
2. **`src/data/agentInstallTabs.ts`**:
   - Delete the `note` field on the `claude-code` tab (line 51 — the leaked "local development copy of the marketplace" dev note).
   - Delete the `cursor` (lines 119–137), `windsurf` (138–156), and `github-copilot` (157–174) tab objects.
   - Resulting order: `claude-code`, `codex`, `gemini-cli`, `any-agent`.

**Verify**: `npm run build`; tab through hero panel (now 2 tabs) and agent-install tabs (now 4) in a dev preview to confirm `main.ts` switching still works unmodified.

---

## Phase 2 — Component-level content removal (order unchanged)

3. **`src/components/QuickStart.astro`**:
   - Delete `<ol class="quickstart__steps">` (lines 32–59) — redundant with the hero panel.
   - Delete the whole `<div class="quickstart__optional">` Dev Console sub-block (lines 61–93) — this removes the `analyticsSource="docs"` bug by deletion (the code carrying the bug goes away rather than being patched), and removes 3 of the page's 5 Dev Console CTAs.
   - Keep the `→ Full install guide on docs.cyoda.net` link (lines 95–102) — a "learn more" escape hatch, not a competing start CTA.
4. **`src/components/FinalCTA.astro`** — delete the "View on GitHub" button (lines 36–41). Keep the code block and "Get started →" button.
5. **`src/components/AgentInstallTabs.astro`** — collapse 4 intro blurbs to 1: delete `.agent-install__intro` (26–30), `.agent-install__support-copy` (31–34), and `.agent-install__bottom-note` (100–106). Keep only `.section-subheading` (21–25).
6. **`src/components/DeveloperConsolePreview.astro`** — delete the single-bullet evidence list (lines 33–35: `<ul class="dev-console-preview__evidence">...`). **Note the coupling**: `scripts/verify-dev-console.mjs` line 69 asserts `'Works with local workflow files'` (capital "Works with...") is present in the built homepage. That exact string currently exists *only* in this `<li>` — the subheading above it uses different phrasing ("**Work** with local workflow files without a running Cyoda environment", no "s"). Deleting the bullet without adjusting the assertion will make `verify:dev-console` fail. Fix as part of this step: update the assertion in `verify-dev-console.mjs` to check for text that will still exist post-edit — e.g. `'Work with local workflow files'` (matching the subheading verbatim) — rather than trying to preserve the old exact string in new copy.
7. **`src/components/GrowthPath.astro`** — delete `.growth-path__outro` (lines 45–50), which restates the intro paragraph.

**Verify**: `npm run build && npm run verify:dev-console`; visually spot-check the five touched sections for orphaned wrapper divs or empty gaps.

---

## Phase 3 — Fix the HelloWorld/orders domain mismatch

8. **New file `src/data/orders-entity-workflow.json`** — base it on the workflow JSON embedded in `public/llms-full.txt` (lines 94–113: `initialState: "draft"`, single `submit` transition `manual: true` to `submitted`), **but add the `"importMode": "REPLACE"` wrapper field** that both existing viewer-consumed files (`helloworld-workflow.json`, `treasury-repo-workflow.json`) carry and `llms-full.txt`'s copy omits. [Unverified] Whether the live `/workflow/import` API accepts a payload without `importMode` — the llms-full.txt curl example currently omits it. Recommend the implementer confirm against docs.cyoda.net or the actual API before publishing; if the API requires the field, `llms-full.txt`'s curl payload should also gain it (tracked in Phase 7).
9. **New file `src/components/OrdersWorkflowViewer.tsx`** — mirror `HelloWorldWorkflowViewer.tsx` exactly: import the new JSON via `?raw`, render through `WorkflowDisplay` with `className="workflow-artifact__viewer"`. **Do not pass a `compact` prop.** Verified in `WorkflowDisplay.tsx` that `compact` mode uses a hardcoded coordinate map keyed to the *treasury* workflow's specific state names (`INITIATED`, `VALIDATING`, `REVIEW`, `SETTLEMENT`, `EXCEPTION`, `SETTLED`); `draft`/`submitted` aren't in that map, so `compact` would silently collapse all nodes to `[0,0]`. The non-compact path (what `HelloWorldWorkflowViewer` already uses) runs the real auto-layout engine and works for any workflow shape.
10. **`src/components/QuickStart.astro`**:
    - Swap the `HelloWorldWorkflowViewer` import/usage (lines 6, 121) for `OrdersWorkflowViewer`.
    - Update the `workflow-artifact` header (110–118): title `"HelloWorld"` → `"orders"`, subtitle → `"Lifecycle for the orders example entity used below"`.
    - Update the framing paragraph (24–30) to describe the `orders` graph (draft/submitted states, manual submit transition) instead of HelloWorld.
11. **Dead-code flag, don't delete silently**: after the swap, `src/components/HelloWorldWorkflowViewer.tsx` and `src/data/helloworld-workflow.json` have no remaining consumers (confirmed via grep — only `QuickStart.astro` imported them). Flag to the team before deleting in case they're wanted for a future docs/demo page; don't remove as a side effect of this change.

**Verify**: `npm run build`; load the Get Started section in a dev preview and check the browser console for `WorkflowDisplay` parse errors (it calls `parseImportPayload` from `@cyoda/workflow-core`, which expects the same shape as the two existing files).

---

## Phase 4 — `WhatItIs.astro` SVG trim + prose de-dup

12. **`src/components/WhatItIs.astro`**:
    - Replace the storage box (lines 107–124: divider + In-Memory column + "OR" + Persistent column, 6 text elements) with a single centered "Storage" box + one caption line (`In-Memory · SQLite · PostgreSQL · Cassandra`). Shrink the box height and the outer `viewBox`/`height` (currently 380×360) to match, recomputing the background `<rect>` accordingly.
    - Update the `<title id="arch-diagram-title">` (65–70) to match the simplified storage description (this is the SVG's accessible name — must stay accurate).
    - Trim the first prose paragraph (23–28): remove "Not a collection of components. One model." — redundant with the hero subhead's "without stitching together separate systems".

**Verify**: view the SVG at both the 420px `.what-it-is__diagram` max-width and full desktop width in a dev preview; confirm no clipped text after the height reduction.

---

## Phase 5 — FAQ dedup

13. **`src/data/faq.ts`** — rewrite the "Run it yourself vs Enterprise Cyoda" answer (lines 49–52) so it isn't a near-verbatim restatement of `ProgressionDiagram.astro`'s two-card copy, while staying self-contained (this text also feeds `FAQSection.astro`'s `FAQPage` JSON-LD, read by search engines/AI out of page context — don't shrink it to a bare "see above" pointer). Suggested replacement:
    > "Run it yourself is the open-source path: install the Apache 2.0 binary and run Cyoda on your own infrastructure at no cost, with no account required. Enterprise Cyoda adds SLA-backed support and dedicated engagement for teams running at production scale. Both use the identical core API and entity model, so code written against one runs unchanged against the other."

**Verify**: `npm run build`; grep `dist/index.html` for the FAQPage JSON-LD block, confirm the new answer text is present.

---

## Phase 6 — Section reorder (`src/pages/index.astro`) — do last

14. **`src/pages/index.astro`**:
    - Rewrite the numbered order comment (lines 5–17).
    - New order: `HeroSection` → `ProofBar` → `WhatItIs` → `<section id="capabilities">` (FeatureGrid, "What you get") → `QuickStart` ("Get started") → `AgentInstallTabs` → `DeveloperConsolePreview` → `GrowthPath` → `ProgressionDiagram` → `FAQSection` → `FinalCTA`.
    - Keep `QuickStart`'s `id="install-get-started"` unchanged — `AgentInstallTabs.astro`'s in-page anchor still resolves.
    - **Remove** `AgentInstallTabs.astro`'s `→ Start with a minimal Cyoda app` link (lines 117–119, pointing at `#install-get-started`) — after reorder, Get Started comes *before* this section, so the link becomes a backward-pointing dead end. Keep only "View skills on GitHub".
15. **Also update `scripts/verify-dev-console.mjs`** (from Phase 0, item 2): change the ordering assertion to `whatIndex < agentIndex && agentIndex < consoleIndex`, matching the new order.
16. **Visual banding rebalance** — the reorder puts two same-background sections adjacent (WhatItIs + capabilities both plain; QuickStart + AgentInstallTabs both currently `.section--alt`). Restore alternation with class edits:
    - `index.astro` line 59 — `<section class="section" id="capabilities">` → add `section--alt`.
    - `QuickStart.astro` line 13 — `class="section section--alt"` → `class="section"`.
    - `FinalCTA.astro` line 12 — `class="section section--alt"` → `class="section"`.
    - Resulting alternation: WhatItIs(plain) → capabilities(alt) → QuickStart(plain) → AgentInstallTabs(alt) → DeveloperConsolePreview(plain) → GrowthPath(alt) → ProgressionDiagram(plain) → FAQSection(alt) → FinalCTA(plain).

**Verify**: `npm run build && npm run verify:dev-console` (should now fully pass, including the updated ordering assertion); screenshot the full page scroll to confirm order and background rhythm.

---

## Phase 7 — `public/llms.txt` / `public/llms-full.txt` sync

- **`llms.txt`** — short link-list format, doesn't mirror section order or agent-install content. No structural changes required.
- **`llms-full.txt`** — organized topically, not in homepage visual order, so Phase 6's reorder needs no changes here. Content-level sync required:
  1. Update the "Run it yourself / Enterprise Cyoda" FAQ answer (lines 148–149) to match Phase 5's rewrite.
  2. **Gap found (pre-existing, not caused by this restructure)**: `llms-full.txt` has zero mention of AI coding agents, Claude Code, Codex, Gemini CLI, or the skills repo (confirmed via full read — the word "agent" doesn't appear). This is the homepage section most relevant to the site's AI-agent audience, and it's entirely absent from the AI-consumption file. Recommend adding a `## Use Cyoda With an AI Coding Agent` section summarizing the trimmed 4-tab content plus `site.skillsRepo` (`https://github.com/Cyoda/cyoda-skills`). This is additive and independent of Phase 1's tab-trimming — worth doing even if the rest of this plan is deferred.
  3. If Phase 3's `[Unverified]` `importMode` question resolves to "the API requires it," add `"importMode": "REPLACE"` to the embedded JSON at lines 94–113 to match.
  4. Bump the `Last updated: 2026-04-27` stamp (line 1) to the ship date.

---

## Phase 8 — Verification

Run in order after all phases:

1. `npm run build` — must succeed with no Astro/TS errors (catches broken imports, e.g. `OrdersWorkflowViewer` wiring, and malformed JSON).
2. `npm run verify:dev-console` — must pass, including the two assertions fixed in Phase 0/2/6.
3. Grep-based spot checks against `dist/index.html`:
   - `brew install cyoda/cyoda-go/cyoda` → exactly **2** occurrences (hero + FinalCTA), was 3.
   - The `firstEntityCommands` script's distinctive line → exactly **1** occurrence, was 2.
   - `"untested"` (case-insensitive) → **0** occurrences.
   - `"local development copy of the marketplace"` → **0** occurrences.
   - `"View on GitHub"` → **2** (nav + hero), down from 3.
   - `data-analytics-source="docs"` → **0** occurrences.
   - `"HelloWorld"` inside the Get Started section markup → **0** occurrences.
   - `"Two ways to use Cyoda"` present; `"Three ways to use Cyoda"` absent everywhere, including the verify script itself.
4. Manual dev-preview QA: tab through hero panel (2 tabs) and agent tabs (4 tabs, keyboard arrow-key nav, `aria-selected`/`aria-hidden` toggling); confirm copy-to-clipboard still works; confirm no leftover spacing gaps from removed blocks (`.quickstart__optional`, `.quickstart__steps`, `.agent-install__intro`, etc.).
5. Confirm `WhatItIs.astro`'s SVG `<title>` still accurately describes the trimmed diagram; confirm the FAQ JSON-LD reflects the updated answer.

---

## CSS/JS risk flags (not required to fully resolve, but watch)

- **Dead CSS** after Phases 2–3 in `src/styles/main.css`: `.quickstart__optional*` (~1358–1391), `.quickstart__steps*` (~1344–1357), `.dev-console-preview__evidence*` (~1001–1009), `.agent-install__intro`, `.agent-install__support-copy`, `.agent-install__bottom-note` (~889–898). Build won't fail if left in, but a follow-up cleanup pass is worth doing given the theme of this work.
- **`.install-panel__content { height: 360px }`** (main.css line ~599) was tuned for 3-tab content variance; with the hero panel now 2 short tabs, this fixed height may look oversized. Spot-check visually after Phase 1.
- **`.workflow-artifact__canvas` fixed heights** (420/440/500px across breakpoints, ~1457–1521) were tuned against HelloWorld's rendered graph size. The `orders` graph (2 states, 1 transition) is much simpler — verify it doesn't render tiny/off-center; may need breakpoint-specific height adjustment (not a `compact` prop — see Phase 3 note).

---

## Critical files

- `src/pages/index.astro` — section order
- `src/data/install.ts`, `src/data/agentInstallTabs.ts`, `src/data/faq.ts` — data dedup
- `src/components/QuickStart.astro`, `FinalCTA.astro`, `AgentInstallTabs.astro`, `DeveloperConsolePreview.astro`, `GrowthPath.astro`, `WhatItIs.astro` — content trims
- `src/data/orders-entity-workflow.json` (new), `src/components/OrdersWorkflowViewer.tsx` (new) — domain-mismatch fix
- `scripts/verify-dev-console.mjs` — two hardcoded assertions that must change alongside the restructure
- `public/llms-full.txt` — AI-facing content sync
