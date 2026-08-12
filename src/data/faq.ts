/**
 * FAQ items — spec section 15.
 * Used by both FAQAccordion component and JSON-LD FAQPage schema.
 * Single source of truth — edit here, both outputs update automatically.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'What is Cyoda?',
    answer:
      'Cyoda is an open-source entity database management system (EDBMS) and workflow runtime. You define your entity types — the fields they carry, the states they can be in, and the valid transitions between states. Cyoda enforces those rules at the API boundary, records every state change immutably, and lets you query the history of any entity at any point in time. It runs as a single binary with no distributed cluster required.',
  },
  {
    question: 'What is an EDBMS?',
    answer:
      'An entity database management system (EDBMS) is a runtime that manages the full lifecycle of typed, stateful business objects — entities. Where a standard database stores rows, an EDBMS tracks state transitions, enforces lifecycle rules, and maintains a temporal audit trail. Cyoda adds a workflow engine to this model: transition rules are explicit, invalid transitions are rejected at the API boundary, and the complete state history is queryable.',
  },
  {
    question: 'Why use stateful entities?',
    answer:
      'Most backend systems need to track the state of business objects over time — orders, users, requests, approvals, jobs. Without a structured model, state logic ends up scattered across application code and database columns with no enforcement and no history. Cyoda gives each entity a defined lifecycle with enforced rules. Your application code drives transitions; Cyoda ensures they are valid and records them.',
  },
  {
    question: 'What kinds of systems fit Cyoda?',
    answer:
      'Systems where entities change state over time and where the history of those changes matters: workflow automation, order management, approval pipelines, event-driven backends, audit-sensitive applications, and anywhere you would otherwise build a hand-rolled state machine with an audit log.',
  },
  {
    question: 'What does it mean to have workflow, state, events, and transactions in one model?',
    answer:
      'Most backend systems require separate tools for each: a workflow engine, a state machine library, an event bus, and a transaction manager, connected by integration code. Each connection point is a source of inconsistency, hidden state, and operational complexity. Cyoda runs these capabilities as one runtime. Entity state, lifecycle transitions, event-driven processing, and transactional consistency all operate within the same model — with no integration layer between them.',
  },
  {
    question: 'How does Cyoda improve AI-assisted development?',
    answer:
      'AI tools generate better code when the system model is explicit and structured. Because Cyoda defines entity types, valid states, and transition rules as queryable schema rather than implicit application logic, AI tools can reason about system behavior from the model rather than inferring it from scattered code. The result is more accurate code generation, more precise debugging assistance, and a lower risk of incorrect state handling in generated output.',
  },
  {
    question: 'What is the difference between in-memory and PostgreSQL mode?',
    answer:
      'SQLite-backed local storage is the default for a fresh local install. In-memory mode stores entity state in process memory and resets when the process stops, which is useful for fast functional tests. PostgreSQL stores entity state durably for service deployments that need an external database.',
  },
  {
    question: 'What is the difference between Run it yourself and Enterprise Cyoda?',
    answer:
      'Run it yourself: install the open-source binary and run Cyoda on your own machine or infrastructure. Free, Apache 2.0, no account required. Enterprise Cyoda: larger-scale deployment with enterprise support, SLA, and dedicated engagement for organisations with advanced operational requirements. Both options share the same core API and entity model.',
  },
  {
    question: 'What languages are supported?',
    answer:
      'Any language with an HTTP client can use the REST API for entities, search, and workflow operations. External compute processors connect over gRPC. Java and Python client example/template projects are available to get started quickly.',
  },
  {
    question: 'Where is the GitHub repo?',
    answer:
      'The source code is at github.com/Cyoda/cyoda-go. Issues, releases, and contributions are managed there.',
  },
  {
    question: 'Where is the documentation?',
    answer:
      'Full documentation is at docs.cyoda.net. The install-and-first-entity guide covers installation, local startup, importing an entity workflow, creating an entity, invoking a lifecycle transition, and reading state back.',
  },
];
