/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import sharp from 'sharp';
import synonyms from '../data/material/components/material-icons/synonyms.js';

/**
 * README
 *
 * Helpers for generating `iconDescriptions.json`: search keywords and a visual description for
 * every icon, written by an LLM from rendered icon sheets. The LLM passes are run by the
 * `icon-descriptions` Claude Code skill (.claude/skills/icon-descriptions); this script does
 * everything around them.
 *
 * Usage:
 * - `node docs/scripts/iconDescriptions.mjs prepare <workDir> [--all] [--icons=A,B]`
 *   render sheets for icons missing from iconDescriptions.json (or all of them)
 * - `node docs/scripts/iconDescriptions.mjs context <workDir>`
 *   write the per-sheet context (existing synonyms + visual description) for the keyword pass
 * - `node docs/scripts/iconDescriptions.mjs check <workDir> visual|keywords`
 *   validate the LLM output files
 * - `node docs/scripts/iconDescriptions.mjs merge <workDir>`
 *   merge the output into iconDescriptions.json and drop icons that no longer exist
 */

const DESCRIPTIONS_PATH = path.join(
  import.meta.dirname,
  '../data/material/components/material-icons/iconDescriptions.json',
);
// The committed CommonJS build of every icon, so no package build is needed.
const ICONS_LIB = path.join(import.meta.dirname, '../../packages/mui-icons-material/lib');
const THEMES = ['Outlined', 'Rounded', 'TwoTone', 'Sharp'];
const PER_SHEET = 16;
const COLS = 4;
const CELL_W = 256;
const CELL_H = 250;
const ICON_SIZE = 180;
const BANNED_VISUAL_WORDS =
  /\b(filled|outline|outlined|solid|hollow|black|icon|depicting|showing)\b/i;
const FILLER_KEYWORDS = new Set([
  'icon',
  'symbol',
  'button',
  'sign',
  'shape',
  'graphic',
  'image',
  'filled',
  'outlined',
  'solid',
  'black',
  'simple',
  'material',
  'rounded',
  'sharp',
  'two tone',
]);

function readDescriptions() {
  return fs.existsSync(DESCRIPTIONS_PATH)
    ? JSON.parse(fs.readFileSync(DESCRIPTIONS_PATH, 'utf8'))
    : {};
}

function baseIconNames() {
  return fs
    .readdirSync(ICONS_LIB)
    .filter((file) => /^[A-Z]\w*\.js$/.test(file))
    .map((file) => file.slice(0, -'.js'.length))
    .filter((name) => !THEMES.some((theme) => name.endsWith(theme)))
    .sort();
}

function nameWords(name) {
  return (name.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+/g) ?? []).map((w) => w.toLowerCase());
}

// Runs an icon's CommonJS build with stand-ins for its imports, which turns the
// `createSvgIcon(jsx(...))` call into a plain tree of SVG elements.
function loadIconTree(name) {
  const code = fs.readFileSync(path.join(ICONS_LIB, `${name}.js`), 'utf8');
  const cjsModule = { exports: {} };
  const jsx = (type, props) => ({ type, props });
  const fakeRequire = (id) => {
    if (id.endsWith('interopRequireDefault')) {
      return { default: (m) => ({ default: m }) };
    }
    if (id.endsWith('interopRequireWildcard')) {
      return { default: (m) => m };
    }
    if (id === 'react') {
      return { Fragment: 'fragment' };
    }
    if (id.endsWith('createSvgIcon')) {
      return (children) => children;
    }
    if (id === 'react/jsx-runtime') {
      return { jsx, jsxs: jsx };
    }
    throw new Error(`${name}: unexpected require('${id}')`);
  };
  vm.runInNewContext(code, { require: fakeRequire, module: cjsModule, exports: cjsModule.exports });
  return cjsModule.exports.default;
}

