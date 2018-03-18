import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import exactProp from 'material-ui/utils/exactProp';

NProgress.configure({
  template: `
    <div class="nprogress-bar" role="bar">
      <dt></dt>
      <dd></dd>
    </div>
  `,
});

const styles = theme => {
  if (!theme.nprogress.color) {
    throw new Error(
      'Material-UI: you need to provide a `theme.nprogress.color` property' +
        ' for using the `NProgressBar` component.',
    );
  }

  return {
    '@global': {
      '#nprogress': {
        pointerEvents: 'none',
        '& .nprogress-bar': {
          position: 'fixed',
          background: theme.nprogress.color,
          borderRadius: 1,
          zIndex: theme.zIndex.tooltip,
          top: 0,
          left: 0,
          width: '100%',
          height: 2,
        },
        '& dd, & dt': {
          position: 'absolute',
          top: 0,
          height: 2,
          boxShadow: `${theme.nprogress.color} 1px 0 6px 1px`,
          borderRadius: '100%',
          animation: 'nprogress-pulse 2s ease-out 0s infinite',
        },
        '& dd': {
          opacity: 0.6,
          width: 20,
          right: 0,
          clip: 'rect(-6px,22px,14px,10px)',
        },
        '& dt': {
          opacity: 0.6,
          width: 180,
          right: -80,
          clip: 'rect(-6px,90px,14px,-6px)',
        },
      },
      '@keyframes nprogress-pulse': {
        '30%': {
          opacity: 0.6,
        },
        '60%': {
          opacity: 0,
        },
        to: {
          opacity: 0.6,
        },
      },
    },
  };
};

/**
 * Elegant and ready to use wrapper on top of https://github.com/rstacruz/nprogress/.
 * The implementation is highly inspired by the YouTube version.
 */
function NProgressBar(props) {
  return props.children;
}

NProgressBar.propTypes = {
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
};

NProgressBar.propTypes = exactProp(NProgressBar.propTypes, 'NProgressBar');

NProgressBar.defaultProps = {
  children: null,
};

export default withStyles(styles)(NProgressBar);
