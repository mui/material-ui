/**
 * @param {import('jscodeshift').FileInfo} file
 */
export default function transformer(file) {
  return file.source.replace(
    /(theme\.typography|typography)\.round\((.*)\)/gm,
    'Math.round($2 * 1e5) / 1e5',
  );
}
