export const developerConsoleRelease = {
  name: 'Cyoda Developer Console',
  version: 'v0.3.0',
  status: 'Latest',
  platform: 'macOS and Linux',
  brewCommand: 'brew install --cask cyoda/cyoda/cyoda-dev-console',
  repositoryUrl: 'https://github.com/cyoda/cyoda-dev-console',
  releasesUrl: 'https://github.com/cyoda/cyoda-dev-console/releases',
  issuesUrl: 'https://github.com/cyoda/cyoda-dev-console/issues',
  appleSiliconDmgUrl:
    'https://github.com/cyoda/cyoda-dev-console/releases/download/v0.3.0/cyoda-dev-console_0.3.0_aarch64.dmg',
  intelDmgUrl:
    'https://github.com/cyoda/cyoda-dev-console/releases/download/v0.3.0/cyoda-dev-console_0.3.0_x86_64.dmg',
  linuxArm64AppImageUrl:
    'https://github.com/cyoda/cyoda-dev-console/releases/download/v0.3.0/cyoda-dev-console_0.3.0_aarch64.AppImage',
  linuxX64AppImageUrl:
    'https://github.com/cyoda/cyoda-dev-console/releases/download/v0.3.0/cyoda-dev-console_0.3.0_amd64.AppImage',
  windowsBuildUrl:
    'https://github.com/cyoda/cyoda-dev-console/blob/main/RELEASE.md#build-from-source-on-windows',
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
