import fs from 'fs';
import rrs from 'recursive-readdir-sync';

const outArray = [];

rrs('./').forEach((file) => {
  if (file !== 'index-generator.js' && file !== 'index.js') {
    let fileLines = fs.readFileSync(file, 'utf8').split('\n');
    let index = 0;
    let found = false;

    while (found === false && index < fileLines.length) {
      if (fileLines[index].indexOf('export default') > -1) {
        const moduleName = fileLines[index].split(' ')[2].replace(';', '').trim();
        const modulePath = file.substring(0, file.length - 4);

        outArray.push(`import ${moduleName} from './${modulePath}';\nexport { ${moduleName} };\n`);

        found = true;
      } else {
        index++;
      }
    }
  }
});

fs.writeFileSync('index.js', outArray.join(''));
