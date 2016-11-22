import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import ClassNames from 'classnames';
import TabIndicator from './TabIndicator';

export const styleSheet = createStyleSheet('Tabs', () => {
  return {
    root: {
      maxHeight: 48,
      position: 'relative',
      display: 'flex',
      justifyContent: 'flex-start',
      width: 'auto',
    },
    centered: {
      justifyContent: 'center',
    },
  };
});

export default class Tabs extends Component {
  static propTypes = {
    /**
     * The content of the Tabs.
     */
    activeTab: PropTypes.number,
    /**
     * The content of the Tabs.
     */
    centered: PropTypes.bool,
    /**
     * The content of the Tabs.
     */
    fixed: PropTypes.bool,
    /**
     * The content of the Tabs.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    indicator: {},
  };

  componentDidMount() {
    this.updateIndicator();
  }

  componentWillReceiveProps() {
    this.updateIndicator();
  }

  updateIndicator() {
    clearTimeout(this.indicatorTimeout);
    this.indicatorTimeout = setTimeout(() => {
      const { activeTab } = this.props;
      this.setState({
        indicator: {
          left: this.tabs.children[activeTab].getBoundingClientRect().left - this.tabs.getBoundingClientRect().left,
          width: this.tabs.children[activeTab].getBoundingClientRect().width,
        },
      });
    }, 20);
  }

  render() {
    const {
      centered,
      children,
      className,
      fixed,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });
    const classNames = ClassNames({
      [classes.root]: true,
      [classes.centered]: centered,
    }, className);

    const tabs = React.Children.map(children, (tab, index) => {
      return React.cloneElement(tab, {
        active: this.props.activeTab === index,
        style: { width: fixed && '100%' },
      });
    });

    return (
      <div className={classNames} ref={(t) => this.tabs = t}>
        {tabs}
        <TabIndicator primary style={this.state.indicator} />
      </div>
    );
  }
}
