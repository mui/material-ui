/**
 * Created by zabieru on 6/6/2017.
 */
import React, {Component, Children, cloneElement, isValidElement} from 'react';
import warning from 'warning';
import PropTypes from 'prop-types';
import transitions from '../styles/transitions';
import withStyles from '../styles/withStyles';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import { fade } from '../styles/colorManipulator';
import { black } from '../styles/colors';

/**
 * Specification according to material.io
 * - Have at least three toggle buttons in a group
 * - Label buttons with text, an icon, or both
 */

export const styleSheet = createStyleSheet('MuiToggleButton', theme => ({
  root : {
    display: 'inline-block',
    borderRadius: 2,
    boxShadow: 'none',
    overflow: 'hidden',
    // transition: transitions.easeOut(),
    transition: theme.transitions.create(['background-color', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
  },
  active: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 3px 6px ${fade(black, 0.12)},
        0 3px 6px ${fade(black, 0.12)}`,
  },
  toggleIcon: {
    overflow: 'visible',
  },
}));


class ToggleButton extends Component{

  static defaultProps = {
    active: false,
    values: [],
    selectedOptions: [],
    exclusive: false,
    toggleIcons: false,
  };

  componentWillMount() {
    this.setState({
      active: this.props.active,
      values: this.props.values,
      selectedOptions: this.props.selectedOptions
    });
  }

  getOptions(props = this.props) {
    const options = [];

    Children.forEach(props.children, (option) => {
      if (isValidElement(option)) {
        options.push(option);
      }
    });

    return options;
  };

  getSelected(index) {
    let selected = this.state.selectedOptions.indexOf(index) > -1;
    return selected;
  };

  handleOptionClick = (option) => {
    let values = this.state.values;
    let indexes = this.state.selectedOptions;
    let ind = indexes.indexOf(option.index);
    let active = false;

    if(ind > -1){
      if(option.children){
        if(option.value === values[ind]){
          values.splice(ind, 1);
          indexes.splice(ind, 1);
        }else{
          values[ind] = option.value;
        }
      }else {
        values.splice(ind, 1);
        indexes.splice(ind, 1);
      }
    }else{
      if (this.props.exclusive) {
        values = [];
        indexes = [];
      }
      values.push(option.value);
      indexes.push(option.index);
    }

    if(indexes.length > 0){
      active = true;
    }

    this.setState({
      values: values,
      active: active,
      selectedOptions: indexes,
    });

    if (indexes.indexOf(option.index) > -1){
      if(option.onSelect){
        option.onSelect(option.value);
      }
    }else {
      if(option.onDeselect){
        option.onDeselect(option.value);
      }
    }
  };

  render(){
    const {
      children,
      active,
      selectedOptions,
      values,
      exclusive,
      classes,
      className: classNameProp,
      toggleIcons,
      ...other
    } = this.props;

    const className = classNames(classes.root,
      {
        [classes.active] : active && !toggleIcons,
        [classes.toggleIcon]: toggleIcons,
      }
      ,classNameProp);

    //const borderColor = this.context.muiTheme.toggleButton.borderColor;

    const options = this.getOptions().map((option, index) => {
      // warning(option.type && option.type.muiName === 'Option',
      //   `Material-UI: ToggleButton only accepts Option Components as children.
      //   Found ${option.type.muiName || option.type} as child number ${index + 1} of ToggleButton`);
      //
      // if(!option.props.children){
      //   warning(option.props.value !== undefined,
      //     `Material-UI: ToggleButton value prop has been passed, but Option ${index}
      //   does not have a value prop. Needs value if ToggleButton is going
      //   to be a controlled component.`);
      // }


      let selected = this.getSelected(index);
      let optionStyle = {
        borderRight: 'none',
        borderLeft: 'none'
      };

      //let borderStyle = '0.25px solid ' + borderColor;

      // if(selected && !toggleIcons){
      //   if(index === 0){
      //     if (this.getSelected(index + 1)){
      //       optionStyle.borderRight = borderStyle;
      //     }
      //   }else if(index + 1 === this.getOptions().length){
      //     if (this.getSelected(index - 1)){
      //       optionStyle.borderLeft = borderStyle;
      //     }
      //   }else{
      //     if (this.getSelected(index + 1)){
      //       optionStyle.borderRight = borderStyle;
      //     }
      //     if (this.getSelected(index - 1)){
      //       optionStyle.borderLeft = borderStyle;
      //     }
      //   }
      // }

      return cloneElement(option, {
        key: index,
        index: index,
        optionStyle: optionStyle,
        selected: selected,
        noBackground: toggleIcons,
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
   * Determines whether or not the 'ToggleButton' component is selected.
   */
  active: PropTypes.bool,
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
  /**
   * Values of the currently selected options on the 'ToggleButton'.
   */
  values: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])),
};

export default withStyles(styleSheet) (ToggleButton);
