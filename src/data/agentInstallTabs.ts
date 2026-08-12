export type AgentInstallStep = {
  label?: string;
  language: "bash" | "text";
  code: string;
};

export type AgentInstallTab = {
  id: string;
  label: string;
  badge?: string;
  description: string;
  steps: AgentInstallStep[];
  note?: string;
};

export const agentInstallTabs: AgentInstallTab[] = [
  {
    id: "claude-code",
    label: "Claude Code",
    badge: "Best supported",
    description:
      "Claude Code can install the Cyoda plugin from the Cyoda skills marketplace.",
    steps: [
      {
        label: "Run inside Claude Code",
        language: "text",
        code: `/plugin marketplace add Cyoda-platform/cyoda-skills
/plugin install cyoda@cyoda
/reload-plugins`,
      },
      {
        label: "Start with",
        language: "text",
        code: `/cyoda:app`,
      },
      {
        label: "Useful Cyoda commands",
        language: "text",
        code: `/cyoda:setup
/cyoda:auth
/cyoda:design
/cyoda:build
/cyoda:compute
/cyoda:test
/cyoda:debug
/cyoda:migrate
/cyoda:docs
/cyoda:status`,
      },
    ],
    note: "If you are using a local development copy of the marketplace, the marketplace name may differ. The public marketplace should use cyoda.",
  },
  {
    id: "codex",
    label: "Codex",
    description:
      "Codex can use Cyoda skills from its local agent skills directory.",
    steps: [
      {
        label: "Install locally",
        language: "bash",
        code: `git clone https://github.com/Cyoda/cyoda-skills.git
mkdir -p ~/.agents/skills
cp -R cyoda-skills/cyoda/skills/* ~/.agents/skills/`,
      },
      {
        label: "Restart Codex",
        language: "text",
        code: "Restart Codex after installing or updating the skills.",
      },
      {
        label: "Verify installation",
        language: "bash",
        code: `find ~/.agents/skills -maxdepth 2 -name SKILL.md -print
grep -R "^name:" ~/.agents/skills/*/SKILL.md`,
      },
      {
        label: "Expected skill names",
        language: "text",
        code: `name: app
name: auth
name: build
name: setup
name: test`,
      },
      {
        label: "Use explicitly",
        language: "text",
        code: `$cyoda-app`,
      },
      {
        label: "Or ask naturally",
        language: "text",
        code: "Build a minimal Cyoda app with one entity, one workflow, criteria, processors and tests.",
      },
    ],
    note: "Codex should automatically use the relevant Cyoda skill when the request matches the skill description. If the skills do not appear in Codex, open the cloned cyoda-skills repository and ask Codex to read the relevant SKILL.md files directly before generating code.",
  },
  {
    id: "gemini-cli",
    label: "Gemini CLI",
    description: "Gemini CLI can use Cyoda through a Gemini extension wrapper.",
    steps: [
      {
        label: "Link local extension",
        language: "bash",
        code: `git clone https://github.com/Cyoda/cyoda-skills.git
cd cyoda-skills/cyoda
gemini extensions link .`,
      },
      {
        label: "Then ask",
        language: "text",
        code: "Use the Cyoda skills to create a minimal workflow-backed application.",
      },
    ],
    note: "If the gemini extension wrapper is not present in your checkout yet, point Gemini at the Cyoda skills repository and ask it to read the relevant SKILL.md files.",
  },
  {
    id: "cursor",
    label: "Cursor",
    description:
      "Cursor can use the Cyoda skill files as project-level context.",
    steps: [
      {
        label: "Get the skills locally (untested)",
        language: "bash",
        code: "git clone https://github.com/Cyoda/cyoda-skills.git",
      },
      {
        label: "Then ask Cursor",
        language: "text",
        code: "Read the SKILL.md files under cyoda-skills/cyoda/skills, then build a minimal Cyoda app with an entity, workflow, criteria, processors and tests.",
      },
    ],
    note: "This gives Cursor Cyoda-specific conventions and generation guidance. It is not the same as installing the Claude Code plugin.",
  },
  {
    id: "windsurf",
    label: "Windsurf",
    description:
      "Windsurf can use the Cyoda skill files as project-level context.",
    steps: [
      {
        label: "Get the skills locally (untested)",
        language: "bash",
        code: "git clone https://github.com/Cyoda/cyoda-skills.git",
      },
      {
        label: "Then ask Windsurf Cascade",
        language: "text",
        code: "Read the SKILL.md files under cyoda-skills/cyoda/skills, then create a small Cyoda workflow application with one entity, criteria, processors and tests.",
      },
    ],
    note: "This gives Windsurf Cyoda-specific coding guidance from the shared skill files.",
  },
  {
    id: "github-copilot",
    label: "GitHub Copilot (untested)",
    description: "GitHub Copilot can use the Cyoda skill files as context.",
    steps: [
      {
        label: "Get the skills locally",
        language: "bash",
        code: "git clone https://github.com/Cyoda/cyoda-skills.git",
      },
      {
        label: "Then ask Copilot",
        language: "text",
        code: "Read the SKILL.md files under cyoda-skills/cyoda/skills, then build a minimal Cyoda app with entities, workflows, criteria and processors.",
      },
    ],
    note: "Copilot uses the skill files as context. It does not install the Claude Code plugin directly.",
  },
  {
    id: "any-agent",
    label: "Any agent",
    badge: "Portable",
    description: "Any coding agent can use the Cyoda skills as context.",
    steps: [
      {
        label: "Point the agent at",
        language: "text",
        code: "https://github.com/Cyoda/cyoda-skills",
      },
      {
        label: "Ask it",
        language: "text",
        code: "Read the SKILL.md files under cyoda/skills, then generate a minimal Cyoda app with one entity, one workflow, criteria, processors and tests.",
      },
    ],
    note: "For agents without native skill/plugin support, reading the SKILL.md files directly is the portable option.",
  },
];
