import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from './withStyles';

// styled-components's API removes the mapping between components and styles.
// Using components as a low-level styling construct can be simpler.
function styled(Component) {
  const componentCreator = (style, options) => {
    function StyledComponent(props) {
      const { classes, className, ...other } = props;

      return <Component className={classNames(classes.root, className)} {...other} />;
    }

    StyledComponent.propTypes = {
      classes: PropTypes.object.isRequired,
      className: PropTypes.string,
      theme: PropTypes.object,
    };

    const styles =
      typeof style === 'function' ? theme => ({ root: style(theme) }) : { root: style };

    return withStyles(styles, options)(StyledComponent);
  };

  return componentCreator;
}

export default styled;
