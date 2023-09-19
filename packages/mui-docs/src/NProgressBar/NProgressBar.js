import * as React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { NoSsr } from '@mui/base/NoSsr';
import { exactProp } from '@mui/utils';
import { createGlobalStyle } from 'styled-components';
import { keyframes, css, useTheme } from '@mui/material/styles';

NProgress.configure({
  barSelector: '.nprogress-bar',
  template: `
    <div class="nprogress-bar">
      <div></div>
      <div></div>
    </div>
  `,
});

const muiNProgressPulse = keyframes`
  30% {
    opacity: 0.6;
  }

  60% {
    opacity: 0;
  }

  to {
    opacity: 0.6;
  }
`;

const animation = css`
  ${muiNProgressPulse} 2s ease-out 0s infinite
`;

const GlobalStyles = createGlobalStyle`
  #nprogress {
    direction: ltr;
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    zIndex: ${({ theme }) => (theme.vars || theme).zIndex.tooltip};
    background-color: ${({ theme }) => (theme.vars || theme).palette.primary[200]};
  }
  :where([data-mui-color-scheme="dark"]) & {
    #nprogress {
      background-color: ${({ theme }) => (theme.vars || theme).palette.primary[700]};
    }
  }
  #nprogress .nprogress-bar {
    position: fixed;
    background-color: ${({ theme }) => (theme.vars || theme).palette.primary.main};
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
  };
  #nprogress .nprogress-bar > div {
    position: absolute;
    top: 0;
    height: 2px;
    box-shadow: ${({ theme }) => (theme.vars || theme).palette.primary.main} 1px 0 6px 1px;
    border-radius: 100%;
    animation: ${animation};
  };
  #nprogress .nprogress-bar > div:first-of-type {
    opacity: 0.6;
    width: 20px;
    right: 0;
    clip: rect(-6px,22px,14px,10px);
  };
  #nprogress .nprogress-bar > div:last-of-type {
    opacity: 0.6;
    width: 180px;
    right: -80px;
    clip: rect(-6px,90px,14px,-6px);
  };
`;

/**
 * Elegant and ready-to-use wrapper on top of https://github.com/rstacruz/nprogress/.
 * The implementation is highly inspired by the YouTube one.
 */
function NProgressBar(props) {
  return (
    <NoSsr>
      {props.children}
      <GlobalStyles />
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
