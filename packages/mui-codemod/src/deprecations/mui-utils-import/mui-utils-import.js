/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  // @mui/utils
  const timeoutSpecifiers = [];
  const deepmergeSpecifiers = [];
  const scrollLeftSpecifier = [];
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@mui/utils')
    .forEach((path) => {
      path.node.specifiers.forEach((specifier) => {
        if (specifier.imported.name === 'unstable_Timeout') {
          timeoutSpecifiers.push(j.importSpecifier(j.identifier(specifier.local.name)));
        } else if (specifier.imported.name === 'unstable_useTimeout') {
          timeoutSpecifiers.push(j.importDefaultSpecifier(j.identifier(specifier.local.name)));
        } else if (specifier.imported.name === 'isPlainObject') {
          deepmergeSpecifiers.push(j.importSpecifier(j.identifier(specifier.local.name)));
        } else if (specifier.imported.name === 'deepmerge') {
          deepmergeSpecifiers.push(j.importDefaultSpecifier(j.identifier(specifier.local.name)));
        } else if (specifier.imported.name === 'unstable_detectScrollType') {
          scrollLeftSpecifier.push(j.importSpecifier(j.identifier(specifier.local.name)));
        } else if (specifier.imported.name === 'unstable_getNormalizedScrollLeft') {
          scrollLeftSpecifier.push(j.importSpecifier(j.identifier(specifier.local.name)));
        } else {
          path.insertAfter(
            j.importDeclaration(
              [j.importDefaultSpecifier(j.identifier(specifier.local.name))],
              j.stringLiteral(`@mui/utils/${specifier.local.name}`),
            ),
          );
        }
      });
      if (timeoutSpecifiers.length) {
        path.insertAfter(
          j.importDeclaration(timeoutSpecifiers, j.stringLiteral(`@mui/utils/useTimeout`)),
        );
      }
      if (deepmergeSpecifiers.length) {
        path.insertAfter(
          j.importDeclaration(deepmergeSpecifiers, j.stringLiteral(`@mui/utils/deepmerge`)),
        );
      }
      if (scrollLeftSpecifier.length) {
        path.insertAfter(
          j.importDeclaration(scrollLeftSpecifier, j.stringLiteral(`@mui/utils/scrollLeft`)),
        );
      }
      path.replace();
    });

  // @mui/base
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@mui/base/composeClasses')
    .forEach((path) => {
      path.insertAfter(
        j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier('composeClasses'))],
          j.stringLiteral(`@mui/utils/composeClasses`),
        ),
      );
      path.replace();
    });

  const existingBaseUtils = [
    'appendOwnerState',
    'areArraysEqual',
    'ClassNameConfigurator',
    'extractEventHandlers',
    'isHostComponent',
    'resolveComponentProps',
    'useSlotProps',
    'mergeSlotProps',
    'prepareForSlot',
  ];
  const baseUtils = [];
  let baseImportPath;
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@mui/base')
    .forEach((path) => {
      baseImportPath = path;
      path.node.specifiers.forEach((specifier) => {
        if (existingBaseUtils.includes(specifier.imported.name)) {
          baseUtils.push(specifier);
        }
        if (specifier.imported.name === 'unstable_composeClasses') {
          path.insertAfter(
            j.importDeclaration(
              [j.importDefaultSpecifier(j.identifier(specifier.local.name))],
              j.stringLiteral(`@mui/utils/composeClasses`),
            ),
          );
        }
      });
    });
  if (baseUtils.length) {
    baseImportPath.insertAfter(j.importDeclaration(baseUtils, j.stringLiteral(`@mui/base/utils`)));
  }
  if (baseImportPath) {
    baseImportPath.node.specifiers = baseImportPath.node.specifiers.filter(
      (specifier) =>
        ![...existingBaseUtils, 'unstable_composeClasses'].includes(specifier.imported.name),
    );
    if (!baseImportPath.node.specifiers.length) {
      baseImportPath.replace();
    }
  }

  // @mui/system
  const colors = [];
  const systemColorFns = [
    'hexToRgb',
    'rgbToHex',
    'hslToRgb',
    'decomposeColor',
    'colorChannel',
    'recomposeColor',
    'getContrastRatio',
    'getLuminance',
    'emphasize',
    'alpha',
    'darken',
    'lighten',
    'private_safeColorChannel',
    'private_safeEmphasize',
    'private_safeAlpha',
    'private_safeDarken',
    'private_safeLighten',
  ];
  const styleFunctionSx = [];
  const useThemePropsSpecifier = [];
  const defaultImport = ['createTheme', 'useThemeWithoutDefault'];
  let systemImportPath;
  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@mui/system')
    .forEach((path) => {
      systemImportPath = path;
      path.node.specifiers.forEach((specifier) => {
        if (systemColorFns.includes(specifier.imported.name)) {
          colors.push(specifier);
        }
        defaultImport.forEach((item) => {
          if (specifier.imported.name === item) {
            path.insertAfter(
              j.importDeclaration(
                [j.importDefaultSpecifier(j.identifier(specifier.local.name))],
                j.stringLiteral(`@mui/system/${specifier.imported.name}`),
              ),
            );
          }
        });
        if (specifier.imported.name === 'getThemeProps') {
          useThemePropsSpecifier.push(j.importSpecifier(j.identifier(specifier.local.name)));
        }
        if (specifier.imported.name === 'useThemeProps') {
          useThemePropsSpecifier.push(j.importDefaultSpecifier(j.identifier(specifier.local.name)));
        }
        if (specifier.imported.name === 'unstable_styleFunctionSx') {
          styleFunctionSx.push(j.importDefaultSpecifier(j.identifier(specifier.local.name)));
        }
        if (specifier.imported.name === 'unstable_defaultSxConfig') {
          styleFunctionSx.push(specifier);
        }
        if (specifier.imported.name === 'unstable_extendSxProp') {
          styleFunctionSx.push(j.importSpecifier(j.identifier('extendSxProp'), specifier.local));
        }
      });
      if (useThemePropsSpecifier.length) {
        path.insertAfter(
          j.importDeclaration(useThemePropsSpecifier, j.stringLiteral(`@mui/system/useThemeProps`)),
        );
      }
    });
  if (colors.length) {
    systemImportPath.insertAfter(
      j.importDeclaration(colors, j.stringLiteral(`@mui/system/colorManipulator`)),
    );
  }
  if (styleFunctionSx.length) {
    systemImportPath.insertAfter(
      j.importDeclaration(styleFunctionSx, j.stringLiteral(`@mui/system/styleFunctionSx`)),
    );
  }
  if (systemImportPath) {
    systemImportPath.node.specifiers = systemImportPath.node.specifiers.filter(
      (specifier) =>
        ![
          ...systemColorFns,
          ...defaultImport,
          'useThemeProps',
          'getThemeProps',
          'unstable_styleFunctionSx',
          'unstable_defaultSxConfig',
          'unstable_extendSxProp',
        ].includes(specifier.imported.name),
    );
    if (!systemImportPath.node.specifiers.length) {
      systemImportPath.replace();
    }
  }

  return root.toSource(printOptions);
}
