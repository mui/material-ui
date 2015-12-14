import warning from 'warning';

function deprecatedExport(Component, deprecatedPath, supportedPath) {
  warning(false,
    `Importing ${Component.displayName} from '${deprecatedPath}' has been deprecated, use '${supportedPath}' instead.`);
  return Component;
}

export default deprecatedExport;
