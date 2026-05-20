import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';

function TestViewer(props) {
  const { children, path } = props;

  // We're simulating `act(() => ReactDOM.render(children))`
  // In the end children passive effects should've been flushed.
  // React doesn't have any such guarantee outside of `act()` so we're approximating it.
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;

    // Wait for two animation frames after fonts settle so the browser
    // completes a full layout/paint cycle. Components that measure their
    // own DOM on mount (e.g. MUI Collapse running getBoundingClientRect
    // in a useLayoutEffect) need this extra frame to reach their final
    // height; otherwise screenshots can capture a 1px transient state.
    function markReadyAfterFrames() {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setReady(true);
        });
      });
    }

    function handleFontsEvent(event) {
      if (event.type === 'loading') {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
        setReady(false);
      } else if (event.type === 'loadingdone') {
        // Don't know if there could be multiple loaded events after we started loading multiple times.
        // So make sure we're only ready if fonts are actually ready.
        if (document.fonts.status === 'loaded') {
          markReadyAfterFrames();
        }
      }
    }

    document.fonts.addEventListener('loading', handleFontsEvent);
    document.fonts.addEventListener('loadingdone', handleFontsEvent);

    // In case the child triggered font fetching we're not ready yet.
    // The fonts event handler will mark the test as ready on `loadingdone`
    if (document.fonts.status === 'loaded') {
      markReadyAfterFrames();
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      document.fonts.removeEventListener('loading', handleFontsEvent);
      document.fonts.removeEventListener('loadingdone', handleFontsEvent);
    };
  }, []);

  const viewerBoxSx = {
    display: 'block',
    p: 1,
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          html: {
            WebkitFontSmoothing: 'antialiased', // Antialiasing.
            MozOsxFontSmoothing: 'grayscale', // Antialiasing.
            // Do the opposite of the docs in order to help catching issues.
            boxSizing: 'content-box',
          },
          '*, *::before, *::after': {
            boxSizing: 'inherit',
            // Disable transitions to avoid flaky screenshots
            transition: 'none !important',
            animation: 'none !important',
          },
          body: {
            margin: 0,
            overflowX: 'hidden',
          },
        }}
      />
      {
        <Box
          aria-busy={!ready}
          data-testid="testcase"
          data-testpath={path}
          sx={{ bgcolor: 'background.default', ...viewerBoxSx }}
        >
          {children}
        </Box>
      }
    </React.Fragment>
  );
}

TestViewer.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

export default TestViewer;
