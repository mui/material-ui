/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import warning from 'warning';
import { getDynamicStyles } from 'jss';
import mergeClasses from './mergeClasses';
import multiKeyStore from './multiKeyStore';
import ThemeContext from './ThemeContext';
import { StylesContext } from './StylesProvider';
import { increment } from './indexCounter';
import getStylesCreator from './getStylesCreator';
import noopTheme from './noopTheme';

// Helper to debug
// let id = 0;

function getClasses({ classes, Component, state, stylesOptions }) {
  if (stylesOptions.disableGeneration) {
    return classes || {};
  }

  if (!state.cacheClasses) {
    state.cacheClasses = {
      // Cache for the finalized classes value.
      value: null,
      // Cache for the last used classes prop pointer.
      lastProp: null,
      // Cache for the last used rendered classes pointer.
      lastJSS: {},
    };
  }

  // Tracks if either the rendered classes or classes prop has changed,
  // requiring the generation of a new finalized classes object.
  let generate = false;

  if (state.classes !== state.cacheClasses.lastJSS) {
    state.cacheClasses.lastJSS = state.classes;
    generate = true;
  }
  if (classes !== state.cacheClasses.lastProp) {
    state.cacheClasses.lastProp = classes;
    generate = true;
  }

  if (generate) {
    state.cacheClasses.value = mergeClasses({
      baseClasses: state.cacheClasses.lastJSS,
      newClasses: classes,
      Component,
    });
  }

  return state.cacheClasses.value;
}

function attach({ state, props, theme, stylesOptions, stylesCreator, name }) {
  if (stylesOptions.disableGeneration) {
    return;
  }

  let sheetManager = multiKeyStore.get(stylesOptions.sheetsManager, stylesCreator, theme);

  if (!sheetManager) {
    sheetManager = {
      refs: 0,
      staticSheet: null,
      dynamicStyles: null,
    };
    multiKeyStore.set(stylesOptions.sheetsManager, stylesCreator, theme, sheetManager);
  }

  const options = {
    ...stylesCreator.options,
    ...stylesOptions,
    theme,
    flip: typeof stylesOptions.flip === 'boolean' ? stylesOptions.flip : theme.direction === 'rtl',
  };
  options.generateId = options.generateClassName;

  const sheetsRegistry = stylesOptions.sheetsRegistry;

  if (sheetManager.refs === 0) {
    let staticSheet;

    if (stylesOptions.sheetsCache) {
      staticSheet = multiKeyStore.get(stylesOptions.sheetsCache, stylesCreator, theme);
    }

    const styles = stylesCreator.create(theme, name);

    if (!staticSheet) {
      staticSheet = stylesOptions.jss.createStyleSheet(styles, {
        link: false,
        ...options,
      });

      staticSheet.attach();

      if (stylesOptions.sheetsCache) {
        multiKeyStore.set(stylesOptions.sheetsCache, stylesCreator, theme, staticSheet);
      }
    }

    if (sheetsRegistry) {
      sheetsRegistry.add(staticSheet);
    }

    sheetManager.dynamicStyles = getDynamicStyles(styles);
    sheetManager.staticSheet = staticSheet;
  }

  if (sheetManager.dynamicStyles) {
    const dynamicSheet = stylesOptions.jss.createStyleSheet(sheetManager.dynamicStyles, {
      link: true,
      ...options,
    });

    warning(props, 'Material-UI: properties missing.');

    dynamicSheet.update(props).attach();

    state.dynamicSheet = dynamicSheet;

    if (sheetsRegistry) {
      sheetsRegistry.add(dynamicSheet);
    }

    state.classes = mergeClasses({
      baseClasses: sheetManager.staticSheet.classes,
      newClasses: dynamicSheet.classes,
    });
  } else {
    state.classes = sheetManager.staticSheet.classes;
  }

  sheetManager.refs += 1;
}

function update({ state, props }) {
  if (state.dynamicSheet) {
    state.dynamicSheet.update(props);
  }
}

function detach({ state, theme, stylesOptions, stylesCreator }) {
  if (stylesOptions.disableGeneration) {
    return;
  }

  const sheetManager = multiKeyStore.get(stylesOptions.sheetsManager, stylesCreator, theme);
  sheetManager.refs -= 1;
  const sheetsRegistry = stylesOptions.sheetsRegistry;

  if (sheetManager.refs === 0) {
    multiKeyStore.delete(stylesOptions.sheetsManager, stylesCreator, theme);
    stylesOptions.jss.removeStyleSheet(sheetManager.staticSheet);

    if (sheetsRegistry) {
      sheetsRegistry.remove(sheetManager.staticSheet);
    }
  }

  if (state.dynamicSheet) {
    stylesOptions.jss.removeStyleSheet(state.dynamicSheet);

    if (sheetsRegistry) {
      sheetsRegistry.remove(state.dynamicSheet);
    }
  }
}

function makeStyles(stylesOrCreator, options = {}) {
  const {
    // An explicit value provided by the developers.
    name,
    // Help with debuggability.
    classNamePrefix: classNamePrefixOption,
    defaultTheme: defaultThemeOption,
    Component,
    ...stylesOptions2
  } = options;
  const stylesCreator = getStylesCreator(stylesOrCreator);
  const listenToTheme = stylesCreator.themingEnabled || typeof name === 'string';
  const defaultTheme = defaultThemeOption || noopTheme;

  const classNamePrefix = name || classNamePrefixOption || 'Hook';

  stylesCreator.options = {
    index: increment(),
    name,
    meta: classNamePrefix,
    classNamePrefix,
  };

  return (props = {}) => {
    const theme = listenToTheme ? React.useContext(ThemeContext) || defaultTheme : defaultTheme;
    const stylesOptions = {
      ...React.useContext(StylesContext),
      ...stylesOptions2,
    };

    const { current: state } = React.useRef({});

    // Execute synchronously every time the theme changes.
    React.useMemo(() => {
      attach({
        name,
        props,
        state,
        stylesCreator,
        stylesOptions,
        theme,
      });
    }, [theme, stylesCreator]);

    const firstRender = React.useRef(true);
    React.useEffect(() => {
      if (!firstRender.current) {
        update({
          props,
          state,
          stylesCreator,
          stylesOptions,
          theme,
        });
      }
    });
    React.useEffect(() => {
      firstRender.current = false;
    }, []);

    // Execute asynchronously every time the theme changes.
    React.useEffect(
      () => () => {
        detach({
          state,
          stylesCreator,
          stylesOptions,
          theme,
        });
      },
      [theme, stylesCreator],
    );

    return getClasses({
      classes: props.classes,
      Component,
      state,
      stylesOptions,
    });
  };
}

export default makeStyles;
