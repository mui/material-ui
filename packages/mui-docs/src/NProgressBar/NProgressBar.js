import * as React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { NoSsr } from '@mui/base/NoSsr';
import { exactProp } from '@mui/utils';
import GlobalStyles from '@mui/material/GlobalStyles';
import { keyframes, css } from '@mui/material/styles';

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

/**
 * Elegant and ready-to-use wrapper on top of https://github.com/rstacruz/nprogress/.
 * The implementation is highly inspired by the YouTube one.
 */
function NProgressBar(props) {
  return (
    <NoSsr>
      {props.children}
      {/* Error: It seems you are interpolating a keyframe declaration (ikWivX) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\`\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css */}
      {/* <GlobalStyles
        styles={`
          #nprogress {
            direction: ltr;
            pointerEvents: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 2;
            zIndex: ${(theme) => (theme.vars || theme).zIndex.tooltip};
            backgroundColor: ${(theme) => (theme.vars || theme).palette.primary[200]};
          }
          :where([data-mui-color-scheme="light|dark"]) & {
            #nprogress {
              backgroundColor: ${theme => (theme.vars || theme).palette.primary[700]};
            }
          }
          #nprogress .nprogress-bar {
            position: 'fixed',
            backgroundColor: ${theme => (theme.vars || theme).palette.primary.main};
            top: 0,
            left: 0,
            right: 0,
            height: 2,
          };
          #nprogress .nprogress-bar > div {
            position: 'absolute',
            top: 0,
            height: 2,
            boxShadow: ${theme => (theme.vars || theme).palette.primary.main} 1px 0 6px 1px;
            borderRadius: '100%';
            animation: ${animation};
          };
          #nprogress .nprogress-bar > div:first-of-type {
            opacity: 0.6,
            width: 20,
            right: 0,
            clip: 'rect(-6px,22px,14px,10px)',
          };
          #nprogress .nprogress-bar > div:last-of-type {
            opacity: 0.6,
            width: 180,
            right: -80,
            clip: 'rect(-6px,90px,14px,-6px)',
          };
        }`}
      /> */}
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
