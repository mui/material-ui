import path from 'path';
import fs from 'fs';

import glob from 'glob';
import prettier from 'prettier';
import * as ttp from '../src';

const prettierConfig = prettier.resolveConfig.sync(path.join(__dirname, '../.prettierrc'));

const testCases = glob.sync('**/input.{d.ts,ts,tsx}', { absolute: true, cwd: __dirname });

// Create program for all files to speed up tests
const program = ttp.createProgram(
	testCases,
	ttp.loadConfig(path.resolve(__dirname, '../tsconfig.json'))
);

for (const testCase of testCases) {
	const dirname = path.dirname(testCase);
	const testName = dirname.substr(__dirname.length + 1);
	const astPath = path.join(dirname, 'output.json');
	const outputPath = path.join(dirname, 'output.js');

	it(testName, () => {
		const ast = ttp.parseFromProgram(testCase, program);

		//#region Check AST matches
		if (fs.existsSync(astPath)) {
			expect(ast).toMatchObject(JSON.parse(fs.readFileSync(astPath, 'utf8')));
		} else {
			fs.writeFileSync(
				astPath,
				prettier.format(JSON.stringify(ast), {
					...prettierConfig,
					filepath: astPath,
				})
			);
		}
		//#endregion

		let result = '';
		// For d.ts files we just generate the AST
		if (testCase.endsWith('.d.ts')) {
			result = ttp.generate(ast);
		}
		// For .tsx? files we transpile them and inject the proptypes
		else {
			const transpiled = ttp.ts.transpileModule(fs.readFileSync(testCase, 'utf8'), {
				compilerOptions: {
					target: ttp.ts.ScriptTarget.ESNext,
					jsx: ttp.ts.JsxEmit.Preserve,
				},
			}).outputText;

			const injected = ttp.inject(ast, transpiled);
			if (!injected) {
				throw new Error('Injection failed');
			}

			result = injected;
		}

		//#region Check generated and/or injected proptypes
		const propTypes = prettier.format(result, {
			...prettierConfig,
			filepath: outputPath,
		});

		if (fs.existsSync(outputPath)) {
			expect(propTypes.replace(/\r?\n/, '\n')).toMatch(
				fs.readFileSync(outputPath, 'utf8').replace(/\r?\n/, '\n')
			);
		} else {
			fs.writeFileSync(outputPath, propTypes);
		}
		//#endregion
	});
}
