import React from 'react';
import PropTypes from 'prop-types';
import { create } from 'jss';
import { withStyles, useTheme, jssPreset, StylesProvider } from '@material-ui/core/styles';
import rtl from 'jss-rtl';
import Frame, { FrameContext } from 'react-frame-component';
import { useSelector } from 'react-redux';
import DemoErrorBoundary from 'docs/src/modules/components/DemoErrorBoundary';

const styles = (theme) => ({
  frame: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    height: 400,
    border: 'none',
    boxShadow: theme.shadows[1],
  },
});

function FramedDemo(props) {
  const { children } = props;

  const { document } = React.useContext(FrameContext);

  const theme = useTheme();
  React.useEffect(() => {
    document.body.dir = theme.direction;
  }, [document, theme.direction]);

  const { jss, sheetsManager } = React.useMemo(() => {
    return {
      jss: create({
        plugins: [...jssPreset().plugins, rtl()],
        insertionPoint: document.head,
      }),
      sheetsManager: new Map(),
    };
  }, [document]);

  const getWindow = React.useCallback(() => document.defaultView, [document]);

  return (
    <StylesProvider jss={jss} sheetsManager={sheetsManager}>
      {React.cloneElement(children, {
        window: getWindow,
      })}
    </StylesProvider>
  );
}
FramedDemo.propTypes = {
  children: PropTypes.node,
};

function DemoFrame(props) {
  const { children, classes, ...other } = props;

  return (
    <Frame className={classes.frame} {...other}>
      <FramedDemo>{children}</FramedDemo>
    </Frame>
  );
}

DemoFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

const StyledFrame = withStyles(styles)(DemoFrame);

/**
 * Isolates the demo component as best as possible. Additional props are spread
 * to an `iframe` if `iframe={true}`.
 */
function DemoSandboxed(props) {
  const { component: Component, iframe, name, onResetDemoClick, ...other } = props;
  const Sandbox = iframe ? StyledFrame : React.Fragment;
  const sandboxProps = iframe ? { title: `${name} demo`, ...other } : {};

  const t = useSelector((state) => state.options.t);

  return (
    <DemoErrorBoundary onResetDemoClick={onResetDemoClick} t={t}>
      <Sandbox {...sandboxProps}>
        <Component />
      </Sandbox>
    </DemoErrorBoundary>
  );
}

DemoSandboxed.propTypes = {
  component: PropTypes.elementType.isRequired,
  iframe: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onResetDemoClick: PropTypes.func.isRequired,
};

export default React.memo(DemoSandboxed);
