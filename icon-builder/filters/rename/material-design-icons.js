function myDestRewriter(pathObj, innerPath, options) {
  var path = require('path');
  var fileName = pathObj.base;

  var rewrittenInnerPath = innerPath.replace('/svg/production', '');

  fileName = fileName.replace('_24px.svg', '.jsx');
  fileName = fileName.slice(3);
  fileName = fileName.replace(/_/g, '-');

  if (fileName.indexOf('3d') === 0) {
    fileName = 'three-d' + fileName.slice(2);
  }

  return path.join(rewrittenInnerPath, fileName);
}

module.exports = myDestRewriter; 
