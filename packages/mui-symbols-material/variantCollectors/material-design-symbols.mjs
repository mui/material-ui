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

function rewriteName(fileName) {
  fileName = fileName.replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());

  if (fileName.startsWith('3dRotation')) {
    return `ThreeD${fileName.slice(2)}`;
  }

  if (fileName.startsWith('3p')) {
    return `ThreeP${fileName.slice(2)}`;
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

function parseVariantPath(path, dir) {
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
  const variantMatch = before.match(/(wght\d+)?(gradN?\d+)?(fill1)?$/);
  const variant = variantMatch ? variantMatch[0] : '';

  let weight = 400;
  let grade = 0;
  let fill = false;

  if (variant) {
    const w = variant.match(/wght(\d+)/);
    if (w) {
      weight = Number(w[1]);
    }

    const g = variant.match(/grad(N?)(\d+)/);
    if (g) {
      grade = (g[1] === 'N' ? -1 : 1) * Number(g[2]);
    }

    fill = variant.includes('fill1');
  }

  let emphasis = '';
  if (grade === -25) {
    emphasis = '-light';
  } else if (grade === 200) {
    emphasis = '-heavy';
  }

  const fileName = `symbols${theme === 'outlined' ? '' : `-${theme}`}${weight === 400 ? '' : `-${weight}`}/${name}.js`;
  const variantName = `${opticalSize}px${emphasis}${fill ? '-filled' : ''}`;

  return { fileName, variantName, name, theme, weight, emphasis, fill, opticalSize };
}

function collectVariants(paths, dir) {
  const variants = {};

  paths.forEach((path) => {
    const variant = parseVariantPath(path, dir);

    if (!variants[variant.fileName]) {
      variants[variant.fileName] = {};
    }

    variants[variant.fileName][variant.variantName] = path;
  });

  const outputs = [];
  Object.keys(variants).forEach((fileName) => {
    outputs.push({ fileName, variants: variants[fileName] });
  });

  return outputs;
}

export default collectVariants;
