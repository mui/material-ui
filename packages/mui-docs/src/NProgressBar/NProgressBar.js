import * as React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import GlobalStyles from '@mui/material/GlobalStyles';
import NoSsr from '@mui/core/NoSsr';
import { exactProp } from '@mui/utils';

NProgress.configure({
  barSelector: '.nprogress-bar',
  template: `
    <div class="nprogress-bar">
      <div class="nprogress-bar-first"></div>
      <div class="nprogress-bar-last"></div>
    </div>
  `,
});

const styles = (theme) => {
  if (!theme.nprogress.color) {
    throw new Error(
      'MUI: You need to provide a `theme.nprogress.color` property' +
        ' for using the `NProgressBar` component.',
    );
  }

  return `
    /* @noflip */
    #nprogress {
      direction: ltr;
      pointer-events: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      z-index: ${theme.zIndex.tooltip};
      background-color: ${
        theme.palette.mode === 'dark' ? theme.palette.primary[700] : theme.palette.primary[200]
      };
      & .nprogress-bar {
        position: fixed;
        background-color: ${theme.nprogress.color};
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
      }
      & .nprogress-bar > div {
        position: absolute;
        top: 0;
        height: 2px;
        box-shadow: ${theme.nprogress.color} 1px 0 6px 1px;
        border-radius: 100%;
        animation: mui-nprogress-pulse 2s ease-out 0s infinite;
      }
      & .nprogress-bar > .nprogress-bar-first {
        opacity: 0.6;
        width: 20px;
        right: 0;
        clip: rect(-6px,22px,14px,10px);
      }
      & .nprogress-bar > nprogress-bar-last {
        opacity: 0.6;
        width: 180px;
        right: -80px;
        clip: rect(-6px,90px,14px,-6px);
      }
    }
    @keyframes mui-nprogress-pulse {
      30% {
        opacity: 0.6,
      }
      60% {
        opacity: 0,
      }
      to {
        opacity: 0.6,
      }
    }
  `;
};

/**
 * Elegant and ready-to-use wrapper on top of https://github.com/rstacruz/nprogress/.
 * The implementation is highly inspired by the YouTube one.
 */
function NProgressBar(props) {
  return (
    <NoSsr>
      {props.children}
      <GlobalStyles styles={styles} />
    </NoSsr>
  );
}

NProgressBar.propTypes = {
  children: PropTypes.node,
};

if (process.env.NODE_ENV !== 'production') {
  NProgressBar.propTypes = exactProp(NProgressBar.propTypes);
}

export default NProgressBar;
