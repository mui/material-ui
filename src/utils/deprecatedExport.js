import warning from 'warning';

const getName = (object) => object.displayName ? `${object.displayName} ` : '';

function deprecatedExport(object, deprecatedPath, supportedPath) {
  warning(false,
    `Importing ${getName(object)}from '${deprecatedPath}' has been deprecated, use '${supportedPath}' instead.`);
  return object;
}

export default deprecatedExport;
