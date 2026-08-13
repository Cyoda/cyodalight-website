I read every homepage component and rendered the built site to check visual hierarchy. Your instinct is right: the page has three "get started" surfaces, two Developer Console callouts, and a section order that asks developers to install things before it tells them what Cyoda is. Here's the full assessment.

## The redundancies, quantified

  The install quickstart appears three times. The brew install cyoda/cyoda-go/cyoda + cyoda init + cyoda sequence is shown in the hero install panel (HeroSection.astro via InstallPanel), again as a numbered step list in "Install and get started" (QuickStart.astro), and a third time in the final CTA (FinalCTA.astro). The "first entity" curl script is rendered twice verbatim — once as the hero panel's "First entity" tab and again as the orders-entity-lifecycle.sh block in QuickStart (install.ts exports the identical string twice as installTabs[2].code and firstEntityCommands).

  Developer Console is pitched twice. A full spotlight section (DeveloperConsolePreview.astro, two CTAs) and then an "Optional: install Cyoda Developer Console" sub-block inside QuickStart with a brew code block plus two more links. Five Dev Console CTAs on one page. A developer who wasn't interested at section 5 isn't converted by seeing it again at section 7 — it just makes the quickstart longer and buries the core product's own onramp.

  The docs quickstart URL is linked from four sections (hero, QuickStart, "Two ways to use", final CTA), and "View on GitHub" appears in the nav, hero, and final CTA.

  The "one model, not stitched-together systems" message is stated four times in prose — hero subhead, first two paragraphs of WhatItIs.astro, FAQ item 5, and again implicitly in the feature grid. And GrowthPath.astro's intro and outro paragraphs say the same thing twice within one section ("Start in-memory… then move to durable" / "starts as a fast local runtime… then scales through durable and distributed backends"). The storage progression itself is drawn three times: WhatItIs SVG, GrowthPath image, and an FAQ answer.

## The bigger UX problem: no single conversion path

  The page currently offers a developer roughly seven different "start" actions (docs link, hero install tabs, agent-skill install, Dev Console download, quickstart steps, "Install locally", final CTA) without ranking them. For a developer-conversion page you want one primary action ("run this in your terminal in 60 seconds") with the AI-agent path as a clearly framed alternative — not parallel competing funnels.

  Section order compounds this: "Use Cyoda with your AI coding agent" is section 4, before "What Cyoda is" (section 6). A first-time visitor is asked to install agent skills for a product that hasn't been explained yet. The dependency is backwards.

## Trust-eroding copy (matters most for developer conversion)

  - agentInstallTabs.ts ships internal dev notes to production: "If you are
  using a local development copy of the marketplace, the marketplace name may
  differ." No visitor has a local development copy.
  - Tab labels and step labels say "(untested)" three times (Cursor, Windsurf,
  GitHub Copilot). Honest, but on a marketing page it reads as "we didn't finish
  this." Either test them or cut the tabs to Claude Code / Codex / Gemini /
  "Any agent" — the "Any agent" tab already covers the rest.
  - The agent-install section has four intro paragraphs that say the same thing
  (subheading, intro, support-copy, footer note — all variants of "we ship
  skills; agents differ; pick your tab"). One sentence plus tabs would do.
  - The Dev Console spotlight's "evidence" list has a single bullet — "Works
  with local workflow files" — which restates the sentence directly above it. An
  evidence list with one weak item is worse than none.
  - QuickStart's framing paragraph promises a HelloWorld walkthrough, but the
  code block operates on an orders entity while the graph beside it shows
  HelloWorld — a developer following along will notice the example switches
  domain mid-section.
  - Small bug: the QuickStart Dev Console block's analytics attributes say
  data-analytics-source="docs" though it's on the homepage.
  - The proof bar's "Compatible with:" strip has only two entries (Java,
  Python), which reads thin — consider folding it into the hero or adding the
  REST-API framing there ("any HTTP client") instead of a two-logo strip.

  ## Suggested restructure

  1. Hero — keep as-is; it's genuinely good (clear headline, install panel,
  honest badge). Make this install panel the only full quickstart on the page.
  2. Proof bar
  3. What Cyoda is — moved up; explain before asking for installs.
  4. What you get (feature grid)
  5. Get started — one canonical section: link back to hero commands or keep the
  first-entity walkthrough here only (drop the "First entity" tab from the
  hero, or drop this block — pick one home for it). Fix the HelloWorld/orders
  mismatch. Reduce Dev Console here to a single link line, or cut it.
  6. Use with your AI coding agent — now the visitor knows what they're
  generating. One intro sentence, tabs trimmed to tested agents + "Any agent."
  7. Developer Console spotlight — the single Dev Console callout.
  8. Growth path — cut the outro paragraph; consider dropping the storage split
  from the WhatItIs SVG since this section owns that story.
  9. Two ways to use → FAQ (dedupe answers that restate sections verbatim, e.g.
  the Run-it-yourself/Enterprise answer) → Final CTA (fine as a bookend, but one
  button: the code block + "Full guide →" — drop the second GitHub link).
  6. Use with your AI coding agent — now the visitor knows what they're generating. One intro sentence, tabs trimmed to tested agents + "Any agent."
  7. Developer Console spotlight — the single Dev Console callout.
  8. Growth path — cut the outro paragraph; consider dropping the storage split from the WhatItIs SVG since this section owns that story.
  9. Two ways to use → FAQ (dedupe answers that restate sections verbatim, e.g. the Run-it-yourself/Enterprise answer) → Final CTA (fine as a bookend, but one
  button: the code block + "Full guide →" — drop the second GitHub link).

  That takes the page from ~12 scroll-screens of overlapping funnels to one narrative: what it is → what you get → run it → make your agent fluent in it → see it visually → scale it. Happy to implement any subset of this — say the word and I'll start with the low-risk cuts (duplicate code blocks, internal notes, redundant paragraphs) before any reordering.
