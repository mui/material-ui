import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { chainPropTypes, getDisplayName } from '@material-ui/utils';
import hoistNonReactStatics from 'hoist-non-react-statics';
import withStyles from './withStyles';

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
  const componentCreator = (style, options) => {
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

    function StyledComponent(props) {
      const {
        children,
        classes,
        className: classNameProp,
        clone,
        component: ComponentProp,
        ...other
      } = props;
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
        <FinalComponent className={className} {...spread}>
          {children}
        </FinalComponent>
      );
    }

    StyledComponent.propTypes = {
      /**
       * A render function or node.
       */
      children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      classes: PropTypes.object.isRequired,
      className: PropTypes.string,
      /**
       * If `true`, the component will recycle it's children DOM element.
       * It's using `React.cloneElement` internally.
       */
      clone: chainPropTypes(PropTypes.bool, props => {
        if (props.clone && props.component) {
          return new Error(
            `You can not use the clone and component properties at the same time.${
              process.env.NODE_ENV === 'test' ? Date.now() : ''
            }`,
          );
        }
        return null;
      }),
      /**
       * The component used for the root node.
       * Either a string to use a DOM element or a component.
       */
      component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
      theme: PropTypes.object,
      ...propTypes,
    };

    if (process.env.NODE_ENV !== 'production') {
      StyledComponent.displayName = `Styled(${getDisplayName(Component)})`;
    }

    const styles =
      typeof style === 'function'
        ? theme => ({ root: props => style({ theme, ...props }) })
        : { root: style };

    hoistNonReactStatics(StyledComponent, Component);

    return withStyles(styles, options)(StyledComponent);
  };

  return componentCreator;
}

export default styled;
