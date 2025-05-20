import path from 'path';
import fse from 'fs-extra';
import yargs from 'yargs';
import { rimrafSync } from 'rimraf';
import Mustache from 'mustache';
import globAsync from 'fast-glob';
import { fileURLToPath } from 'url';
import intersection from 'lodash/intersection.js';
import { Queue } from '@mui/internal-waterfall';

const currentDirectory = fileURLToPath(new URL('.', import.meta.url));

/**
 * Converts directory separators to slashes, so the path can be used in fast-glob.
 * @param {string} pathToNormalize
 * @returns
 */
function normalizePath(pathToNormalize) {
  return pathToNormalize.replace(/\\/g, '/');
}

/**
 * Return Pascal-Cased component name.
 * @param {string} destPath
 * @returns {string} class name
 */
export function getComponentName(destPath) {
  const splitregex = new RegExp(`[\\${path.sep}-]+`);

  const parts = destPath
    .replace('.js', '')
    .split(splitregex)
    .map((part) => part.charAt(0).toUpperCase() + part.substring(1));

  return parts.join('');
}

async function worker({ progress, outputFile, options, template }) {
  progress();

  const { fileName, variants } = outputFile;

  const outputFileDir = path.dirname(path.join(options.outputDir, fileName));
  await fse.ensureDir(outputFileDir);

  const SVGs = await Promise.all(
    Object.keys(variants).map(async (variant) => {
      const svgPath = variants[variant];
      const SVG = await fse.readFile(svgPath, { encoding: 'utf8' });
      const data = SVG.replace(/<svg\b[^>]*><path d="/i, '') // strip opening tag
        .replace(/"\/><\/svg>/i, '') // strip closing tag
        .trim();

      // we don't need to clean the SVGs singe we assume that Google has done a good job at this already
      // cleaning may result in some kind of distortion considering they have optimized for perfect pixel placement

      return { variant, data };
    }),
  );

  let variantsData = '{\n';
  SVGs.forEach((svg) => {
    const { variant, data } = svg;
    variantsData += `    '${variant}': '${data}',\n`;
  });
  variantsData += '  }';

  const componentName = getComponentName(fileName.split(path.sep).pop());

  const fileString = Mustache.render(template, {
    variantsData,
    componentName,
  });

  const absDestPath = path.join(options.outputDir, fileName);
  await fse.writeFile(absDestPath, fileString);
}

export async function handler(options) {
  const progress = options.disableLog ? () => {} : () => process.stdout.write('.');

  rimrafSync(`${options.outputDir}/*.js`, { glob: true }); // Clean old files

  let variantCollector = options.variantCollector;
  if (typeof variantCollector === 'string') {
    const variantCollectorModule = await import(variantCollector);
    variantCollector = variantCollectorModule.default;
  }
  if (typeof variantCollector !== 'function') {
    throw new Error('variantCollector must be a function');
  }

  await fse.ensureDir(options.outputDir);

  if (!variantCollector) {
    throw new Error('variantCollector is required');
  }

  const [paths, template] = await Promise.all([
    globAsync(normalizePath(path.join(options.svgDir, options.glob))),
    fse.readFile(path.join(currentDirectory, 'templateVariableIconFromSvg.js'), {
      encoding: 'utf8',
    }),
  ]);

  const outputFiles = variantCollector(paths, options.svgDir);

  const queue = new Queue(
    (outputFile) =>
      worker({
        progress,
        outputFile,
        options,
        template,
      }),
    { concurrency: 8 },
  );

  queue.push(outputFiles);
  await queue.wait({ empty: true });

  await fse.ensureDir(path.join(currentDirectory, '/legacy'));
  let legacyFiles = await globAsync(normalizePath(path.join(currentDirectory, '/legacy', '*.js')));
  legacyFiles = legacyFiles.map((file) => path.basename(file));
  let generatedFiles = await globAsync(normalizePath(path.join(options.outputDir, '*.js')));
  generatedFiles = generatedFiles.map((file) => path.basename(file));

  const duplicatedIconsLegacy = intersection(legacyFiles, generatedFiles);
  if (duplicatedIconsLegacy.length > 0) {
    throw new Error(
      `Duplicated icons in legacy folder. Either \n` +
        `1. Remove these from the /legacy folder\n` +
        `2. Add them to the blacklist to keep the legacy version\n` +
        `The following icons are duplicated: \n${duplicatedIconsLegacy.join('\n')}`,
    );
  }

  await fse.copy(path.join(currentDirectory, '/legacy'), options.outputDir);
  await fse.ensureDir(path.join(currentDirectory, '/custom'));
  await fse.copy(path.join(currentDirectory, '/custom'), options.outputDir);

  // TOOD: generate barrel files
}

const nodePath = path.resolve(process.argv[1]);
const modulePath = path.resolve(fileURLToPath(import.meta.url));
const isRunningDirectlyViaCLI = nodePath === modulePath;

if (isRunningDirectlyViaCLI) {
  yargs(process.argv.slice(2))
    .command({
      command: '$0>',
      description: "Build JSX components from SVG's.",
      handler,
      builder: (command) => {
        command
          .option('output-dir', {
            required: true,
            type: 'string',
            describe: 'Directory to output jsx components',
          })
          .option('svg-dir', {
            required: true,
            type: 'string',
            describe: 'Directory to output jsx components',
          })
          .option('glob', {
            type: 'string',
            describe: 'Glob to match inside of --svg-dir',
            default: '**/*.svg',
          })
          .option('inner-path', {
            type: 'string',
            describe:
              '"Reach into" subdirs, since libraries like material-design-symbols' +
              ' use arbitrary build directories to organize icons' +
              ' e.g. "action/svg/production/icon_3d_rotation_24px.svg"',
            default: '',
          })
          .option('file-suffix', {
            type: 'string',
            describe:
              'Filter only files ending with a suffix (pretty much only for @mui/symbols-material)',
          })
          .option('variant-collector', {
            type: 'string',
            describe: 'Path to JS module used to collect variants into a single path.',
          })
          .option('disable-log', {
            type: 'boolean',
            describe: 'If true, does not produce any output in STDOUT.',
            default: false,
          });
      },
    })
    .help()
    .strict(true)
    .version(false)
    .parse();
}
