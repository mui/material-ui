// eslint-disable-next-line import/prefer-default-export
export const refactorMarkdownContent = (content: string, pathnames: string[] = []) => {
  let result = content.replace(/"pages\/components\/[/\-a-zA-Z]*\/([a-zA-Z]*\.js)"/gm, `"$1"`);
  pathnames.forEach((path) => {
    result = result.replace(new RegExp(`\\(${path}`, 'g'), `(/material${path}`);
  });
  return result;
};
