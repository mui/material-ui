import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { chainPropTypes } from '@material-ui/utils';
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
    function StyledComponent(props) {
      const {
        children,
        classes,
        className: classNameProp,
        clone,
        component: ComponentProp,
        ...other
      } = props;
      const className = classNames(classes.root, classNameProp);

      if (clone) {
        return React.cloneElement(children, {
          className: classNames(children.props.className, className),
        });
      }

      let spread = other;
      if (style.filterProps) {
        const omittedProps = [style.filterProps];
        spread = omit(spread, omittedProps);
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
          throw new Error('You can not use the clone and component properties at the same time.');
        }
      }),
      /**
       * The component used for the root node.
       * Either a string to use a DOM element or a component.
       */
      component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
      theme: PropTypes.object,
      ...(style.propTypes || {}),
    };

    const styles =
      typeof style === 'function'
        ? theme => ({ root: props => style({ theme, ...props }) })
        : { root: style };

    return withStyles(styles, options)(StyledComponent);
  };

  return componentCreator;
}

export default styled;
