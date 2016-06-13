import fs from 'fs';
import rrs from 'recursive-readdir-sync';

const outArray = [];
const svgIconPath = 'src/svg-icons/';

rrs(svgIconPath).forEach((file) => {
  if (file !== 'index-generator.js' && file !== 'index.js') {
    const fileLines = fs.readFileSync(file, 'utf8').split('\n');
    let index = 0;
    let found = false;

    while (found === false && index < fileLines.length) {
      if (fileLines[index].indexOf('export default') > -1) {
        const moduleName = fileLines[index].split(' ')[2].replace(';', '').trim();
        const modulePath = file.substring(0, file.length - 3).replace(/\\/g, '/').replace(svgIconPath, '');

        outArray.push(`export ${moduleName} from './${modulePath}';\n`);

        found = true;
      } else {
        index++;
      }
    }
  }
});

fs.writeFileSync(`./${svgIconPath}/index.js`, outArray.join(''));
