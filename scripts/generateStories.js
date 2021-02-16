const fs = require('fs');
const path = require('path');

const TEMP_WHITELIST_STORIES = ['lists', 'menus', 'switches', 'text-fields', 'pickers', 'tooltips'];
const IGNORE_STORIES = ['no-ssr', 'material-icons'];

const docsComponentsFolderPath = path.resolve(__dirname, '../docs/src/pages/components');
const generatedStoriesPath = path.resolve(__dirname, '../stories/generated');

const JS_FILE_REGEXP = /(.*?)\.js$/;

const allTopLevelFiles = fs.readdirSync(docsComponentsFolderPath);
const allComponents = allTopLevelFiles
  .filter(item => fs.lstatSync(path.resolve(docsComponentsFolderPath, item)).isDirectory())
  .filter(item => !IGNORE_STORIES.includes(item))
  .filter(item => TEMP_WHITELIST_STORIES.includes(item));

// Delete and create the generated stories path
if (fs.existsSync(generatedStoriesPath)) {
  fs.rmdirSync(generatedStoriesPath, { recursive: true });
}
fs.mkdirSync(generatedStoriesPath);


allComponents
  .map(componentName => {
    const componentFolderPath = path.resolve(docsComponentsFolderPath, componentName);
    const allExampleFiles = fs.readdirSync(componentFolderPath);
    return [componentName, allExampleFiles];
  })
  .filter(([,allExampleFiles]) => allExampleFiles.length > 0)
  .forEach(([componentName, allExampleFiles]) =>{
    
    // Only get js files
    const jsFiles = allExampleFiles.filter(fileName => JS_FILE_REGEXP.test(fileName));
    
    const exportStatements = jsFiles
      // Remove extension
      .map(fileName => fileName.replace(JS_FILE_REGEXP, '$1'))
      // Get relative path to file
      .map(fileName => [fileName, `../../docs/src/pages/components/${componentName}/${fileName}`])
      .map(([fileName, filePath]) => `export { default as ${fileName} } from '${filePath}'`);
      
    const defaultExport  = `export default { title: '${componentName}' };\n`;

    const storyPath = path.resolve(generatedStoriesPath, `${componentName}.stories.js`);
    const storyFile = [defaultExport, ...exportStatements].join('\n');
    fs.writeFileSync(storyPath, storyFile);
  });
