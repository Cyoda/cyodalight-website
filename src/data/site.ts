/**
 * Site-wide configuration.
 * See: docs/cyodalight-website-spec-final.md — Section 26 Pre-Build Checklist
 */

// Injected at build time via CYODALIGHT_VERSION environment variable.
// Falls back to placeholder if not set.
export const version =
  import.meta.env.CYODALIGHT_VERSION ?? '[VERSION_PLACEHOLDER]';

export const site = {
  name: 'Cyoda',
  tagline: 'The open-source EDBMS and workflow runtime.',
  url: 'https://cyoda.dev',
  description:
    'Cyoda is an open-source entity database management system (EDBMS) and workflow runtime. Define entity types, enforce lifecycle transitions, and query temporal history. Single binary. REST API; gRPC for external compute processors.',

  // External links — all confirmed in spec
  github: 'https://github.com/Cyoda/cyoda-go',
  skillsRepo: 'https://github.com/Cyoda/cyoda-skills',
  githubReleases: 'https://github.com/Cyoda/cyoda-go/releases',
  docs: 'https://docs.cyoda.net',
  docsQuickstart: 'https://docs.cyoda.net/getting-started/install-and-first-entity/',
  docsApi: 'https://docs.cyoda.net/reference/api/',
  docsEntities: 'https://docs.cyoda.net/concepts/entities-and-lifecycle/',
  docsConfig: 'https://docs.cyoda.net/reference/configuration/',
  docsExamples: 'https://docs.cyoda.net/build/working-with-entities/',
  cyoda: 'https://cyoda.com',

  // Open Graph
  ogImage: '/og-card.png', // TODO: produce 1200x630 PNG per spec section 22
  ogImageWidth: 1200,
  ogImageHeight: 630,

  // Meta
  title: 'Cyoda — Open-Source EDBMS and Workflow Runtime',
  ogTitle: 'Cyoda — Open-Source EDBMS and Workflow Runtime',
  ogDescription:
    'Define stateful entities, enforce lifecycle transitions, and query temporal history. Single binary. SQLite-backed local storage by default. Apache 2.0.',
  twitterDescription:
    'Open-source EDBMS and entity workflow runtime. Install Cyoda, run it locally, import an entity workflow, create an entity, transition it, and read state back.',

  // Legal
  copyrightHolder: 'Cyoda Ltd',
  copyrightYear: 2026,
  licenseUrl: 'https://www.apache.org/licenses/LICENSE-2.0',
} as const;
