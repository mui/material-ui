import * as path from 'node:path';

export type AsyncResolver = (what: string, importer: string, stack: string[]) => Promise<string>;

/**
 * There might be a better way to do this in future, but due to the async
 * nature of the resolver, this is the best way currently to replace url()
 * content references with the absolute path of the referenced file.
 * This is because WyW-in-JS's preprocessor is a sync call. So we can't resolve
 * paths in this call asyncronously.
 * The upside is that we can use aliases in the url() references as well
 * alongside relative paths.
 */
export const handleUrlReplacement = async (
  cssText: string,
  filename: string,
  asyncResolver: AsyncResolver,
  projectPath: string,
) => {
  //                  [0]  [1][2]    [3]       [4]
  const urlRegex = /\b(url\((["']?))(\.?[^)]+?)(\2\))/g;
  let newCss = '';
  let match = urlRegex.exec(cssText);
  let lastIndex = 0;
  while (match) {
    newCss += cssText.substring(lastIndex, match.index);
    const mainItem = match[3];
    // no need to handle data uris or absolute paths
    if (
      mainItem.startsWith('data:') ||
      mainItem.startsWith('http:') ||
      mainItem.startsWith('https:')
    ) {
      newCss += `url(${mainItem})`;
    } else if (mainItem[0] === '/') {
      const newPath = mainItem.replace(projectPath, '').split(path.sep).join('/');
      if (newPath === mainItem) {
        // absolute path unrelated to files in the project or in public directory
        newCss += `url(${mainItem})`;
      } else {
        // absolute path to files in the project
        newCss += `url(~${mainItem.replace(projectPath, '').split(path.sep).join('/')})`;
      }
    } else {
      // eslint-disable-next-line no-await-in-loop
      const resolvedAbsolutePath = await asyncResolver(mainItem, filename, []);
      if (!resolvedAbsolutePath) {
        newCss += `url(${mainItem})`;
      } else {
        let pathFromRoot = resolvedAbsolutePath.replace(projectPath, '');
        // Need to do this for Windows paths
        pathFromRoot = pathFromRoot.split(path.sep).join('/');
        // const relativePathToProjectRoot = path.relative()
        // Next.js expects the path to be relative to the project root and starting with ~
        newCss += `url(~${pathFromRoot})`;
      }
    }
    lastIndex = match.index + match[0].length;
    match = urlRegex.exec(cssText);
  }
  newCss += cssText.substring(lastIndex);
  if (!newCss) {
    return cssText;
  }
  return newCss;
};
