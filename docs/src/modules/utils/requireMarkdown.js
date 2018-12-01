/**
 * requires the given path with a MissingTranslation fallback
 *
 * @param {Require.Context} req webpack require.context
 * @param {string} path
 */
export default function requireMarkdown(req, path) {
  try {
    return req(path);
  } catch (error) {
    /* eslint-disable-next-line global-require */
    return require('./MissingTranslation.md');
  }
}
