export const refactorMarkdownContent = (content: string, pathnames: string[] = []) => {
  // i. update demo to use relative path
  let result = content.replace(/"pages\/components\/[/\-a-zA-Z]*\/([a-zA-Z]*\.js)"/gm, `"$1"`);

  // ii. update links to have prefix
  pathnames.forEach((path) => {
    result = result.replace(new RegExp(`\\(${path}`, 'g'), `(/material${path}`);
  });
  return result;
};

export const getNewDataLocation = (
  filePath: string,
): { directory: string; path: string } | null => {
  const match = filePath.match(/^(.*)\/[^/]+\.(ts|js|tsx|md|json)$/);
  if (!match) {
    return null;
  }
  return {
    directory: match[1].replace('src/pages', 'products/material'),
    path: filePath.replace('src/pages', 'products/material'),
  };
};

export const getNewPageLocation = (
  filePath: string,
): { directory: string; path: string } | null => {
  const match = filePath.match(/^(.*)\/[^/]+\.(ts|js|tsx|md|json)$/);
  if (!match) {
    return null;
  }
  return {
    directory: match[1].replace('docs/pages', 'docs/pages/material'),
    path: filePath.replace('docs/pages', 'docs/pages/material'),
  };
};
