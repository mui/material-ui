'use strict';

const path = require('path');

function myDestRewriter(pathObj, innerPath) {
  let fileName = pathObj.base;

  const rewrittenInnerPath = innerPath.replace('/svg/production', '');

  fileName = fileName.replace('_24px.svg', '.js');
  fileName = fileName.slice(3);
  fileName = fileName.replace(/_/g, '-');

  if (fileName.indexOf('3d') === 0) {
    fileName = 'three-d' + fileName.slice(2);
  }

  return path.join(rewrittenInnerPath, fileName);
}

module.exports = myDestRewriter;
