import * as React from 'react';
import clsx from 'clsx';

function getVariantClasses(componentProps, variants) {
  const { ownerState = {} } = componentProps;
  const variantClasses = variants
    .filter(({ props: variantProps }) =>
      typeof variantProps === 'function'
        ? variantProps({ ...componentProps, ...componentProps.ownerState })
        : Object.entries(variantProps).every(([propKey, propValue]) => {
            return ownerState[propKey] === propValue || componentProps[propKey] === propValue;
          }),
    )
    .map(({ className }) => className);
  return variantClasses;
}

/**
 * @param {string} propKey
 * @returns {boolean}
 */
function defaultShouldForwardProp(propKey) {
  return propKey !== 'sx' && propKey !== 'as' && propKey !== 'ownerState';
}

/**
 * @typedef {typeof defaultShouldForwardProp} ShouldForwardProp
 */

/**
 * This is the runtime `styled` function that finally renders the component
 * after transpilation through linaria. It makes sure to add the base classes,
 * variant classes if they satisfy the prop value and also adds dynamic css
 * variables at runtime, if any.
 * @param {string | Function} tag
 * @param {Object} componentMeta
 * @param {string} componentMeta.name
 * @param {string} componentMeta.slot
 * @param {ShouldForwardProp} componentMeta.shouldForwardProp
 * @param {Object} componentMeta.defaultProps Default props object copied over and inlined from theme object
 */
export default function styled(tag, componentMeta = {}) {
  const { name, slot, shouldForwardProp = defaultShouldForwardProp } = componentMeta;
  /**
   * @TODO - Filter props and only pass necessary props to children
   *
   * This is the runtime `styled` function that finally renders the component
   * after transpilation through linaria. It makes sure to add the base classes,
   * variant classes if they satisfy the prop value and also adds dynamic css
   * variables at runtime, if any.
   * @param {string | Function} tag
   * @param {Object} options
   * @param {string} options.displayName Set by linaria. Mostly is same as the variable name. For this code, ```const Comp = styled(...)(...)```, `displayName` will be `Comp`.
   * @param {string[]} options.classes List of class names that reference the inline css object styles.
   * @param {Object} options.vars Dynamically generated css variables inlined directly on the element for runtime styling.
   * @param {Object[]} options.variants
   * @param {Object} options.variants.props
   * @param {string} options.variants.className Classname generated for this specific variant through styled processor.
   * @param {string} options.name
   * @param {string} options.slot
   * @param {ShouldForwardProp} options.shouldForwardProp
   */
  function scopedStyledWithOptions(options = {}) {
    const { displayName, classes = [], vars: cssVars = {}, variants = [] } = options;
    let componentName = 'Component';

    if (name) {
      if (slot) {
        componentName = `${name}${slot}`;
      } else {
        componentName = name;
      }
    } else if (displayName) {
      componentName = displayName;
    }

    const StyledComponent = React.forwardRef(function StyledComponent(
      // eslint-disable-next-line react/prop-types
      { as, className, sx, style, ...props },
      ref,
    ) {
      // eslint-disable-next-line react/prop-types
      const { ownerState, ...restProps } = props;
      const Component = as ?? tag;
      const varStyles = Object.entries(cssVars).reduce(
        (acc, [cssVariable, [variableFunction, isUnitLess]]) => {
          const value = variableFunction(props);
          if (typeof value === 'undefined') {
            return acc;
          }
          if (typeof value === 'string' || isUnitLess) {
            acc[`--${cssVariable}`] = value;
          } else {
            acc[`--${cssVariable}`] = `${value}px`;
          }
          return acc;
        },
        {},
      );
      // eslint-disable-next-line react/prop-types
      const sxClass = typeof sx === 'string' ? sx : sx?.className;
      // eslint-disable-next-line react/prop-types
      const sxVars = sx && typeof sx !== 'string' ? sx.vars : undefined;

      if (sxVars) {
        Object.entries(sxVars).forEach(([cssVariable, [value, isUnitLess]]) => {
          if (typeof value === 'string' || isUnitLess) {
            varStyles[`--${cssVariable}`] = value;
          } else {
            varStyles[`--${cssVariable}`] = `${value}px`;
          }
        });
      }

      const finalClassName = clsx(classes, sxClass, className, getVariantClasses(props, variants));
      const toPassProps = Object.keys(restProps)
        .filter((item) => {
          const res = shouldForwardProp(item);
          if (res) {
            return defaultShouldForwardProp(item);
          }
          return false;
        })
        .reduce((acc, key) => {
          acc[key] = restProps[key];
          return acc;
        }, {});

      // eslint-disable-next-line no-underscore-dangle
      if (!Component.__isStyled || typeof Component === 'string') {
        return (
          // eslint-disable-next-line react/jsx-filename-extension
          <Component
            {...toPassProps}
            ref={ref}
            className={finalClassName}
            style={{
              ...varStyles,
              ...style,
            }}
          />
        );
      }

      return (
        <Component
          {...toPassProps}
          ownerState={ownerState}
          ref={ref}
          className={finalClassName}
          style={{
            ...varStyles,
            ...style,
          }}
        />
      );
    });

    StyledComponent.displayName = `Styled(${componentName})`;
    // eslint-disable-next-line no-underscore-dangle
    StyledComponent.__isStyled = true;

    return StyledComponent;
  }

  return scopedStyledWithOptions;
}
