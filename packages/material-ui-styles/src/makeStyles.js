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

function getClasses({ state, stylesOptions }, classes, Component) {
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

function attach({ state, theme, stylesOptions, stylesCreator, name }, props) {
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

    sheetManager.staticSheet = staticSheet;
    sheetManager.dynamicStyles = getDynamicStyles(styles);
  }

  if (sheetManager.dynamicStyles) {
    const dynamicSheet = stylesOptions.jss.createStyleSheet(sheetManager.dynamicStyles, {
      link: true,
      ...options,
    });

    warning(props, 'Material-UI: properties missing.');
    dynamicSheet.update(props).attach();

    state.dynamicSheet = dynamicSheet;
    state.classes = mergeClasses({
      baseClasses: sheetManager.staticSheet.classes,
      newClasses: dynamicSheet.classes,
    });

    if (sheetsRegistry) {
      sheetsRegistry.add(dynamicSheet);
    }
  } else {
    state.classes = sheetManager.staticSheet.classes;
  }

  sheetManager.refs += 1;
}

function update({ state }, props) {
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

    const { current: instance } = React.useRef({
      // previous: null,
      // current: null,
    });
    const firstRender = React.useRef();

    // ⚠️ You may rely on React.useMemo as a performance optimization, not as a semantic guarantee.
    // https://reactjs.org/docs/hooks-reference.html#usememo
    //
    // Execute synchronously every time the theme changes.
    React.useMemo(() => {
      instance.current = {
        name,
        state: {},
        stylesCreator,
        stylesOptions,
        theme,
      };
      attach(instance.current, props);
      firstRender.current = true;

      if (instance.previous) {
        const previous = instance.previous;
        setTimeout(() => {
          detach(previous);
        });
      }

      instance.previous = instance.current;
    }, [theme, stylesCreator]);

    React.useEffect(() => {
      if (!firstRender.current) {
        update(instance.current, props);
      }
      firstRender.current = false;
    });

    React.useEffect(
      () => () => {
        detach(instance.current);
      },
      [],
    );

    return getClasses(instance.current, props.classes, Component);
  };
}

export default makeStyles;
