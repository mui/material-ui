// @flow weak

import React, { Component, PropTypes, Children, cloneElement } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import EventListener from 'react-event-listener';
import { throttle } from '../utils/helpers';
import TabIndicator from './TabIndicator';

export const styleSheet = createStyleSheet('Tabs', () => {
  return {
    root: {
      position: 'relative', // For the TabIndicator.
      display: 'flex',
      justifyContent: 'flex-start',
    },
    centered: {
      justifyContent: 'center',
    },
  };
});

export default class Tabs extends Component {
  static propTypes = {
    /**
     * If `true`, the tabs will be centered.
     * This property is intended for large views.
     */
    centered: PropTypes.bool,
    /**
     * The content of the `Tabs`.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If `true`, the tabs will grow to use all the available space.
     * This property is intended for small views.
     */
    fullWidth: PropTypes.bool,
    /**
     * The index of the currently selected `BottomNavigation`.
     */
    index: PropTypes.number,
    /**
     * The CSS class name of the indicator element.
     */
    indicatorClassName: PropTypes.string,
    /**
     * Determines the color of the indicator.
     */
    indicatorColor: PropTypes.oneOfType([
      PropTypes.oneOf([
        'accent',
      ]),
      PropTypes.string,
    ]),
    /**
     * Function called when the index change.
     */
    onChange: PropTypes.func,
    /**
     * Determines the color of the `Tab`.
     */
    textColor: PropTypes.oneOfType([
      PropTypes.oneOf([
        'accent',
        'inherit',
      ]),
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    centered: false,
    fullWidth: false,
    indicatorColor: 'accent',
    textColor: 'inherit',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    indicatorStyle: {},
  };

  componentDidMount() {
    this.updateIndicator(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateIndicator(nextProps);
  }

  tabs = undefined;

  handleResize = throttle(() => {
    this.updateIndicator(this.props);
  }, 100);

  updateIndicator(props) {
    const tabsBox = this.tabs.getBoundingClientRect();
    const tabBox = this.tabs.children[props.index].getBoundingClientRect();

    this.setState({
      indicatorStyle: {
        left: tabBox.left - tabsBox.left,
        width: tabBox.width, // May be wrong until the font is loaded.
      },
    });
  }

  render() {
    const {
      centered,
      children: childrenProp,
      className: classNameProp,
      fullWidth,
      index,
      indicatorClassName,
      indicatorColor,
      onChange,
      textColor,
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const className = classNames(classes.root, {
      [classes.centered]: centered,
    }, classNameProp);

    const children = Children.map(childrenProp, (tab, childIndex) => {
      return cloneElement(tab, {
        fullWidth,
        selected: childIndex === index,
        index: childIndex,
        onChange,
        textColor,
      });
    });

    return (
      <EventListener target="window" onResize={this.handleResize}>
        <div
          className={className}
          ref={(c) => { this.tabs = c; }}
          role="tablist"
          {...other}
        >
          {children}
          <TabIndicator
            style={this.state.indicatorStyle}
            className={indicatorClassName}
            indicatorColor={indicatorColor}
          />
        </div>
      </EventListener>
    );
  }
}
