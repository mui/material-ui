const singleDigitNumbers = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
];
const twoDigitNumbers1 = [
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
];

const familyDirMap = {
  materialsymbolsoutlined: 'outlined',
  materialsymbolsrounded: 'rounded',
  materialsymbolssharp: 'sharp',
};
const familyMap = {
  outlined: 'Material Symbols Outlined',
  rounded: 'Material Symbols Rounded',
  sharp: 'Material Symbols Sharp',
};
const classNameMap = {
  outlined: 'material-symbols-outlined',
  rounded: 'material-symbols-rounded',
  sharp: 'material-symbols-sharp',
};

export function rewriteName(fileName) {
  fileName = fileName.replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());

  if (fileName.startsWith('2d')) {
    return `TwoD${fileName.slice(2)}`;
  }
  if (fileName.startsWith('3d')) {
    return `ThreeD${fileName.slice(2)}`;
  }

  if (fileName.startsWith('3p')) {
    return `ThreeP${fileName.slice(2)}`;
  }

  if (fileName.startsWith('24fps')) {
    return `TwentyFourFps${fileName.slice(5)}`;
  }
  if (fileName.startsWith('30fps')) {
    return `ThirtyFps${fileName.slice(5)}`;
  }
  if (fileName.startsWith('60fps')) {
    return `SixtyFps${fileName.slice(5)}`;
  }
  if (fileName.startsWith('360')) {
    return `ThreeSixty${fileName.slice(3)}`;
  }

  if (fileName.startsWith('20mp')) {
    return `TwentyM${fileName.slice(3)}`;
  }
  if (fileName.startsWith('50mp')) {
    return `FiftyM${fileName.slice(3)}`;
  }

  if (/\dFt/.test(fileName)) {
    return `${singleDigitNumbers[fileName[0]]}${fileName.slice(1)}`;
  }

  if (/\dk/.test(fileName)) {
    return `${singleDigitNumbers[fileName[0]]}K${fileName.slice(2)}`;
  }

  if (/^\dmp/.test(fileName)) {
    return `${singleDigitNumbers[fileName[0]]}M${fileName.slice(2)}`;
  }
  if (/^1\dmp/.test(fileName)) {
    return `${twoDigitNumbers1[fileName[1]]}M${fileName.slice(3)}`;
  }
  if (/^2\dmp/.test(fileName)) {
    return `Twenty${singleDigitNumbers[fileName[1]]}M${fileName.slice(3)}`;
  }

  if (fileName.startsWith('1x')) {
    return `TimesOne${fileName.slice(2)}`;
  }

  if (fileName.startsWith('3g')) {
    return `ThreeG${fileName.slice(2)}`;
  }
  if (fileName.startsWith('4g')) {
    return `FourG${fileName.slice(2)}`;
  }
  if (fileName.startsWith('5g')) {
    return `FiveG${fileName.slice(2)}`;
  }

  // All other names starting with a number between 10 and 19
  if (/^1\d/.test(fileName)) {
    return `${twoDigitNumbers1[fileName[1]]}${fileName.slice(2)}`;
  }

  return fileName;
}

function stripDir(path, dir) {
  return path.startsWith(dir) ? path.slice(dir.length) : path;
}

function parseVariationPath(path, dir) {
  path = stripDir(path, dir);

  if (path.startsWith('/')) {
    path = path.slice(1);
  }

  const [rawName, rawTheme, fileWithExt] = path.split('/');
  if (!fileWithExt) {
    throw new Error(`Invalid path format: ${path}`);
  }

  const name = rewriteName(rawName);
  const theme = familyDirMap[rawTheme];

  const basename = fileWithExt.replace(/\.svg$/, '');
  const lastUnd = basename.lastIndexOf('_');
  if (lastUnd < 0) {
    throw new Error(`No "_" before size in "${basename}"`);
  }

  const sizePart = basename.slice(lastUnd + 1); // "48px"
  const opticalSize = Number(sizePart.replace(/px$/, ''));
  if (Number.isNaN(opticalSize)) {
    throw new Error(`Cannot parse size from "${sizePart}"`);
  }

  const before = basename.slice(0, lastUnd);
  const hasVariations = before.match(/(wght\d+)?(gradN?\d+)?(fill1)?$/);
  const variations = hasVariations ? hasVariations[0] : '';

  let weight = 400;
  let grade = 0;
  let fill = false;

  if (variations) {
    const w = variations.match(/wght(\d+)/);
    if (w) {
      weight = Number(w[1]);
    }

    const g = variations.match(/grad(N?)(\d+)/);
    if (g) {
      grade = (g[1] === 'N' ? -1 : 1) * Number(g[2]);
    }

    fill = variations.includes('fill1');
  }

  let emphasis = '';
  if (grade === -25) {
    emphasis = '-light';
  } else if (grade === 200) {
    emphasis = '-heavy';
  }

  const fileName = `symbols-inline${theme === 'outlined' ? '' : `-${theme}`}${weight === 400 ? '' : `-${weight}`}/${name}.js`;
  const fontFileName = `symbols-font${theme === 'outlined' ? '' : `-${theme}`}${weight === 400 ? '' : `-${weight}`}/${name}.js`;
  const fontIconName = rawName;
  const family = familyMap[theme];
  const className = classNameMap[theme];
  const staticVariations = `{ wght: ${weight} }`;
  const variationName = `${opticalSize}px${emphasis}${fill ? '-filled' : ''}`;

  return {
    fileName,
    fontFileName,
    fontIconName,
    variationName,
    family,
    className,
    staticVariations,
    name,
    theme,
    weight,
    emphasis,
    fill,
    opticalSize,
  };
}

function collectVariations(paths, dir) {
  const variations = {};

  paths.forEach((path) => {
    const variation = parseVariationPath(path, dir);

    if (!variations[variation.fileName]) {
      variations[variation.fileName] = {
        componentName: variation.name,
        fontIconName: variation.fontIconName,
        fontFileName: variation.fontFileName,
        family: variation.family,
        className: variation.className,
        staticVariations: variation.staticVariations,
        svgPaths: {},
      };
    }

    variations[variation.fileName].svgPaths[variation.variationName] = path;
  });

  const outputs = [];
  Object.keys(variations).forEach((fileName) => {
    outputs.push({ fileName, variations: variations[fileName] });
  });

  return outputs;
}

export default collectVariations;
