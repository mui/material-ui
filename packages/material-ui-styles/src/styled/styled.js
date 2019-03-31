import React from 'react';
import clsx from 'clsx';
import warning from 'warning';
import PropTypes from 'prop-types';
import { chainPropTypes, getDisplayName } from '@material-ui/utils';
import hoistNonReactStatics from 'hoist-non-react-statics';
import makeStyles from '../makeStyles';

function omit(input, fields) {
  const output = {};

  Object.keys(input).forEach(prop => {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });

  return output;
}

// styled-components's API removes the mapping between components and styles.
// Using components as a low-level styling construct can be simpler.
function styled(Component) {
  const componentCreator = (style, options = {}) => {
    const { name, ...stylesOptions } = options;

    if (process.env.NODE_ENV !== 'production' && Component === undefined) {
      throw new Error(
        [
          'You are calling styled(Component)(style) with an undefined component.',
          'You may have forgotten to import it.',
        ].join('\n'),
      );
    }

    let classNamePrefix = name;

    if (process.env.NODE_ENV !== 'production' && !name) {
      // Provide a better DX outside production.
      classNamePrefix = getDisplayName(Component);
      warning(
        typeof classNamePrefix === 'string',
        [
          'Material-UI: the component displayName is invalid. It needs to be a string.',
          `Please fix the following component: ${Component}.`,
        ].join('\n'),
      );
    }

    const stylesOrCreator =
      typeof style === 'function'
        ? theme => ({ root: props => style({ theme, ...props }) })
        : { root: style };

    const useStyles = makeStyles(stylesOrCreator, {
      Component,
      name: name || Component.displayName,
      classNamePrefix,
      ...stylesOptions,
    });

    let filterProps;
    let propTypes = {};

    if (style.filterProps) {
      filterProps = style.filterProps;
      delete style.filterProps;
    }

    /* eslint-disable react/forbid-foreign-prop-types */
    if (style.propTypes) {
      propTypes = style.propTypes;
      delete style.propTypes;
    }
    /* eslint-enable react/forbid-foreign-prop-types */

    const StyledComponent = React.forwardRef(function StyledComponent(props, ref) {
      const {
        children,
        className: classNameProp,
        clone,
        component: ComponentProp,
        ...other
      } = props;
      const classes = useStyles(props);
      const className = clsx(classes.root, classNameProp);

      if (clone) {
        return React.cloneElement(children, {
          className: clsx(children.props.className, className),
        });
      }

      let spread = other;
      if (filterProps) {
        spread = omit(spread, filterProps);
      }

      if (typeof children === 'function') {
        return children({ className, ...spread });
      }

      const FinalComponent = ComponentProp || Component;

      return (
        <FinalComponent ref={ref} className={className} {...spread}>
          {children}
        </FinalComponent>
      );
    });

    StyledComponent.propTypes = {
      /**
       * A render function or node.
       */
      children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      /**
       * @ignore
       */
      className: PropTypes.string,
      /**
       * If `true`, the component will recycle it's children DOM element.
       * It's using `React.cloneElement` internally.
       */
      clone: chainPropTypes(PropTypes.bool, props => {
        if (props.clone && props.component) {
          return new Error('You can not use the clone and component properties at the same time.');
        }
        return null;
      }),
      /**
       * The component used for the root node.
       * Either a string to use a DOM element or a component.
       */
      component: PropTypes.elementType,
      ...propTypes,
    };

    if (process.env.NODE_ENV !== 'production') {
      StyledComponent.displayName = `Styled(${classNamePrefix})`;
    }

    hoistNonReactStatics(StyledComponent, Component);

    return StyledComponent;
  };

  return componentCreator;
}

export default styled;
