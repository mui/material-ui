import {createStyleManager} from 'stylishly/lib/styleManager';
import {createPluginRegistry} from 'stylishly/lib/pluginRegistry';
import vendorPrefixer from 'stylishly-vendor-prefixer';
import pseudoClasses from 'stylishly-pseudo-classes';
import descendants from 'stylishly-descendants';
import chained from 'stylishly-chained';
import units from 'stylishly-units';

export default (theme) => {
  return createStyleManager({
    theme: theme,
    pluginRegistry: createPluginRegistry(
      chained(),
      descendants(),
      pseudoClasses(),
      units(),
      vendorPrefixer()
    ),
  });
};
