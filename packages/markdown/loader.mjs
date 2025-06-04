import { promises as fs, readdirSync, statSync } from 'fs';
import path from 'path';
import prepareMarkdown from './prepareMarkdown.mjs';
import extractImports from './extractImports.mjs';

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
  const delimiter = /(@|\.|-|\/|:)/;
  return moduleID
    .split(delimiter)
    .filter((part) => !delimiter.test(part))
    .map((part) => (part.length === 0 ? '$' : part))
    .map(upperCaseFirst)
    .join('');
}

let componentPackageMapping = null;

function findComponents(packages) {
  const mapping = {};

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
          if (!mapping[pkg.productId]) {
            mapping[pkg.productId] = {};
          }
          // filename starts with Uppercase = component
          mapping[pkg.productId][folder] = packageName;
        }
      });
    });
  });

  return mapping;
}

/**
 * @type {import('webpack').loader.Loader}
 */
export default async function demoLoader() {
  const englishFilepath = this.resourcePath;
  const options = this.getOptions();

  if (componentPackageMapping === null) {
    componentPackageMapping = findComponents(options.packages ?? []);
  }

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
          options.languagesInProgress.includes(matchNotEnglishMarkdown[1])
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
  const fileRelativeContext = path
    .relative(options.workspaceRoot, this.context)
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
  const nonEditableDemos = new Set();
  const relativeModules = new Map();
  const demoNames = Array.from(
    new Set(
      docs.en.rendered
        .filter((markdownOrComponentConfig) => {
          return typeof markdownOrComponentConfig !== 'string' && markdownOrComponentConfig.demo;
        })
        .map((demoConfig) => {
          if (demoConfig.hideToolbar) {
            nonEditableDemos.add(demoConfig.demo);
          }
          return demoConfig.demo;
        }),
    ),
  );

  /**
   * @param {*} demoName
   * @param {*} moduleFilepath
   * @param {*} variant
   * @param {*} importModuleID
   * @returns {string} The name of the imported module along with a resolved extension if not provided
   * @example detectRelativeImports('ComboBox.js', '', JS', './top100Films') => relativeModules.set('ComboBox.js', new Map([['./top100Films.js', ['JS']]]))
   */
  function detectRelativeImports(demoName, moduleFilepath, variant, importModuleID) {
    let relativeModuleFilename = importModuleID;
    if (importModuleID.startsWith('.')) {
      const demoMap = relativeModules.get(demoName);
      // If the moduleID does not end with an extension, or ends with an unsupported extension (e.g. ".styling") we need to resolve it
      // Fastest way to get a file extension, see: https://stackoverflow.com/a/12900504/
      const importType = importModuleID.slice(
        (Math.max(0, importModuleID.lastIndexOf('.')) || Infinity) + 1,
      );
      const supportedTypes = ['js', 'jsx', 'ts', 'tsx', 'css', 'json'];
      if (!importType || !supportedTypes.includes(importType)) {
        // If the demo is a JS demo, we can assume that the relative import is either
        // a `.js` or a `.jsx` file, with `.js` taking precedence over `.jsx`
        // likewise for TS demos, with `.ts` taking precedence over `.tsx`
        const extensions =
          variant === 'JS' ? ['.js', '.jsx', '.ts', '.tsx'] : ['.ts', '.tsx', '.js', '.jsx'];
        const extension = extensions.find((ext) => {
          try {
            return statSync(path.join(moduleFilepath, '..', `${importModuleID}${ext}`));
          } catch (error) {
            // If the file does not exist, we return false and continue to the next extension
            return false;
          }
        });
        if (!extension) {
          throw new Error(
            [
              `You are trying to import a module "${importModuleID}" in the demo "${demoName}" that could not be resolved.`,
              `Please make sure that one of the following file exists:`,
              ...extensions.map((ext) => `- ${importModuleID}${ext}`),
            ].join('\n'),
          );
        } else {
          relativeModuleFilename = `${importModuleID}${extension}`;
        }
      }

      if (!demoMap) {
        relativeModules.set(demoName, new Map([[relativeModuleFilename, [variant]]]));
      } else {
        const variantArray = demoMap.get(relativeModuleFilename);
        if (variantArray) {
          variantArray.push(variant);
        } else {
          demoMap.set(relativeModuleFilename, [variant]);
        }
      }
    }
    return relativeModuleFilename;
  }

  /**
   * Inserts the moduleData into the relativeModules object
   * @param string demoName
   * @param {*} moduleData
   * @param string variant
   * @example updateRelativeModules(demoName, {module: 'constants.js', raw: ... }, 'JS') => demos[demoName].relativeModules[variant].push(moduleData)
   */
  function updateRelativeModules(demoName, moduleData, variant) {
    if (demos[demoName].relativeModules[variant]) {
      // Avoid duplicates
      if (
        !demos[demoName].relativeModules[variant].some((elem) => elem.module === moduleData.module)
      ) {
        demos[demoName].relativeModules[variant].push(moduleData);
      }
    } else {
      demos[demoName].relativeModules[variant] = [moduleData];
    }
  }

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

      // Skip non-editable demos
      if (!nonEditableDemos.has(demoName)) {
        extractImports(demos[demoName].raw).forEach((importModuleID) => {
          // detect relative import
          detectRelativeImports(demoName, moduleFilepath, 'JS', importModuleID);
          importedModuleIDs.add(importModuleID);
        });
      }

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

        // Extract relative imports from the TypeScript version
        // of demos which have relative imports in the JS version
        if (relativeModules.has(demoName)) {
          extractImports(demos[demoName].rawTS).forEach((importModuleID) => {
            detectRelativeImports(demoName, moduleTSFilepath, 'TS', importModuleID);
            importedModuleIDs.add(importModuleID);
          });
        }

        demoModuleIDs.add(demos[demoName].moduleTS);
      } catch (error) {
        // TS version of the demo doesn't exist. This is fine.
      }

      /* Map over relative import module IDs and resolve them
       * while grouping by demo variant
       * From:
       * relativeModules: { 'ComboBox.js' =>
       *    { './top100Films.js'  => ['JS', 'TS'] }
       * }
       * To:
       * demos["ComboBox.js"].relativeModules = {
       *     JS: [{ module: './top100Films.js', raw: '...' }],
       *     TS: [{ module: './top100Films.js', raw: '...' }]
       *   }
       * }
       */

      if (relativeModules.has(demoName)) {
        if (!demos[demoName].relativeModules) {
          demos[demoName].relativeModules = {};
        }

        const addedModulesRelativeToModulePath = new Set();
        await Promise.all(
          Array.from(relativeModules.get(demoName)).map(async ([relativeModuleID, variants]) => {
            for (const variant of variants) {
              let raw = '';
              const relativeModuleFilePath = path.join(
                path.dirname(moduleFilepath),
                relativeModuleID,
              );

              // the file has already been processed
              if (addedModulesRelativeToModulePath.has(relativeModuleFilePath)) {
                continue;
              }

              try {
                // We are only iterating trough an array that looks
                // like this: ['JS', 'TS'], so  it is safe to await
                // eslint-disable-next-line no-await-in-loop
                raw = await fs.readFile(relativeModuleFilePath, {
                  encoding: 'utf8',
                });

                const importedProcessedModuleIDs = new Set();
                const importedProcessedModulesIDsParents = new Map();
                // Find the relative paths in the relative module
                extractImports(raw).forEach((importModuleID) => {
                  // detect relative import
                  const importModuleIdWithExtension = detectRelativeImports(
                    relativeModuleID,
                    relativeModuleFilePath,
                    variant,
                    importModuleID,
                  );
                  if (importModuleID.startsWith('.')) {
                    importedProcessedModuleIDs.add(importModuleIdWithExtension);
                    importedProcessedModulesIDsParents.set(
                      importModuleIdWithExtension,
                      relativeModuleFilePath,
                    );
                  }
                });

                updateRelativeModules(demoName, { module: relativeModuleID, raw }, variant);
                addedModulesRelativeToModulePath.add(relativeModuleFilePath);

                // iterate recursively over the relative imports
                while (importedProcessedModuleIDs.size > 0) {
                  for (const entry of importedProcessedModuleIDs) {
                    if (entry.startsWith('.')) {
                      const entryModuleFilePath = path.join(
                        path.dirname(importedProcessedModulesIDsParents.get(entry)),
                        entry,
                      );

                      // We are only iterating trough an array that looks
                      // like this: ['JS', 'TS'], so  it is safe to await
                      // eslint-disable-next-line no-await-in-loop
                      const rawEntry = await fs.readFile(entryModuleFilePath, { encoding: 'utf8' });

                      extractImports(rawEntry).forEach((importModuleID) => {
                        // detect relative import
                        const importModuleIdWithExtension = detectRelativeImports(
                          relativeModuleID,
                          entryModuleFilePath,
                          variant,
                          importModuleID,
                        );
                        if (importModuleID.startsWith('.')) {
                          importedProcessedModuleIDs.add(importModuleIdWithExtension);
                          importedProcessedModulesIDsParents.set(
                            importModuleIdWithExtension,
                            entryModuleFilePath,
                          );
                        }
                      });

                      if (!addedModulesRelativeToModulePath.has(entryModuleFilePath)) {
                        const modulePathDirectory = moduleFilepath
                          .split('/')
                          .slice(0, -1)
                          .join('/');
                        const moduleData = {
                          module: `.${entryModuleFilePath.replace(modulePathDirectory, '')}`,
                          raw: rawEntry,
                        };
                        updateRelativeModules(demoName, moduleData, variant);
                        addedModulesRelativeToModulePath.add(entryModuleFilePath);
                      }
                    }
                    importedProcessedModuleIDs.delete(entry);
                  }
                }
              } catch {
                throw new Error(
                  `Could not find a module for the relative import "${relativeModuleID}" in the demo "${demoName}"`,
                );
              }
            }
          }),
        );
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
    const moduleID = componentName.startsWith('@mui/docs/')
      ? componentName
      : path.join(this.rootContext, 'src', componentName).replace(/\\/g, '/');

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
}
