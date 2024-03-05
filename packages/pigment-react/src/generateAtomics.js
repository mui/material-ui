import cx from 'clsx';

export function generateAtomics() {
  throw new Error(
    `${process.env.PACKAGE_NAME}: You were trying to call "generateAtomics" function without configuring your bundler. Make sure to install the bundler specific plugin and use it. @pigment-css/vite-plugin for Vite integration or @pigment-css/nextjs-plugin for Next.js integration.`,
  );
}

/**
 * @typedef {Object} RuntimeConfig
 * @property {Object.<string, Object.<string, Object.<string, string>>>} styles
 * @property {Object.<string, string[]>} shorthands
 * @property {string[]} conditions
 */

/**
 * @param {RuntimeConfig} runtimeConfig
 */
export function atomics({ styles, shorthands, conditions }) {
  function addStyles(cssProperty, values, classes) {
    const styleClasses = styles[cssProperty];
    if (!styleClasses) {
      return;
    }
    if (typeof values === 'string') {
      classes.push(styleClasses[values].$$default);
    } else if (Array.isArray(values)) {
      values.forEach((value, index) => {
        classes.push(styleClasses[value][conditions[index]]);
      });
    } else {
      Object.keys(values).forEach((condition) => {
        const propertyClasses = styleClasses[values[condition]];
        if (!propertyClasses) {
          return;
        }
        classes.push(propertyClasses[condition]);
      });
    }
  }

  function generateClass(props) {
    const classes = [];
    const runtimeStyles = { ...props };
    Object.keys(runtimeStyles).forEach((cssProperty) => {
      const values = runtimeStyles[cssProperty];
      if (cssProperty in shorthands) {
        const configShorthands = shorthands[cssProperty];
        if (!configShorthands) {
          return;
        }
        configShorthands.forEach((shorthand) => {
          addStyles(shorthand, values, classes);
        });
      } else {
        addStyles(cssProperty, values, classes);
      }
    });
    return {
      className: cx(Array.from(new Set(classes))),
    };
  }
  return generateClass;
}
