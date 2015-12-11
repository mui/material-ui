import React from 'react';
import {AppBar} from 'material-ui';

import IconButton from 'icon-button';
import MoreVertIcon from 'svg-icons/navigation/more-vert';
import ArrowBack from 'svg-icons/navigation/arrow-back';

const MIN_HEIGHT = 64;
const MAX_HEIGHT = 210;

const AppBarWaterfallExample = React.createClass({

  propTypes: {
    onBack: React.PropTypes.func,
  },

  getInitialState() {
    return {
      height: MAX_HEIGHT,
    };
  },

  render() {
    const styles = this.getStyles();
    return (
      <AppBar
        position="waterfall"
        waterfall={{
          minHeight: MIN_HEIGHT,
          maxHeight: MAX_HEIGHT,
          onHeightChange: this.onHeightChange,
          children: (<div
            style={styles.logoWrap}>
            <img
              ref={el => { this.logoEl = el; }}
              style={styles.logo}
              src="images/material-ui-logo.svg"/>
          </div>),
        }}
        title={
          <div
            style={styles.title}
            ref={el => { this.titleEl = el; }}>
            Waterfall AppBar
          </div>
        }
        iconElementLeft={
          <IconButton onClick={this.onBackClick}>
            <ArrowBack />
          </IconButton>
        }
        iconElementRight={
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        }
        />
    );
  },

  onHeightChange({height}) {
    this.setState({height});
  },

  onBackClick() {
    this.props.onBack();
  },

  getInterpolation(height) {
    return (height - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT);
  },

  getStyles() {
    const interpolation = this.getInterpolation(this.state.height);
    return {
      logoWrap: {
        overflow: 'hidden',
      },
      logo: {
        height: 120,
        margin: '0 auto',
        display: 'block',
        transformOrigin: '25% 100% 0',
        transform: `translate3d(80px,0,0) scale3d(${interpolation}, ${interpolation}, 1)`,
        opacity: interpolation,
      },
      title: {
        opacity: 1 - interpolation,
      },
    };
  },
});

export default AppBarWaterfallExample;
