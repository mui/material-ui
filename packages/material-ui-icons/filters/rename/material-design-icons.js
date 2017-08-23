// @flow

function myDestRewriter(pathObj: Object) {
  let fileName = pathObj.base;

  fileName = fileName
    .replace('_24px.svg', '.js')
    .slice(3)
    .replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) => (p1 || p3).toUpperCase());

  if (fileName.indexOf('3d') === 0) {
    fileName = `ThreeD${fileName.slice(2)}`;
  }

  return fileName;
}

module.exports = myDestRewriter;
