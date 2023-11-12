import removeTrailingSlash from './removeTrailingSlash';

const validationRegExp = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

export default function validateAppName(input: string): string | void {
  const sanitizedInput = removeTrailingSlash(input);
  const paths = sanitizedInput.split('/');

  const indexOfDelimiter = paths.findIndex((p) => p.startsWith('@'));

  let appName = paths[paths.length - 1];
  if (paths.findIndex((p) => p.startsWith('@')) !== -1) {
    appName = paths.slice(indexOfDelimiter).join('/');
  }

  if (input === '.' || validationRegExp.test(appName ?? '')) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return "App name must consist of only lowercase alphanumeric characters, '-', and '_'";
}
