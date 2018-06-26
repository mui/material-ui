import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Fade from '@material-ui/core/Fade';

const SHORT_TRANSITION = 150

export const styles = theme => {
  return {
    root: {
      position: 'relative'
    },
    option: {
      position: 'relative',
      top: 0,
      left: '100%',
      marginLeft: '-100%',
      float: 'left',
    },
    selected: {
    }
  }
};

function FadeSwitch(props) {
  const {
    children,
    classes,
    className: classNameProp,
    selected: selectedProp,
    options,
    ...other
  } = props;

  const selected = `${selectedProp}`

  const className = classNames(
    classes.root,
    classNameProp,
  );

  const fadeProps = isSelected => ({
    className: classNames(classes.option, { [classes.selected]: isSelected }),
    in: isSelected,
    timeout: SHORT_TRANSITION,
    style: {
      transitionDelay: isSelected ? SHORT_TRANSITION : 0
    }
  })

  return (
    <div className={className} {...other}>
      {Object.keys(options).map(key => (
        <Fade key={key} {...fadeProps(key === selected)}>
          {options[key]}
        </Fade>
      ))}
    </div>
  );
}

FadeSwitch.propTypes = {
  /**
   * select the node to be displayed from options
   */
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.symbol,
  ]),
  /**
   * Mapping of selected states to selectable nodes.
   */
  options: PropTypes.object.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiFadeSwitch' })(FadeSwitch);
