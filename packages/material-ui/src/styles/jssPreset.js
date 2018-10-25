import jssGlobal from 'jss-global';
import jssNested from 'jss-nested';
import jssCamelCase from 'jss-camel-case';
import jssDefaultUnit from 'jss-default-unit';
import jssVendorPrefixer from 'jss-vendor-prefixer';
import jssPropsSort from 'jss-props-sort';

// Subset of jss-preset-default with only the plugins the Material-UI components are using.
function jssPreset() {
  return {
    plugins: [
      jssGlobal(),
      jssNested(),
      jssCamelCase(),
      jssDefaultUnit(),
      // Disable the vendor prefixer server-side, it does nothing.
      // This way, we can get a performance boost.
      // In the documentation, we are using `autoprefixer` to solve this problem.
      typeof window === 'undefined' ? null : jssVendorPrefixer(),
      jssPropsSort(),
    ],
  };
}

export default jssPreset;
