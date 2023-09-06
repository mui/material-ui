const { promises: fs, readdirSync } = require('fs');
const path = require('path');
const { prepareMarkdown } = require('./parseMarkdown');
const extractImports = require('./extractImports');

const notEnglishMarkdownRegExp = /-([a-z]{2})\.md$/;

/**
 * @param {string} string
 */
function upperCaseFirst(string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

/**
 * @param {string} moduleID
 * @example moduleIDToJSIdentifier('./Box.js') === '$$IndexJs'
 * @example moduleIDToJSIdentifier('./Box-new.js') === '$$BoxNewJs'
 * @example moduleIDToJSIdentifier('../Box-new.js') === '$$$BoxNewJs'
 */
function moduleIDToJSIdentifier(moduleID) {
  const delimiter = /(\.|-|\/|:)/;
  return moduleID
    .split(delimiter)
    .filter((part) => !delimiter.test(part))
    .map((part) => (part.length === 0 ? '$' : part))
    .map(upperCaseFirst)
    .join('');
}

const componentPackageMapping = {
  'material-ui': {},
  'base-ui': {},
  'joy-ui': {},
};

const packages = [
  {
    productId: 'material-ui',
    paths: [
      path.join(__dirname, '../../packages/mui-base/src'),
      path.join(__dirname, '../../packages/mui-lab/src'),
      path.join(__dirname, '../../packages/mui-material/src'),
    ],
  },
  {
    productId: 'base-ui',
    paths: [path.join(__dirname, '../../packages/mui-base/src')],
  },
  {
    productId: 'joy-ui',
    paths: [path.join(__dirname, '../../packages/mui-joy/src')],
  },
];

packages.forEach((pkg) => {
  pkg.paths.forEach((pkgPath) => {
    const match = pkgPath.match(/packages(?:\\|\/)([^/\\]+)(?:\\|\/)src/);
    const packageName = match ? match[1] : null;
    if (!packageName) {
      throw new Error(`cannot find package name from path: ${pkgPath}`);
    }
    const filePaths = readdirSync(pkgPath);
    filePaths.forEach((folder) => {
      if (folder.match(/^[A-Z]/)) {
        if (!componentPackageMapping[pkg.productId]) {
          throw new Error(`componentPackageMapping must have "${pkg.productId}" as a key`);
        }
        // filename starts with Uppercase = component
        componentPackageMapping[pkg.productId][folder] = packageName;
      }
    });
  });
});

/**
 * @type {import('webpack').loader.Loader}
 */
module.exports = async function demoLoader() {
  const englishFilepath = this.resourcePath;
  const options = this.getOptions();

  const englishFilename = path.basename(englishFilepath, '.md');

  const files = await fs.readdir(path.dirname(englishFilepath));
  const translations = await Promise.all(
    files
      .map((filename) => {
        if (filename === `${englishFilename}.md`) {
          return {
            filename,
            userLanguage: 'en',
          };
        }

        const matchNotEnglishMarkdown = filename.match(notEnglishMarkdownRegExp);

        if (
          filename.startsWith(englishFilename) &&
          matchNotEnglishMarkdown !== null &&
          options.languagesInProgress.indexOf(matchNotEnglishMarkdown[1]) !== -1
        ) {
          return {
            filename,
            userLanguage: matchNotEnglishMarkdown[1],
          };
        }

        return null;
      })
      .filter((translation) => translation)
      .map(async (translation) => {
        const filepath = path.join(path.dirname(englishFilepath), translation.filename);
        this.addDependency(filepath);
        const markdown = await fs.readFile(filepath, { encoding: 'utf8' });

        return {
          ...translation,
          markdown,
        };
      }),
  );

  // Use .. as the docs runs from the /docs folder
  const repositoryRoot = path.join(this.rootContext, '..');
  const fileRelativeContext = path
    .relative(repositoryRoot, this.context)
    // win32 to posix
    .replace(/\\/g, '/');

  const { docs } = prepareMarkdown({
    fileRelativeContext,
    translations,
    componentPackageMapping,
    options,
  });

  const demos = {};
  const importedModuleIDs = new Set();
  const components = {};
  const demoModuleIDs = new Set();
  const componentModuleIDs = new Set();
  const demoNames = Array.from(
    new Set(
      docs.en.rendered
        .filter((markdownOrComponentConfig) => {
          return typeof markdownOrComponentConfig !== 'string' && markdownOrComponentConfig.demo;
        })
        .map((demoConfig) => {
          return demoConfig.demo;
        }),
    ),
  );

  await Promise.all(
    demoNames.map(async (demoName) => {
      const multipleDemoVersionsUsed = !demoName.endsWith('.js');

      // TODO: const moduleID = demoName;
      // The import paths currently use a completely different format.
      // They should just use relative imports.
      let moduleID = `./${demoName.replace(
        `pages/${fileRelativeContext.replace(/^docs\/src\/pages\//, '')}/`,
        '',
      )}`;

      if (multipleDemoVersionsUsed) {
        moduleID = `${moduleID}/system/index.js`;
      }

      const moduleFilepath = path.join(
        path.dirname(this.resourcePath),
        moduleID.replace(/\//g, path.sep),
      );
      this.addDependency(moduleFilepath);
      demos[demoName] = {
        module: moduleID,
        raw: await fs.readFile(moduleFilepath, { encoding: 'utf8' }),
      };
      demoModuleIDs.add(moduleID);
      extractImports(demos[demoName].raw).forEach((importModuleID) =>
        importedModuleIDs.add(importModuleID),
      );

      if (multipleDemoVersionsUsed) {
        // Add Tailwind demo data
        const tailwindModuleID = moduleID.replace('/system/index.js', '/tailwind/index.js');
        try {
          // Add JS demo data
          const tailwindModuleFilepath = path.join(
            path.dirname(this.resourcePath),
            tailwindModuleID.replace(/\//g, path.sep),
          );

          demos[demoName].moduleTailwind = tailwindModuleID;
          demos[demoName].rawTailwind = await fs.readFile(tailwindModuleFilepath, {
            encoding: 'utf8',
          });

          this.addDependency(tailwindModuleFilepath);

          demoModuleIDs.add(tailwindModuleID);

          extractImports(demos[demoName].rawTailwind).forEach((importModuleID) =>
            importedModuleIDs.add(importModuleID),
          );

          demoModuleIDs.add(demos[demoName].moduleTailwind);
        } catch (error) {
          // tailwind js demo doesn't exists
        }

        try {
          // Add TS demo data
          const tailwindTSModuleID = tailwindModuleID.replace('.js', '.tsx');

          const tailwindTSModuleFilepath = path.join(
            path.dirname(this.resourcePath),
            tailwindTSModuleID.replace(/\//g, path.sep),
          );

          demos[demoName].moduleTSTailwind = tailwindTSModuleID;
          demos[demoName].rawTailwindTS = await fs.readFile(tailwindTSModuleFilepath, {
            encoding: 'utf8',
          });

          this.addDependency(tailwindTSModuleFilepath);

          demoModuleIDs.add(tailwindTSModuleID);

          extractImports(demos[demoName].rawTailwindTS).forEach((importModuleID) =>
            importedModuleIDs.add(importModuleID),
          );

          demoModuleIDs.add(demos[demoName].moduleTSTailwind);
        } catch (error) {
          // tailwind TS demo doesn't exists
        }

        // Add plain CSS demo data
        const cssModuleID = moduleID.replace('/system/index.js', '/css/index.js');
        try {
          // Add JS demo data
          const cssModuleFilepath = path.join(
            path.dirname(this.resourcePath),
            cssModuleID.replace(/\//g, path.sep),
          );

          demos[demoName].moduleCSS = cssModuleID;
          demos[demoName].rawCSS = await fs.readFile(cssModuleFilepath, {
            encoding: 'utf8',
          });

          this.addDependency(cssModuleFilepath);

          demoModuleIDs.add(cssModuleID);

          extractImports(demos[demoName].rawCSS).forEach((importModuleID) =>
            importedModuleIDs.add(importModuleID),
          );

          demoModuleIDs.add(demos[demoName].moduleCSS);
        } catch (error) {
          // plain css js demo doesn't exists
        }

        try {
          // Add TS demo data
          const cssTSModuleID = cssModuleID.replace('.js', '.tsx');

          const cssTSModuleFilepath = path.join(
            path.dirname(this.resourcePath),
            cssTSModuleID.replace(/\//g, path.sep),
          );

          demos[demoName].moduleTSCSS = cssTSModuleID;
          demos[demoName].rawCSSTS = await fs.readFile(cssTSModuleFilepath, {
            encoding: 'utf8',
          });

          this.addDependency(cssTSModuleFilepath);

          demoModuleIDs.add(cssTSModuleID);

          extractImports(demos[demoName].rawCSSTS).forEach((importModuleID) =>
            importedModuleIDs.add(importModuleID),
          );

          demoModuleIDs.add(demos[demoName].moduleTSCSS);
        } catch (error) {
          // plain css demo doesn't exists
        }

        // Tailwind preview
        try {
          const tailwindPreviewFilepath = moduleFilepath.replace(
            `${path.sep}system${path.sep}index.js`,
            `${path.sep}tailwind${path.sep}index.tsx.preview`,
          );

          const tailwindJsxPreview = await fs.readFile(tailwindPreviewFilepath, {
            encoding: 'utf8',
          });
          this.addDependency(tailwindPreviewFilepath);

          demos[demoName].tailwindJsxPreview = tailwindJsxPreview;
        } catch (error) {
          // No preview exists. This is fine.
        }

        // CSS preview
        try {
          const cssPreviewFilepath = moduleFilepath.replace(
            `${path.sep}system${path.sep}index.js`,
            `${path.sep}css${path.sep}index.tsx.preview`,
          );

          const cssJsxPreview = await fs.readFile(cssPreviewFilepath, {
            encoding: 'utf8',
          });
          this.addDependency(cssPreviewFilepath);

          demos[demoName].cssJsxPreview = cssJsxPreview;
        } catch (error) {
          // No preview exists. This is fine.
        }
      }

      try {
        const previewFilepath = moduleFilepath.replace(/\.js$/, '.tsx.preview');

        const jsxPreview = await fs.readFile(previewFilepath, { encoding: 'utf8' });
        this.addDependency(previewFilepath);

        demos[demoName].jsxPreview = jsxPreview;
      } catch (error) {
        // No preview exists. This is fine.
      }

      try {
        const moduleTS = moduleID.replace(/\.js$/, '.tsx');
        const moduleTSFilepath = path.join(
          path.dirname(this.resourcePath),
          moduleTS.replace(/\//g, path.sep),
        );
        this.addDependency(moduleTSFilepath);
        const rawTS = await fs.readFile(moduleTSFilepath, { encoding: 'utf8' });

        // In development devs can choose whether they want to work on the TS or JS version.
        // But this leads to building both demo version i.e. more build time.
        demos[demoName].moduleTS = this.mode === 'production' ? moduleID : moduleTS;
        demos[demoName].rawTS = rawTS;
        demoModuleIDs.add(demos[demoName].moduleTS);
      } catch (error) {
        // TS version of the demo doesn't exist. This is fine.
      }
    }),
  );

  const componentNames = Array.from(
    new Set(
      docs.en.rendered
        .filter((markdownOrComponentConfig) => {
          return (
            typeof markdownOrComponentConfig !== 'string' && markdownOrComponentConfig.component
          );
        })
        .map((componentConfig) => {
          return componentConfig.component;
        }),
    ),
  );

  componentNames.forEach((componentName) => {
    const moduleID = path.join(this.rootContext, 'src', componentName).replace(/\\/g, '/');

    components[moduleID] = componentName;
    componentModuleIDs.add(moduleID);
  });

  const transformed = `
  ${Array.from(importedModuleIDs)
    .map((moduleID) => {
      return `import * as ${moduleIDToJSIdentifier(
        moduleID.replace('@', '$'),
      )} from '${moduleID}';`;
    })
    .join('\n')}

    ${Array.from(demoModuleIDs)
      .map((moduleID) => {
        return `import ${moduleIDToJSIdentifier(moduleID)} from '${moduleID}';`;
      })
      .join('\n')}
    ${Array.from(componentModuleIDs)
      .map((moduleID) => {
        return `import ${moduleIDToJSIdentifier(moduleID)} from '${moduleID}';`;
      })
      .join('\n')}
export const docs = ${JSON.stringify(docs, null, 2)};
export const demos = ${JSON.stringify(demos, null, 2)};

demos.scope = {
  process: {},
  import: {
${Array.from(importedModuleIDs)
  .map((moduleID) => `    "${moduleID}": ${moduleIDToJSIdentifier(moduleID.replace('@', '$'))},`)
  .join('\n')}
  },
};

export const demoComponents = {
${Array.from(demoModuleIDs)
  .map((moduleID) => {
    return `  "${moduleID}": ${moduleIDToJSIdentifier(moduleID)},`;
  })
  .join('\n')}
};
export const srcComponents = {
${Array.from(componentModuleIDs)
  .map((moduleID) => {
    return `  "${components[moduleID]}": ${moduleIDToJSIdentifier(moduleID)},`;
  })
  .join('\n')}
};
`;

  return transformed;
};
