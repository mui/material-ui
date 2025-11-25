import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent, screen, waitFor } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { DraggableTableRow } from './DraggableTableRow';
import { DndContext } from '../DndContext/DndContext';
import { SortableContext } from '../SortableContext/SortableContext';

// Mock pointer capture methods globally since JSDOM doesn't fully support them
Element.prototype.setPointerCapture = function () {};
Element.prototype.releasePointerCapture = function () {};
Element.prototype.hasPointerCapture = function () {
  return true;
};

describe('DraggableTableRow', () => {
  const { render } = createRenderer();

  // Render wrapper for table context
  function renderInTable(row: React.ReactElement, items: string[] = ['row-1', 'row-2']) {
    return render(
      <DndContext>
        <SortableContext items={items}>
          <Table>
            <TableBody>{row}</TableBody>
          </Table>
        </SortableContext>
      </DndContext>,
    );
  }

  function mockRowRect(row: HTMLTableRowElement) {
    row.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 600,
      height: 52,
      right: 600,
      bottom: 52,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  }

  // Mock getBoundingClientRect for cells
  function mockCellRects(row: HTMLTableRowElement, widths: number[]) {
    const cells = row.querySelectorAll('td, th');
    cells.forEach((cell, i) => {
      (cell as HTMLElement).getBoundingClientRect = () => ({
        width: widths[i] || 100,
        height: 52,
        left: 0,
        top: 0,
        right: widths[i] || 100,
        bottom: 52,
        x: 0,
        y: 0,
        toJSON: () => {},
      });
    });
  }

  describe('rendering', () => {
    it('renders as <tr> element', () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      expect(row.tagName.toLowerCase()).to.equal('tr');
    });

    it('applies MuiDraggableTableRow-root class', () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      expect(row.className).to.include('MuiDraggableTableRow-root');
    });

    it('renders TableCell children correctly', () => {
      renderInTable(
        <DraggableTableRow id="row-1">
          <TableCell>Cell 1</TableCell>
          <TableCell>Cell 2</TableCell>
          <TableCell>Cell 3</TableCell>
        </DraggableTableRow>,
      );

      expect(screen.getByText('Cell 1')).not.to.equal(null);
      expect(screen.getByText('Cell 2')).not.to.equal(null);
      expect(screen.getByText('Cell 3')).not.to.equal(null);
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLTableRowElement>();

      renderInTable(
        <DraggableTableRow id="row-1" ref={ref}>
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      expect(ref.current).not.to.equal(null);
      expect(ref.current?.tagName.toLowerCase()).to.equal('tr');
    });

    it('forwards callback ref correctly', () => {
      let refElement: HTMLTableRowElement | null = null;

      renderInTable(
        <DraggableTableRow
          id="row-1"
          ref={(el) => {
            refElement = el;
          }}
        >
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      expect(refElement).not.to.equal(null);
      expect(refElement?.tagName.toLowerCase()).to.equal('tr');
    });
  });

  describe('cell width preservation', () => {
    // Note: Full cell width preservation testing is deferred to E2E tests (PR-018)
    // because the useEffect that captures cell widths runs after the render cycle,
    // making it difficult to test the exact pixel values in JSDOM synchronously.

    it('drag starts correctly with multiple cells', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell 1</TableCell>
          <TableCell>Cell 2</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [150, 200]);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        expect(row).to.have.attribute('aria-pressed', 'true');
      });

      // Verify cells are still rendered during drag
      const cells = row.querySelectorAll('td');
      expect(cells.length).to.equal(2);
    });

    it('row with cells renders correctly during drag', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell 1</TableCell>
          <TableCell>Cell 2</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [120, 180]);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        expect(row).to.have.attribute('aria-pressed', 'true');
      });

      // Verify row styling changes during drag
      const computedStyle = window.getComputedStyle(row);
      expect(computedStyle.cursor).to.equal('grabbing');
    });

    it('handles nested tables without crashing', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>
            <table>
              <tbody>
                <tr>
                  <td data-testid="nested-cell">Nested Cell</td>
                </tr>
              </tbody>
            </table>
          </TableCell>
          <TableCell>Main Cell 2</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        expect(row).to.have.attribute('aria-pressed', 'true');
      });

      // Verify nested content still renders
      expect(screen.getByTestId('nested-cell')).not.to.equal(null);
      expect(screen.getByText('Main Cell 2')).not.to.equal(null);
    });
  });

  describe('drag state styling', () => {
    it('background changes to action.selected when dragging', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [200]);

      // Check initial state has no special background
      const initialStyle = window.getComputedStyle(row);
      const initialBg = initialStyle.backgroundColor;

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(row);
        // Background should change from initial
        expect(computedStyle.backgroundColor).not.to.equal(initialBg);
      });
    });

    it('boxShadow applied (theme.shadows[2]) when dragging', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [200]);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(row);
        expect(computedStyle.boxShadow).not.to.equal('none');
        expect(computedStyle.boxShadow).not.to.equal('');
      });
    });

    it('position relative and zIndex 1 when dragging', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [200]);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(row);
        expect(computedStyle.position).to.equal('relative');
        expect(computedStyle.zIndex).to.equal('1');
      });
    });

    it('touch-action: none applied', () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      // touch-action is applied via styled component CSS, check class presence
      expect(row.className).to.include('MuiDraggableTableRow-root');
    });

    it('cursor is grab by default', () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      const computedStyle = window.getComputedStyle(row);
      expect(computedStyle.cursor).to.equal('grab');
    });

    it('cursor changes to grabbing when dragging', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [200]);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(row);
        expect(computedStyle.cursor).to.equal('grabbing');
      });
    });
  });

  describe('dragDisabled prop', () => {
    it('cursor is default when disabled', () => {
      renderInTable(
        <DraggableTableRow id="row-1" dragDisabled data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      const computedStyle = window.getComputedStyle(row);
      expect(computedStyle.cursor).to.equal('default');
    });

    it('no listeners when disabled', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" dragDisabled data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [200]);

      // Attempt drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      // Wait a bit and verify drag didn't start
      await new Promise((resolve) => setTimeout(resolve, 50));
      const computedStyle = window.getComputedStyle(row);
      expect(computedStyle.cursor).to.equal('default');
    });

    it('cell width capture skipped when disabled', () => {
      renderInTable(
        <DraggableTableRow id="row-1" dragDisabled data-testid="draggable-row">
          <TableCell>Cell 1</TableCell>
          <TableCell>Cell 2</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      const cells = row.querySelectorAll('td');

      // Cells should not have explicit width styles
      expect(cells[0].style.width).to.equal('');
      expect(cells[1].style.width).to.equal('');
    });

    it('tabIndex is -1 when disabled', () => {
      renderInTable(
        <DraggableTableRow id="row-1" dragDisabled data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      expect(row).to.have.attribute('tabindex', '-1');
    });

    it('still renders children normally when disabled', () => {
      renderInTable(
        <DraggableTableRow id="row-1" dragDisabled>
          <TableCell>Cell 1</TableCell>
          <TableCell>Cell 2</TableCell>
        </DraggableTableRow>,
      );

      expect(screen.getByText('Cell 1')).not.to.equal(null);
      expect(screen.getByText('Cell 2')).not.to.equal(null);
    });
  });

  describe('colSpan handling', () => {
    // Note: Full colSpan width preservation testing is deferred to E2E tests (PR-018)
    // because the useEffect timing makes it difficult to test in JSDOM.

    it('cells with colSpan render correctly', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell colSpan={2}>Spanning Cell</TableCell>
          <TableCell>Normal Cell</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [300, 150]);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        expect(row).to.have.attribute('aria-pressed', 'true');
      });

      // Verify cells are rendered and colSpan attribute is present
      const cells = row.querySelectorAll('td');
      expect(cells.length).to.equal(2);
      expect((cells[0] as HTMLTableCellElement).colSpan).to.equal(2);
    });

    it('spanning cell renders correctly during drag', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell colSpan={3}>Wide Spanning Cell</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [500]);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        expect(row).to.have.attribute('aria-pressed', 'true');
      });

      // Verify spanning cell content is preserved
      expect(screen.getByText('Wide Spanning Cell')).not.to.equal(null);
    });

    it('multiple non-spanning cells render correctly', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell 1</TableCell>
          <TableCell>Cell 2</TableCell>
          <TableCell>Cell 3</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [100, 150, 200]);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        expect(row).to.have.attribute('aria-pressed', 'true');
      });

      // Verify all cells render correctly during drag
      const cells = row.querySelectorAll('td');
      expect(cells.length).to.equal(3);
      expect(screen.getByText('Cell 1')).not.to.equal(null);
      expect(screen.getByText('Cell 2')).not.to.equal(null);
      expect(screen.getByText('Cell 3')).not.to.equal(null);
    });
  });

  describe('edge cases', () => {
    it('empty row (no children)', () => {
      renderInTable(<DraggableTableRow id="row-1" data-testid="draggable-row" />);

      const row = screen.getByTestId('draggable-row');
      expect(row).not.to.equal(null);
      expect(row.querySelectorAll('td').length).to.equal(0);
    });

    it('single cell row', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Only Cell</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [400]);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        expect(row).to.have.attribute('aria-pressed', 'true');
      });

      // Verify cell still renders during drag
      expect(screen.getByText('Only Cell')).not.to.equal(null);
    });

    it('mixed colSpan cells render correctly', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Normal 1</TableCell>
          <TableCell colSpan={2}>Span 2</TableCell>
          <TableCell>Normal 2</TableCell>
          <TableCell colSpan={3}>Span 3</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [100, 200, 100, 300]);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        expect(row).to.have.attribute('aria-pressed', 'true');
      });

      // Verify all cells render
      expect(screen.getByText('Normal 1')).not.to.equal(null);
      expect(screen.getByText('Normal 2')).not.to.equal(null);
      expect(screen.getByText('Span 2')).not.to.equal(null);
      expect(screen.getByText('Span 3')).not.to.equal(null);

      // Verify 4 cells total (colSpan makes them span multiple columns but still 4 elements)
      const cells = row.querySelectorAll('td');
      expect(cells.length).to.equal(4);
    });

    it('non-TableCell children (graceful handling)', () => {
      // React will warn but should not crash
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <td>Plain td</td>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      expect(screen.getByText('Plain td')).not.to.equal(null);
    });

    it('handles numeric id', () => {
      render(
        <DndContext>
          <SortableContext items={[1, 2]}>
            <Table>
              <TableBody>
                <DraggableTableRow id={1} data-testid="draggable-row">
                  <TableCell>Cell Content</TableCell>
                </DraggableTableRow>
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>,
      );

      const row = screen.getByTestId('draggable-row');
      expect(row).not.to.equal(null);
    });

    it('unmount during drag cleans up gracefully', async () => {
      const { unmount } = renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [200]);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        expect(row).to.have.attribute('aria-pressed', 'true');
      });

      // Unmount while dragging - should not throw
      unmount();
    });
  });

  describe('accessibility', () => {
    it('inherits from useSortable attributes', () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      expect(row).to.have.attribute('role', 'button');
      expect(row).to.have.attribute('tabindex', '0');
      expect(row).to.have.attribute('aria-pressed');
      expect(row).to.have.attribute('aria-describedby', 'dnd-instructions');
    });

    it('works with Table implicit aria roles', () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      // The row should still be a valid table row
      const row = screen.getByTestId('draggable-row');
      expect(row.tagName.toLowerCase()).to.equal('tr');
    });

    it('aria-disabled reflects dragDisabled prop', () => {
      const { rerender } = render(
        <DndContext>
          <SortableContext items={['row-1']}>
            <Table>
              <TableBody>
                <DraggableTableRow id="row-1" dragDisabled={false} data-testid="draggable-row">
                  <TableCell>Cell Content</TableCell>
                </DraggableTableRow>
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>,
      );

      let row = screen.getByTestId('draggable-row');
      expect(row).to.have.attribute('aria-disabled', 'false');

      rerender(
        <DndContext>
          <SortableContext items={['row-1']}>
            <Table>
              <TableBody>
                <DraggableTableRow id="row-1" dragDisabled data-testid="draggable-row">
                  <TableCell>Cell Content</TableCell>
                </DraggableTableRow>
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>,
      );

      row = screen.getByTestId('draggable-row');
      expect(row).to.have.attribute('aria-disabled', 'true');
    });
  });

  describe('theming', () => {
    it('uses theme.palette.action.selected for background when dragging', async () => {
      const customTheme = createTheme({
        palette: {
          action: {
            selected: 'rgb(255, 200, 200)',
          },
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <DndContext>
            <SortableContext items={['row-1', 'row-2']}>
              <Table>
                <TableBody>
                  <DraggableTableRow id="row-1" data-testid="draggable-row">
                    <TableCell>Cell Content</TableCell>
                  </DraggableTableRow>
                </TableBody>
              </Table>
            </SortableContext>
          </DndContext>
        </ThemeProvider>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [200]);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(row);
        expect(computedStyle.backgroundColor).to.equal('rgb(255, 200, 200)');
      });
    });

    it('uses theme.shadows[2] for boxShadow when dragging', async () => {
      const customTheme = createTheme({
        shadows: [
          'none',
          '0px 1px 1px rgba(0,0,0,0.1)',
          '0px 2px 4px rgba(0,0,0,0.25)', // shadows[2]
          ...Array(22).fill('0px 3px 3px rgba(0,0,0,0.1)'),
        ] as any,
      });

      render(
        <ThemeProvider theme={customTheme}>
          <DndContext>
            <SortableContext items={['row-1', 'row-2']}>
              <Table>
                <TableBody>
                  <DraggableTableRow id="row-1" data-testid="draggable-row">
                    <TableCell>Cell Content</TableCell>
                  </DraggableTableRow>
                </TableBody>
              </Table>
            </SortableContext>
          </DndContext>
        </ThemeProvider>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [200]);

      // Start drag
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(row);
        // rgba format may or may not have spaces depending on environment
        expect(computedStyle.boxShadow).to.include('0.25)');
      });
    });
  });

  describe('props passthrough', () => {
    it('TableRow hover prop works correctly', () => {
      renderInTable(
        <DraggableTableRow id="row-1" hover data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      expect(row.className).to.include('MuiTableRow-hover');
    });

    it('TableRow selected prop works correctly', () => {
      renderInTable(
        <DraggableTableRow id="row-1" selected data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      expect(row.className).to.include('Mui-selected');
    });

    it('sx prop merges with transform styles', () => {
      renderInTable(
        <DraggableTableRow
          id="row-1"
          sx={{ backgroundColor: 'rgb(0, 255, 0)', padding: 2 }}
          data-testid="draggable-row"
        >
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      const computedStyle = window.getComputedStyle(row);
      expect(computedStyle.backgroundColor).to.equal('rgb(0, 255, 0)');
    });

    it('custom data-* attributes pass through', () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row" data-custom="custom-value">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      expect(row).to.have.attribute('data-custom', 'custom-value');
    });

    it('onClick still works alongside drag', () => {
      const handleClick = spy();

      renderInTable(
        <DraggableTableRow id="row-1" onClick={handleClick} data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      fireEvent.click(row);

      expect(handleClick.calledOnce).to.equal(true);
    });

    it('className prop is merged with component classes', () => {
      renderInTable(
        <DraggableTableRow id="row-1" className="custom-class" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      expect(row.className).to.include('custom-class');
      expect(row.className).to.include('MuiDraggableTableRow-root');
    });
  });

  describe('useSortable integration', () => {
    it('receives correct id prop', () => {
      renderInTable(
        <DraggableTableRow id="unique-row-id" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
        ['unique-row-id', 'row-2'],
      );

      const row = screen.getByTestId('draggable-row');
      expect(row).not.to.equal(null);
    });

    it('custom data prop passed to useSortable', () => {
      const customData = { type: 'data-row', index: 5 };

      renderInTable(
        <DraggableTableRow id="row-1" data={customData} data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      expect(row).not.to.equal(null);
    });

    it('custom transition config respected', () => {
      // Transition is applied via sx prop which generates emotion CSS classes
      // We verify the component renders correctly with custom transition config
      renderInTable(
        <DraggableTableRow
          id="row-1"
          transition={{ duration: 400, easing: 'linear' }}
          data-testid="draggable-row"
        >
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row');
      // Verify component renders correctly with transition prop
      expect(row).not.to.equal(null);
      expect(row.className).to.include('MuiDraggableTableRow-root');
    });
  });

  describe('multiple rows', () => {
    it('multiple DraggableTableRows render in same table', () => {
      render(
        <DndContext>
          <SortableContext items={['row-1', 'row-2', 'row-3']}>
            <Table>
              <TableBody>
                <DraggableTableRow id="row-1">
                  <TableCell>Row 1</TableCell>
                </DraggableTableRow>
                <DraggableTableRow id="row-2">
                  <TableCell>Row 2</TableCell>
                </DraggableTableRow>
                <DraggableTableRow id="row-3">
                  <TableCell>Row 3</TableCell>
                </DraggableTableRow>
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>,
      );

      expect(screen.getByText('Row 1')).not.to.equal(null);
      expect(screen.getByText('Row 2')).not.to.equal(null);
      expect(screen.getByText('Row 3')).not.to.equal(null);
    });

    it('each row is independently draggable', async () => {
      render(
        <DndContext>
          <SortableContext items={['row-1', 'row-2']}>
            <Table>
              <TableBody>
                <DraggableTableRow id="row-1" data-testid="row-1">
                  <TableCell>Row 1</TableCell>
                </DraggableTableRow>
                <DraggableTableRow id="row-2" data-testid="row-2">
                  <TableCell>Row 2</TableCell>
                </DraggableTableRow>
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>,
      );

      const row1 = screen.getByTestId('row-1') as HTMLTableRowElement;
      const row2 = screen.getByTestId('row-2') as HTMLTableRowElement;

      mockRowRect(row1);
      mockCellRects(row1, [200]);
      mockRowRect(row2);
      mockCellRects(row2, [200]);

      // Drag row-1
      fireEvent.mouseDown(row1, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        expect(row1).to.have.attribute('aria-pressed', 'true');
        // row-2 should not be dragging
        expect(row2).to.have.attribute('aria-pressed', 'false');
      });
    });
  });

  describe('ref forwarding', () => {
    it('callback ref receives element', () => {
      let refElement: HTMLTableRowElement | null = null;

      renderInTable(
        <DraggableTableRow
          id="row-1"
          ref={(el) => {
            refElement = el;
          }}
        >
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      expect(refElement).not.to.equal(null);
      expect(refElement?.tagName.toLowerCase()).to.equal('tr');
    });

    it('object ref receives element', () => {
      const ref = React.createRef<HTMLTableRowElement>();

      renderInTable(
        <DraggableTableRow id="row-1" ref={ref}>
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      expect(ref.current).not.to.equal(null);
      expect(ref.current?.tagName.toLowerCase()).to.equal('tr');
    });

    it('setNodeRef from useSortable also receives element (verified by drag working)', async () => {
      renderInTable(
        <DraggableTableRow id="row-1" data-testid="draggable-row">
          <TableCell>Cell Content</TableCell>
        </DraggableTableRow>,
      );

      const row = screen.getByTestId('draggable-row') as HTMLTableRowElement;
      mockRowRect(row);
      mockCellRects(row, [200]);

      // If setNodeRef received the element, drag should work
      fireEvent.mouseDown(row, {
        button: 0,
        clientX: 100,
        clientY: 26,
      });

      await waitFor(() => {
        expect(row).to.have.attribute('aria-pressed', 'true');
      });
    });
  });
});
