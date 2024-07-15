/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function v6All(file) {
  // Currently empty, when adding the first codemod:
  //   - Read mui-codemod/CONTRIBUTING.md
  //   - Follow mui-codemod/src/deprecations/all/deprecations-all.js as a guide
  //   - Remove this comment
  return file.source;
}
