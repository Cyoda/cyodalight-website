import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const homepagePath = join(root, 'dist', 'index.html');
const devConsolePath = join(root, 'dist', 'dev-console', 'index.html');
const llmsPath = join(root, 'public', 'llms.txt');
const llmsFullPath = join(root, 'public', 'llms-full.txt');

const exact = {
  consoleCommand: 'brew install --cask cyoda/cyoda/cyoda-dev-console',
  linuxArm64AppImageUrl:
    'https://github.com/cyoda/cyoda-dev-console/releases/download/v0.3.0/cyoda-dev-console_0.3.0_aarch64.AppImage',
  linuxX64AppImageUrl:
    'https://github.com/cyoda/cyoda-dev-console/releases/download/v0.3.0/cyoda-dev-console_0.3.0_amd64.AppImage',
  repoUrl: 'https://github.com/cyoda/cyoda-dev-console',
  releasesUrl: 'https://github.com/cyoda/cyoda-dev-console/releases',
  issuesUrl: 'https://github.com/cyoda/cyoda-dev-console/issues',
};

function fail(message) {
  console.error(`verify:dev-console failed: ${message}`);
  process.exit(1);
}

function read(path) {
  if (!existsSync(path)) fail(`missing file ${path}`);
  return readFileSync(path, 'utf8');
}

function assertIncludes(source, needle, label) {
  if (!source.includes(needle)) fail(`${label} missing ${needle}`);
}

function assertNotIncludes(source, needle, label) {
  if (source.toLowerCase().includes(needle.toLowerCase())) {
    fail(`${label} contains unsupported claim: ${needle}`);
  }
}

function assertOccurrences(source, needle, expected, label) {
  const actual = source.split(needle).length - 1;
  if (actual !== expected) {
    fail(`${label} expected ${expected} occurrence(s) of ${needle}, found ${actual}`);
  }
}

const homepage = read(homepagePath);
const devConsole = read(devConsolePath);
const llms = read(llmsPath);
const llmsFull = read(llmsFullPath);
const combinedPublic = `${homepage}\n${devConsole}\n${llms}\n${llmsFull}`;

assertIncludes(homepage, 'Use Cyoda with your AI coding agent', 'homepage');
assertIncludes(homepage, 'Generate with AI. Refine the workflow visually.', 'homepage');
assertIncludes(homepage, 'What Cyoda is', 'homepage');

const agentIndex = homepage.indexOf('Use Cyoda with your AI coding agent');
const consoleIndex = homepage.indexOf('Generate with AI. Refine the workflow visually.');
const whatIndex = homepage.indexOf('What Cyoda is');
if (!(whatIndex < agentIndex && agentIndex < consoleIndex)) {
  fail('homepage section order is wrong: expected What Cyoda is, then AI agent install, then Developer Console');
}

assertIncludes(homepage, 'One model for entity state, workflows, events, and transactions.', 'homepage hero');
assertIncludes(homepage, 'Two ways to use Cyoda', 'homepage');
assertIncludes(homepage, '/dev-console', 'homepage');
assertIncludes(homepage, exact.releasesUrl, 'homepage');
assertIncludes(homepage, 'local workflow files without a running Cyoda environment', 'homepage');
assertIncludes(homepage, 'v0.3.0', 'homepage');
assertIncludes(homepage, 'Latest', 'homepage');

assertIncludes(devConsole, 'Cyoda Developer Console | Local Workflow Editing', 'dev-console title');
assertIncludes(devConsole, 'https://cyoda.dev/dev-console', 'dev-console canonical');
assertIncludes(devConsole, 'Inspect and refine Cyoda workflows visually.', 'dev-console');
assertIncludes(devConsole, 'without a running Cyoda environment.', 'dev-console');
assertIncludes(devConsole, 'Available on macOS (Apple Silicon and Intel) and Linux (ARM64 and', 'dev-console');
assertIncludes(devConsole, exact.consoleCommand, 'dev-console');
assertIncludes(devConsole, exact.linuxArm64AppImageUrl, 'dev-console');
assertIncludes(devConsole, exact.linuxX64AppImageUrl, 'dev-console');
assertOccurrences(devConsole, exact.linuxArm64AppImageUrl, 1, 'dev-console');
assertOccurrences(devConsole, exact.linuxX64AppImageUrl, 1, 'dev-console');
assertIncludes(devConsole, exact.repoUrl, 'dev-console');
assertIncludes(devConsole, exact.releasesUrl, 'dev-console');
assertIncludes(devConsole, exact.issuesUrl, 'dev-console');
assertIncludes(devConsole, 'dev-console-workflow-poster.webp', 'dev-console media');

assertNotIncludes(devConsole, 'Install and start the Cyoda runtime first', 'dev-console');
assertNotIncludes(llmsFull, 'Install it after installing and starting the Cyoda runtime', 'llms-full.txt');

assertIncludes(llms, 'Developer Console', 'llms.txt');
assertIncludes(llmsFull, 'Optional: Cyoda Developer Console', 'llms-full.txt');
assertIncludes(llmsFull, exact.consoleCommand, 'llms-full.txt');
assertIncludes(llmsFull, exact.linuxArm64AppImageUrl, 'llms-full.txt');
assertIncludes(llmsFull, exact.linuxX64AppImageUrl, 'llms-full.txt');

[
  'cross-platform',
  'production-ready',
  'complete developer platform',
  'full-featured IDE',
  'enterprise-grade desktop tooling',
].forEach((claim) => assertNotIncludes(combinedPublic, claim, 'public output'));

console.log('verify:dev-console passed');