function toSvgMarkup(node) {
  if (Array.isArray(node)) {
    return node.map(toSvgMarkup).join('');
  }
  const { children, ...props } = node.props;
  if (node.type === 'fragment') {
    return toSvgMarkup(children);
  }
  const attrs = Object.entries(props)
    .map(([key, value]) => `${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}="${value}"`)
    .join(' ');
  return `<${node.type} ${attrs}>${children ? toSvgMarkup(children) : ''}</${node.type}>`;
}

function iconSvgContent(name) {
  return toSvgMarkup(loadIconTree(name));
}

function sheetSvg(names) {
  const rows = Math.ceil(names.length / COLS);
  const scale = ICON_SIZE / 24;
  const cells = names.map((name, i) => {
    const x = (i % COLS) * CELL_W;
    const y = Math.floor(i / COLS) * CELL_H;
    return `
      <rect x="${x + 1}" y="${y + 1}" width="${CELL_W - 2}" height="${CELL_H - 2}" fill="none" stroke="#ccc"/>
      <g transform="translate(${x + (CELL_W - ICON_SIZE) / 2} ${y + 14}) scale(${scale})">${iconSvgContent(name)}</g>
      <text x="${x + CELL_W / 2}" y="${y + CELL_H - 16}" font-family="Helvetica, Arial" font-size="14"
        text-anchor="middle" fill="#333">${i + 1}. ${name}</text>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${COLS * CELL_W}" height="${rows * CELL_H}">
    <rect width="100%" height="100%" fill="#fff"/>${cells.join('')}</svg>`;
}

function readManifest(workDir) {
  return JSON.parse(fs.readFileSync(path.join(workDir, 'manifest.json'), 'utf8'));
}

function readOutput(workDir, prefix, id) {
  const file = path.join(workDir, 'out', `${prefix}_${id}.json`);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;
}

async function prepare(workDir, args) {
  const descriptions = readDescriptions();
  const explicit = args.find((arg) => arg.startsWith('--icons='));
  let names = baseIconNames();
  if (explicit) {
    const wanted = explicit.slice('--icons='.length).split(',');
    names = names.filter((name) => wanted.includes(name));
  } else if (!args.includes('--all')) {
    names = names.filter((name) => !descriptions[name]);
  }

  fs.mkdirSync(path.join(workDir, 'sheets'), { recursive: true });
  fs.mkdirSync(path.join(workDir, 'out'), { recursive: true });
  const sheets = [];
  for (let i = 0; i < names.length; i += PER_SHEET) {
    const id = String(sheets.length + 1).padStart(3, '0');
    const file = path.join(workDir, 'sheets', `sheet_${id}.png`);
    const sheetNames = names.slice(i, i + PER_SHEET);
    // eslint-disable-next-line no-await-in-loop
    await sharp(Buffer.from(sheetSvg(sheetNames)))
      .png()
      .toFile(file);
    sheets.push({ id, file, names: sheetNames });
  }
  fs.writeFileSync(path.join(workDir, 'manifest.json'), JSON.stringify(sheets, null, 2));
  console.log(`${names.length} icons, ${sheets.length} sheets in ${workDir}`);
}

function context(workDir) {
  fs.mkdirSync(path.join(workDir, 'context'), { recursive: true });
  const fixes = readFixes(workDir);
  for (const sheet of readManifest(workDir)) {
    const visual = { ...readOutput(workDir, 'visual', sheet.id), ...fixes };
    const ctx = Object.fromEntries(
      sheet.names.map((name) => [
        name,
        { synonyms: synonyms[name] ?? '', visual: visual[name] ?? '' },
      ]),
    );
    fs.writeFileSync(
      path.join(workDir, 'context', `ctx_${sheet.id}.json`),
      JSON.stringify(ctx, null, 2),
    );
  }
  console.log(`wrote context for ${readManifest(workDir).length} sheets`);
}

function check(workDir, kind) {
  const prefix = kind === 'visual' ? 'visual' : 'kw';
  const problems = [];
  const toFix = {};
  let count = 0;
  for (const sheet of readManifest(workDir)) {
    const data = readOutput(workDir, prefix, sheet.id);
    if (!data) {
      problems.push(`sheet ${sheet.id}: missing ${prefix}_${sheet.id}.json`);
      continue;
    }
    const missing = sheet.names.filter((name) => !(name in data));
    const extra = Object.keys(data).filter((name) => !sheet.names.includes(name));
    if (missing.length || extra.length) {
      problems.push(`sheet ${sheet.id}: missing [${missing}] unexpected [${extra}]`);
    }
    for (const name of sheet.names.filter((n) => n in data)) {
      count += 1;
      const value = data[name];
      if (kind === 'visual') {
        if (typeof value !== 'string' || !value.trim()) {
          problems.push(`${name}: empty description`);
        } else if (BANNED_VISUAL_WORDS.test(value)) {
          toFix[name] = value;
        }
      } else if (!Array.isArray(value) || value.length === 0) {
        problems.push(`${name}: no keywords`);
      }
    }
  }
  console.log(`${kind}: checked ${count} icons, ${problems.length} problems`);
  problems.forEach((problem) => console.log(`  ${problem}`));

  const fixFile = path.join(workDir, 'out', 'visual_to_fix.json');
  const pending = Object.keys(toFix).filter((name) => !readFixes(workDir)[name]);
  if (kind === 'visual' && pending.length) {
    fs.writeFileSync(fixFile, JSON.stringify(toFix, null, 2));
    console.log(`${pending.length} descriptions use style or filler words, see ${fixFile}`);
  }
  if (problems.length || (kind === 'visual' && pending.length)) {
    process.exitCode = 1;
  }
}

// Rewritten descriptions from the cleanup pass, applied on merge.
function readFixes(workDir) {
  const file = path.join(workDir, 'out', 'visual_fixed.json');
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
}

function merge(workDir) {
  const descriptions = readDescriptions();
  const fixes = readFixes(workDir);
  let dropped = 0;
  for (const sheet of readManifest(workDir)) {
    const visual = { ...readOutput(workDir, 'visual', sheet.id), ...fixes };
    const keywords = readOutput(workDir, 'kw', sheet.id) ?? {};
    for (const name of sheet.names) {
      if (!visual[name] || !keywords[name]) {
        continue;
      }
      const covered = new Set([...nameWords(name), ...(synonyms[name] ?? '').split(' ')]);
      const raw = keywords[name].map((k) => k.trim().toLowerCase());
      const kept = [...new Set(raw)].filter((k) => k && !FILLER_KEYWORDS.has(k) && !covered.has(k));
      dropped += raw.length - kept.length;
      descriptions[name] = { keywords: kept, visual: visual[name] };
    }
  }
  const existing = new Set(baseIconNames());
  const removed = Object.keys(descriptions).filter((name) => !existing.has(name));
  removed.forEach((name) => delete descriptions[name]);

  const sorted = Object.fromEntries(
    Object.keys(descriptions)
      .sort()
      .map((name) => [name, descriptions[name]]),
  );
  fs.writeFileSync(DESCRIPTIONS_PATH, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(
    `${Object.keys(sorted).length} icons in iconDescriptions.json, ` +
      `dropped ${dropped} weak keywords, removed ${removed.length} stale icons`,
  );
}

const [command, workDir, ...rest] = process.argv.slice(2);
if (!workDir) {
  throw new Error('Usage: iconDescriptions.mjs <prepare|context|check|merge> <workDir> [...]');
}
switch (command) {
  case 'prepare':
    await prepare(workDir, rest);
    break;
  case 'context':
    context(workDir);
    break;
  case 'check':
    check(workDir, rest[0]);
    break;
  case 'merge':
    merge(workDir);
    break;
  default:
    throw new Error(`Unknown command ${command}`);
}
