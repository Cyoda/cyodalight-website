import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const homepagePath = join(root, 'dist', 'index.html');
const devConsolePath = join(root, 'dist', 'dev-console', 'index.html');
const llmsPath = join(root, 'public', 'llms.txt');
const llmsFullPath = join(root, 'public', 'llms-full.txt');

const exact = {
  runtimeCommand: 'brew install cyoda-platform/cyoda-go/cyoda',
  consoleCommand: 'brew install --cask cyoda/cyoda/cyoda-dev-console',
  dmgUrl:
    'https://github.com/Cyoda/cyoda-dev-console/releases/download/v0.3.0/cyoda-dev-console_0.3.0_aarch64.dmg',
  repoUrl: 'https://github.com/Cyoda/cyoda-dev-console',
  releasesUrl: 'https://github.com/Cyoda/cyoda-dev-console/releases',
  issuesUrl: 'https://github.com/Cyoda/cyoda-dev-console/issues',
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
if (!(agentIndex < consoleIndex && consoleIndex < whatIndex)) {
  fail('homepage Developer Console section is not after AI agent and before What Cyoda is');
}

assertIncludes(homepage, 'One model for entity state, workflows, events, and transactions.', 'homepage hero');
assertIncludes(homepage, 'Three ways to use Cyoda', 'homepage');
assertIncludes(homepage, '/dev-console', 'homepage');
assertIncludes(homepage, exact.dmgUrl, 'homepage');
assertIncludes(homepage, 'macOS Apple Silicon', 'homepage');
assertIncludes(homepage, 'v0.3.0', 'homepage');
assertIncludes(homepage, 'Latest', 'homepage');

assertIncludes(devConsole, 'Cyoda Developer Console | Read-only Workflow Display', 'dev-console title');
assertIncludes(devConsole, 'https://cyoda.dev/dev-console', 'dev-console canonical');
assertIncludes(devConsole, 'Inspect and refine Cyoda workflows visually.', 'dev-console');
assertIncludes(devConsole, 'optional desktop companion', 'dev-console');
assertIncludes(devConsole, 'Available now for macOS Apple Silicon.', 'dev-console');
assertIncludes(devConsole, exact.runtimeCommand, 'dev-console');
assertIncludes(devConsole, 'cyoda', 'dev-console runtime start command');
assertIncludes(devConsole, exact.consoleCommand, 'dev-console');
assertIncludes(devConsole, exact.dmgUrl, 'dev-console');
assertIncludes(devConsole, exact.repoUrl, 'dev-console');
assertIncludes(devConsole, exact.releasesUrl, 'dev-console');
assertIncludes(devConsole, exact.issuesUrl, 'dev-console');
assertIncludes(devConsole, 'dev-console-workflow-poster.webp', 'dev-console media');

const runtimeInstallIndex = devConsole.indexOf(exact.runtimeCommand);
const consoleInstallIndex = devConsole.indexOf(exact.consoleCommand);
if (!(runtimeInstallIndex > -1 && runtimeInstallIndex < consoleInstallIndex)) {
  fail('runtime install must appear before console install on /dev-console');
}

assertIncludes(llms, 'Developer Console', 'llms.txt');
assertIncludes(llmsFull, 'Optional: Cyoda Developer Console', 'llms-full.txt');
assertIncludes(llmsFull, exact.consoleCommand, 'llms-full.txt');

[
  'cross-platform',
  'production-ready',
  'complete developer platform',
  'full-featured IDE',
  'enterprise-grade desktop tooling',
].forEach((claim) => assertNotIncludes(combinedPublic, claim, 'public output'));

console.log('verify:dev-console passed');
