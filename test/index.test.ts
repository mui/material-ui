import * as ttp from '../src';
import path from 'path';

it('runs', () => {
  const tsconfig = ttp.loadConfig(path.resolve(__dirname, '../tsconfig.json'));

  const parsed = ttp.parseFile(path.resolve(__dirname, 'testFile.d.ts'), tsconfig);

  expect(parsed).toMatchSnapshot();
});
