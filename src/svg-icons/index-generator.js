const fs = require('fs');
const rrs = require('recursive-readdir-sync');

const outArray = [];
outArray.push('module.exports = {\n');

rrs('./').forEach(function(file) {
	if(file !== 'index-generator.js' && file !== 'index.js')
	{
		var fileLines = fs.readFileSync(file, 'utf8').split('\n');
		var index = 0, found = false;

		while(found === false && index < fileLines.length)
		{
			if(fileLines[index].indexOf('module.exports') > -1)
			{
				var moduleName = fileLines[index].split('=')[1].replace(';','').trim();

				outArray.push('\t');
				outArray.push(moduleName);
				outArray.push(': require(\'./');
				outArray.push(file.substring(0, file.length - 4));
				outArray.push('\'),\n');

				found = true;
			}

			else
			{
				index++;
			}
		}
	}
});

outArray.push('\n};\n')

fs.writeFileSync('index.js', outArray.join(''));
