const fs = require('fs');
const path = require('path');

const IGNORE_STORIES = [
  // SSR is currently not supported in Bojagi, therefore excluding
  'no-ssr',
  // Material icons increases build time by a lot, that's why it's currently excluded
  'material-icons',
];

const docsComponentsFolderPath = path.resolve(__dirname, '../docs/src/pages/components');
const storiesPath = path.resolve(__dirname, '../stories');
const generatedStoriesPath = path.resolve(storiesPath, 'generated');

const JS_FILE_REGEXP = /(.*?)\.js$/;

const allTopLevelFiles = fs.readdirSync(docsComponentsFolderPath);
const allComponents = allTopLevelFiles
  .filter((item) => fs.lstatSync(path.resolve(docsComponentsFolderPath, item)).isDirectory())
  .filter((item) => !IGNORE_STORIES.includes(item));

// Delete and create the generated stories path
if (!fs.existsSync(storiesPath)) {
  fs.mkdirSync(storiesPath);
}
if (fs.existsSync(generatedStoriesPath)) {
  fs.rmdirSync(generatedStoriesPath, { recursive: true });
}
fs.mkdirSync(generatedStoriesPath);

allComponents
  .map((componentName) => {
    const componentFolderPath = path.resolve(docsComponentsFolderPath, componentName);
    const allExampleFiles = fs.readdirSync(componentFolderPath);
    const jsExampleFiles = allExampleFiles.filter((fileName) => JS_FILE_REGEXP.test(fileName));
    return [componentName, jsExampleFiles];
  })
  .filter(([, exampleFiles]) => exampleFiles.length > 0)
  .forEach(([componentName, exampleFiles]) => {
    // Only get js files
    const jsFiles = exampleFiles.filter((fileName) => JS_FILE_REGEXP.test(fileName));

    const exportStatements = jsFiles
      // Remove extension
      .map((fileName) => fileName.replace(JS_FILE_REGEXP, '$1'))
      // Get relative path to file
      .map((fileName) => [fileName, `../../docs/src/pages/components/${componentName}/${fileName}`])
      .map(([fileName, filePath]) => `export { default as ${fileName} } from '${filePath}'`);

    const readableTitle = componentName
      .split('-')
      .map((word) => word.substr(0, 1).toUpperCase() + word.substr(1))
      .join(' ');

    const defaultExport = `export default { title: '${readableTitle}' };\n`;

    const storyPath = path.resolve(generatedStoriesPath, `${componentName}.stories.js`);
    const storyFile = [defaultExport, ...exportStatements].join('\n');
    fs.writeFileSync(storyPath, storyFile);
  });
