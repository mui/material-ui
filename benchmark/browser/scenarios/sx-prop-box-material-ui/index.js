import * as React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { logReactMetrics } from '../utils';

const theme = createMuiTheme();

export default function BasicStyledComponents() {
    return (
      <React.Profiler id="sx-prop-box-material-ui" onRender={logReactMetrics}>
        {new Array(1000).fill().map(() => (
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                width: 200,
                height: 200,
                backgroundColor: [undefined, 'primary.light', 'primary.main', 'primary.dark'],
                borderWidth: '3px',
                borderColor: 'white',
                borderStyle: [undefined, 'dashed', 'solid', 'dotted'],
                ':hover': {
                  backgroundColor: (theme) => theme.palette.secondary.dark,
                },
              }}
            >
              material-ui
            </Box>
          </ThemeProvider>
        ))}
      </React.Profiler>
    );
  }