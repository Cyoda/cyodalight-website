export const developerConsoleRelease = {
  name: 'Cyoda Developer Console',
  version: 'v0.3.0',
  status: 'Latest',
  platform: 'macOS Apple Silicon',
  brewCommand: 'brew install --cask cyoda/cyoda/cyoda-dev-console',
  runtimeBrewCommand: 'brew install cyoda-platform/cyoda-go/cyoda',
  runtimeStartCommand: 'cyoda',
  repositoryUrl: 'https://github.com/Cyoda/cyoda-dev-console',
  releasesUrl: 'https://github.com/Cyoda/cyoda-dev-console/releases',
  issuesUrl: 'https://github.com/Cyoda/cyoda-dev-console/issues',
  dmgUrl:
    'https://github.com/Cyoda/cyoda-dev-console/releases/download/v0.3.0/cyoda-dev-console_0.3.0_aarch64.dmg',
  pagePath: '/dev-console',
  canonicalUrl: 'https://cyoda.dev/dev-console',
  media: {
    poster: '/media/dev-console/dev-console-workflow-poster.webp',
    demoWebm: '/media/dev-console/dev-console-demo.webm',
    demoMp4: '/media/dev-console/dev-console-demo.mp4',
    workflowEditor: '/media/dev-console/dev-console-workflow-editor.webp',
    sourceEditor: '/media/dev-console/dev-console-source-editor.webp',
    runtimeConnection: '/media/dev-console/dev-console-runtime-connection.webp',
  },
} as const;
