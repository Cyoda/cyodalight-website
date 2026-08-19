/**
 * Key capabilities grid — spec section 13.
 * 8 cards, data-driven. Edit here without touching layout code.
 */

export interface Feature {
  iconId: string; // references an inline SVG symbol id
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    iconId: 'icon-entity',
    title: 'Stateful entities',
    description:
      'Define typed entity types with fields, valid states, lifecycle guards, and transition rules. The model is explicit, version-controlled, and enforced at runtime.',
  },
  {
    iconId: 'icon-workflow',
    title: 'Entity workflows',
    description:
      'Each entity workflow runs as a finite state machine. Invalid lifecycle transitions are rejected at the API boundary. Transition logic is declared, not buried in application code.',
  },
  {
    iconId: 'icon-events',
    title: 'Event-driven processing',
    description:
      'Events trigger entity lifecycle transitions. The event model is first-class, explicit, and traceable — not routed through a separate bus or implicit callbacks.',
  },
  {
    iconId: 'icon-transaction',
    title: 'Transactional consistency',
    description:
      'State transitions are atomic. An entity\'s state and its history are always consistent. No partial updates. No reconciliation logic required.',
  },
  {
    iconId: 'icon-history',
    title: 'Temporal history',
    description:
      'Every state change is recorded. Query the exact state of any entity at any point in time. Point-in-time access is built in, not retrofitted.',
  },
  {
    iconId: 'icon-audit',
    title: 'Immutable audit trail',
    description:
      'A non-modifiable record of every transition: entity, state change, actor, timestamp. Compliance and debugging share the same source of truth.',
  },
  {
    iconId: 'icon-grpc',
    title: 'REST and gRPC APIs',
    description:
      'REST API for entities, search, and workflow operations — any language with an HTTP client works. gRPC connects external compute processors. Java and Python client templates get you started.',
  },
  {
    iconId: 'icon-ai',
    title: 'AI-ready model',
    description:
      'Explicit entity state and defined transitions give AI tools a structured, queryable model. More precise reasoning, less inference from scattered code.',
  },
];
