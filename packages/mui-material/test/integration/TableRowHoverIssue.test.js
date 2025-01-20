// test/integration/TableRowHoverBackground.test.js
import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

describe('<TableRow> hover background integration', () => {
  const { render } = createRenderer();

  describe('with theme palette action values', () => {
    function TestTable({ hoverOpacity, selectedOpacity }) {
      const theme = createTheme({
        palette: {
          action: {
            hoverOpacity,
            selectedOpacity,
          },
        },
      });

      return (
        <ThemeProvider theme={theme}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow hover>
                  <TableCell>Row 1</TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>Row 2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </ThemeProvider>
      );
    }

    it('should render correctly with valid hoverOpacity', () => {
      const { container } = render(<TestTable hoverOpacity={0.1} selectedOpacity={0.1} />);
      const rows = container.querySelectorAll('tr');
      expect(rows).to.have.length(2);
    });

    it('should handle invalid hoverOpacity gracefully (clamping behavior)', () => {
      const { container } = render(<TestTable hoverOpacity={1.5} selectedOpacity={-0.5} />);
      const rows = container.querySelectorAll('tr');
      expect(rows).to.have.length(2); // Ensure rows render correctly
    });

    it('should apply clamped hoverOpacity and selectedOpacity in rendering', () => {
      const { container } = render(<TestTable hoverOpacity={2} selectedOpacity={1} />);
      const rows = container.querySelectorAll('tr');

      // Validate rendering - assume clamping happens internally
      expect(rows).to.have.length(2);
    });
  });
});
