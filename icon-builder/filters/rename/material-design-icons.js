function myFilter(fileName, fileSuffix) {
  if (fileSuffix && fileName.indexOf(fileSuffix, fileName.length - fileSuffix.length) !== -1) {
    fileName = fileName.replace(fileSuffix, '.jsx');
    fileName = fileName.slice(3);
    fileName = fileName.replace(/_/g, '-');

    if (fileName.indexOf('3d') === 0) {
      fileName = 'three-d' + fileName.slice(2);
    }
    return fileName;
  }
}

module.exports = myFilter; 
