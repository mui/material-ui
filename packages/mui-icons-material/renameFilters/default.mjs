import path from 'path';

/*
 * Return path to write file to inside outputDir.
 * @param {object} svgPathObj
 * path objects from path.parse
 * @param {string} innerPath
 * Path (relative to options.svgDir) to svg file
 *   e.g. if svgFile was /home/user/icons/path/to/svg/file.svg
 *   options.svgDir is /home/user/icons/
 *   innerPath is path/to/svg
 * @param {object} options
 * @returns {string} output file dest relative to outputDir
 */
function defaultDestRewriter(svgPathObj, innerPath, options) {
  let fileName = svgPathObj.base;
  if (options.fileSuffix) {
    fileName.replace(options.fileSuffix, '.svg');
  } else {
    fileName = fileName.replace('.svg', '.js');
  }
  fileName = fileName.replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());
  return path.join(innerPath, fileName);
}

export default defaultDestRewriter;
