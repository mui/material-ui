import React from 'react';
import { StylesProvider } from '@material-ui/styles';

export const onInitialClientRender = () => {
  if (process.env.BUILD_STAGE === `develop`) {
    return;
  }

  // Remove the server-side injected CSS.
  const jssStyles = document.querySelector('#jss-server-side');
  if (jssStyles) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
};

export const wrapRootElement = ({ element }, pluginOptions) => {
  if (pluginOptions.stylesProvider) {
    return <StylesProvider {...pluginOptions.stylesProvider}>{element}</StylesProvider>;
  }

  return element;
};
