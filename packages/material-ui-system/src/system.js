import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { chainPropTypes, getDisplayName } from '@material-ui/utils';
import hoistNonReactStatics from 'hoist-non-react-statics';
import withStyles from '@material-styles';


function styled(Component) {
  const componentCreator = (interpolationOrSystemProps, options) => {
    let propTypes = {};

    let styles = [];

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

      let propsToPass = {};
      const propKeys = Object.keys(other);
      for (let i = 0, length = propKeys.length;i<length;i++) {
        const key = propKeys[i]
        if (!styles[key]) {
          propsToPass[key] = other[key]
        }
      }

      if (typeof children === 'function') {
        return children({ className, ...propsToPass });
      }

      const FinalComponent = ComponentProp || Component;

      return (
        <FinalComponent className={className} {...propsToPass}>
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
          return new Error('You can not use the clone and component properties at the same time.');
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

    const styles = theme => {
      const styleFunction = props => {
        let systemProps = props;
        let style = {};
        if (typeof interpolationOrSystemProps === 'function') {
          systemProps = {
            ...interpolationOrSystemProps({ theme, ...props }),
            ...props,
          };
        }
        
        const propKeys = Object.keys(systemProps);
        for (let i = 0, length = propKeys.length; i < length; i++) {
          const key = propKeys[i];
          const systemStyle = systemStyles[key];
          if (systemStyle) {
            style = {
              ...style,
              ...systemStyle(systemProps[key], theme)
            };
          }
        }
        return style;
      };

      return { root: styleFunction }
    }

    hoistNonReactStatics(StyledComponent, Component);

    return withStyles(styles, options)(StyledComponent);
  };

  return componentCreator;
}

export default styled;
