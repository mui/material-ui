function defaultFilter(fileName, fileSuffix) {
  if (fileSuffix) {
    fileName.replace(fileSuffix, ".svg");
  } else {
    fileName = fileName.replace('.svg', '.jsx');
  }
  fileName = fileName.replace(/_/g, '-');
  return fileName;
}


module.exports = defaultFilter; 
