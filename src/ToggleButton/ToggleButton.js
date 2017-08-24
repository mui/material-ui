// @flow

import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import createStyleSheet from '../styles/createStyleSheet';

/**
 * Specification according to material.io
 * - Have at least three toggle buttons in a group
 * - Label buttons with text, an icon, or both
 */

export const styleSheet = createStyleSheet('MuiToggleButton', theme => ({
  root: {
    display: 'inline-flex',
    borderRadius: 2,
    boxShadow: 'none',
    overflow: 'hidden',
    transition: theme.transitions.create(['background-color', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
  },
  active: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  },
  toggleIcon: {
    overflow: 'visible',
  },
}));

class ToggleButton extends Component {
  static defaultProps = {
    exclusive: false,
    toggleIcons: false,
  };

  state = {
    active: false,
    values: [],
    selectedOptions: [],
  };

  getOptions(props = this.props) {
    const options = [];

    Children.forEach(props.children, option => {
      if (isValidElement(option)) {
        options.push(option);
      }
    });

    return options;
  }

  getSelected(index) {
    return this.state.selectedOptions.indexOf(index) > -1;
  }

  handleOptionClick = option => {
    let values = this.state.values;
    let indexes = this.state.selectedOptions;
    const ind = indexes.indexOf(option.index);
    let active = false;

    if (ind > -1) {
      if (option.children) {
        if (option.value === values[ind]) {
          values.splice(ind, 1);
          indexes.splice(ind, 1);
        } else {
          values[ind] = option.value;
        }
      } else {
        values.splice(ind, 1);
        indexes.splice(ind, 1);
      }
    } else {
      if (this.props.exclusive) {
        values = [];
        indexes = [];
      }
      values.push(option.value);
      indexes.push(option.index);
    }

    if (indexes.length > 0) {
      active = true;
    }

    this.setState({
      values,
      active,
      selectedOptions: indexes,
    });

    if (option.onChange) {
      option.onChange(option.value, indexes.indexOf(option.index) > -1);
    }
  };

  render() {
    const {
      children,
      selectedOptions,
      exclusive,
      classes,
      className: classNameProp,
      toggleIcons,
      ...other
    } = this.props;

    const active = this.state.active;

    const className = classNames(
      classes.root,
      {
        [classes.active]: active && !toggleIcons,
        [classes.toggleIcon]: toggleIcons,
      },
      classNameProp,
    );

    const options = this.getOptions().map((option, index) => {
      const selected = this.getSelected(index);
      let divider = false;

      if (selected && !toggleIcons && index > 0) {
        if (this.getSelected(index - 1)) {
          divider = true;
        }
      }

      return cloneElement(option, {
        index,
        divider,
        selected,
        toggle: toggleIcons,
        onClick: this.handleOptionClick,
      });
    });

    return (
      <div className={className} {...other}>
        {options}
      </div>
    );
  }
}

ToggleButton.propTypes = {
  /**
   * Should be used to pass `Option` components.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Determines whether or not the ToggleButton is multivalued.
   */
  exclusive: PropTypes.bool,
  /**
   * Indexes of the currently selected options on the 'ToggleButton'.
   */
  selectedOptions: PropTypes.arrayOf(PropTypes.number),
  /**
   * Determines if the ToggleButtons are buttons or icons(ToggleIcons).
   */
  toggleIcons: PropTypes.bool,
};

export default withStyles(styleSheet)(ToggleButton);
