import React from 'react';
import {AppBar} from 'material-ui';

import IconButton from 'icon-button';
import MoreVertIcon from 'svg-icons/navigation/more-vert';
import ArrowBack from 'svg-icons/navigation/arrow-back';

const AppBarWaterfallExample = React.createClass({

  render() {
    return (
      <AppBar
        position="waterfall"
        waterfall={{
          minHeight: 64,
          maxHeight: 210,
          children: this.getWaterfallChildren(),
          onHeightChange: this.onHeightChange,
        }}
        title={
          <div
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

  getWaterfallChildren() {
    let styles = this.getStyles();
    return (
      <div
        style={{overflow: 'hidden'}}>
        <img
          ref={el => { this.logoEl = el; }}
          style={styles.logo}
          src="images/material-ui-logo.svg"/>
      </div>
    );
  },

  onHeightChange({height, minHeight, maxHeight}) {
    let interpolation = (height - minHeight) / (maxHeight - minHeight);

    // For best performance, we will directly modify style on DOM elements
    this.logoEl.style.transform = `translate3d(80px,0,0) scale3d(${interpolation}, ${interpolation}, 1)`;
    this.logoEl.style.opacity = interpolation;
    this.titleEl.style.opacity = 1 - interpolation;
  },

  onBackClick() {
    window.history.back();
  },

  getStyles() {
    return {
      logo: {
        height: 120,
        margin: '0 auto',
        display: 'block',
        transformOrigin: '25% 100% 0',
        transform: 'translate3d(80px,0,0)',
      },
    };
  },
});

export default AppBarWaterfallExample;
