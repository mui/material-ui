import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { create } from 'jss';
import { makeStyles, useTheme, jssPreset, StylesProvider } from '@material-ui/core/styles';
import rtl from 'jss-rtl';
import { useSelector } from 'react-redux';
import DemoErrorBoundary from 'docs/src/modules/components/DemoErrorBoundary';

function FramedDemo(props) {
  const { children, document } = props;

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
  document: PropTypes.object.isRequired,
};

const useStyles = makeStyles(
  (theme) => ({
    frame: {
      backgroundColor: theme.palette.background.default,
      flexGrow: 1,
      height: 400,
      border: 'none',
      boxShadow: theme.shadows[1],
    },
  }),
  { name: 'DemoFrame' },
);

function DemoFrame(props) {
  const { children, title, ...other } = props;
  const classes = useStyles();
  /**
   * @type {import('react').Ref<HTMLIFrameElement>}
   */
  const frameRef = React.useRef(null);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const document = frameRef.current?.contentDocument;

  return (
    <React.Fragment>
      <iframe className={classes.frame} ref={frameRef} title={title} {...other} />
      {mounted
        ? ReactDOM.createPortal(
            <FramedDemo document={document}>{children}</FramedDemo>,
            document.body,
          )
        : null}
    </React.Fragment>
  );
}

DemoFrame.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

/**
 * Isolates the demo component as best as possible. Additional props are spread
 * to an `iframe` if `iframe={true}`.
 */
function DemoSandboxed(props) {
  const { component: Component, iframe, name, onResetDemoClick, ...other } = props;
  const Sandbox = iframe ? DemoFrame : React.Fragment;
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
