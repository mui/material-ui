import { EOL } from 'os';

export * from './createTypeScriptProject';
export { type ComponentClassDefinition } from './ComponentClassDefinition';
export * from './getPropsFromComponentNode';

export function getLineFeed(source: string): string {
  const match = source.match(/\r?\n/);
  return match === null ? EOL : match[0];
}

const fixBabelIssuesRegExp = /(?<=(\/>)|,)(\r?\n){2}/g;

export function fixBabelGeneratorIssues(source: string): string {
  return source.replace(fixBabelIssuesRegExp, '\n');
}

export function fixLineEndings(source: string, target: string): string {
  return target.replace(/\r?\n/g, getLineFeed(source));
}

/**
 * Converts styled or regular component d.ts file to unstyled d.ts
 * @param filename - the file of the styled or regular mui component
 */
export function getUnstyledFilename(filename: string, definitionFile: boolean = false): string {
  if (filename.indexOf('mui-base') > -1) {
    return filename;
  }
  let unstyledFile = '';

  const separator = filename.indexOf('/') > -1 ? '/' : '\\';

  if (filename.indexOf('mui-base') === -1) {
    unstyledFile = filename
      .replace(/.d.ts$/, '')
      .replace(/.tsx?$/, '')
      .replace(/.js$/, '');
    unstyledFile = unstyledFile.replace(/Styled/g, '');

    if (separator === '/') {
      unstyledFile = unstyledFile.replace(
        /packages\/mui-lab|packages\/mui-material/g,
        'packages/mui-base',
      );
    } else {
      unstyledFile = unstyledFile.replace(
        /packages\\mui-lab|packages\\mui-material/g,
        'packages\\mui-base',
      );
    }
  }

  return definitionFile ? `${unstyledFile}.d.ts` : `${unstyledFile}.js`;
}
