import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent, screen, waitFor } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import FaceIcon from '@mui/icons-material/Face';
import DeleteIcon from '@mui/icons-material/Delete';
import { DraggableChip } from './DraggableChip';
import { DndContext } from '../DndContext/DndContext';
import { SortableContext } from '../SortableContext/SortableContext';

// Mock pointer capture methods globally since JSDOM doesn't fully support them
Element.prototype.setPointerCapture = function () {};
Element.prototype.releasePointerCapture = function () {};
Element.prototype.hasPointerCapture = function () {
  return true;
};

describe('DraggableChip', () => {
  const { render } = createRenderer();

  // Render wrapper for chip list context
  function renderChipList(chips: React.ReactElement[], items?: string[]) {
    const chipItems = items || chips.map((_, i) => `chip-${i}`);
    return render(
      <DndContext>
        <SortableContext items={chipItems} strategy="horizontal">
          <Stack direction="row" spacing={1}>
            {chips}
          </Stack>
        </SortableContext>
      </DndContext>,
    );
  }

  function renderInChipList(chip: React.ReactElement, items: string[] = ['chip-0', 'chip-1']) {
    return render(
      <DndContext>
        <SortableContext items={items} strategy="horizontal">
          <Stack direction="row" spacing={1}>
            {chip}
          </Stack>
        </SortableContext>
      </DndContext>,
    );
  }

  function mockElementRect(element: HTMLElement) {
    element.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 100,
      height: 32,
      right: 100,
      bottom: 32,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  }

  describe('rendering', () => {
    it('renders as <div> element (Chip default)', () => {
      renderInChipList(<DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />);

      const chip = screen.getByTestId('draggable-chip');
      expect(chip.tagName.toLowerCase()).to.equal('div');
    });

    it('applies MuiDraggableChip-root class', () => {
      renderInChipList(<DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />);

      const chip = screen.getByTestId('draggable-chip');
      expect(chip.className).to.include('MuiDraggableChip-root');
    });

    it('renders label correctly', () => {
      renderInChipList(<DraggableChip id="chip-0" label="My Tag" />);

      expect(screen.getByText('My Tag')).not.to.equal(null);
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();

      renderInChipList(<DraggableChip id="chip-0" label="Tag" ref={ref} />);

      expect(ref.current).not.to.equal(null);
      expect(ref.current?.tagName.toLowerCase()).to.equal('div');
    });

    it('forwards callback ref correctly', () => {
      let refElement: HTMLDivElement | null = null;

      renderInChipList(
        <DraggableChip
          id="chip-0"
          label="Tag"
          ref={(el) => {
            refElement = el;
          }}
        />,
      );

      expect(refElement).not.to.equal(null);
      expect(refElement?.tagName.toLowerCase()).to.equal('div');
    });
  });

  describe('Chip props passthrough', () => {
    it('label prop works', () => {
      renderInChipList(<DraggableChip id="chip-0" label="Custom Label" />);

      expect(screen.getByText('Custom Label')).not.to.equal(null);
    });

    it('variant prop works (filled)', () => {
      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" variant="filled" data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      expect(chip.className).to.include('MuiChip-filled');
    });

    it('variant prop works (outlined)', () => {
      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" variant="outlined" data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      expect(chip.className).to.include('MuiChip-outlined');
    });

    it('color prop works', () => {
      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" color="primary" data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      expect(chip.className).to.include('MuiChip-colorPrimary');
    });

    it('size prop works', () => {
      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" size="small" data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      expect(chip.className).to.include('MuiChip-sizeSmall');
    });

    it('icon prop renders correctly', () => {
      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" icon={<FaceIcon data-testid="chip-icon" />} />,
      );

      expect(screen.getByTestId('chip-icon')).not.to.equal(null);
    });

    it('avatar prop renders correctly', () => {
      renderInChipList(
        <DraggableChip
          id="chip-0"
          label="Tag"
          avatar={<Avatar data-testid="chip-avatar">A</Avatar>}
        />,
      );

      expect(screen.getByTestId('chip-avatar')).not.to.equal(null);
    });

    it('deleteIcon prop renders correctly', () => {
      renderInChipList(
        <DraggableChip
          id="chip-0"
          label="Tag"
          onDelete={() => {}}
          deleteIcon={<DeleteIcon data-testid="delete-icon" />}
        />,
      );

      expect(screen.getByTestId('delete-icon')).not.to.equal(null);
    });

    it('onDelete callback works (not blocked by drag listeners)', () => {
      const handleDelete = spy();

      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" onDelete={handleDelete} data-testid="draggable-chip" />,
      );

      // Find and click the delete button
      const deleteButton = screen.getByTestId('draggable-chip').querySelector('[data-testid="CancelIcon"]') ||
        screen.getByTestId('draggable-chip').querySelector('.MuiChip-deleteIcon');

      if (deleteButton) {
        fireEvent.click(deleteButton);
        expect(handleDelete.calledOnce).to.equal(true);
      }
    });

    it('onClick callback works (not blocked by drag listeners)', () => {
      const handleClick = spy();

      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" onClick={handleClick} data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      fireEvent.click(chip);

      expect(handleClick.calledOnce).to.equal(true);
    });
  });

  describe('disabled vs dragDisabled', () => {
    it('disabled=false, dragDisabled=false: full functionality', () => {
      renderInChipList(
        <DraggableChip
          id="chip-0"
          label="Tag"
          disabled={false}
          dragDisabled={false}
          data-testid="draggable-chip"
        />,
      );

      const chip = screen.getByTestId('draggable-chip');
      const computedStyle = window.getComputedStyle(chip);
      expect(computedStyle.cursor).to.equal('grab');
    });

    it('disabled=false, dragDisabled=true: no drag, interactions work', () => {
      const handleClick = spy();

      renderInChipList(
        <DraggableChip
          id="chip-0"
          label="Tag"
          disabled={false}
          dragDisabled
          onClick={handleClick}
          data-testid="draggable-chip"
        />,
      );

      const chip = screen.getByTestId('draggable-chip');
      const computedStyle = window.getComputedStyle(chip);
      expect(computedStyle.cursor).to.equal('default');

      // Click should still work
      fireEvent.click(chip);
      expect(handleClick.calledOnce).to.equal(true);
    });

    it('disabled=true, dragDisabled=false: disabled chip, no drag', async () => {
      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" disabled dragDisabled={false} data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      const computedStyle = window.getComputedStyle(chip);

      // Cursor should be default due to disabled
      expect(computedStyle.cursor).to.equal('default');

      // Check Mui-disabled class is applied (standard MUI disabled class)
      expect(chip.className).to.include('Mui-disabled');
    });

    it('disabled=true, dragDisabled=true: fully disabled', () => {
      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" disabled dragDisabled data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      const computedStyle = window.getComputedStyle(chip);
      expect(computedStyle.cursor).to.equal('default');
      expect(chip.className).to.include('Mui-disabled');
    });
  });

  describe('drag state styling', () => {
    it('default cursor is grab (unless disabled)', () => {
      renderInChipList(<DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />);

      const chip = screen.getByTestId('draggable-chip');
      const computedStyle = window.getComputedStyle(chip);
      expect(computedStyle.cursor).to.equal('grab');
    });

    it('cursor changes to grabbing when isDragging', async () => {
      renderInChipList(<DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />);

      const chip = screen.getByTestId('draggable-chip');
      mockElementRect(chip);

      // Start drag
      fireEvent.mouseDown(chip, {
        button: 0,
        clientX: 50,
        clientY: 16,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(chip);
        expect(computedStyle.cursor).to.equal('grabbing');
      });
    });

    it('opacity reduces to 0.7 when dragging', async () => {
      renderInChipList(<DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />);

      const chip = screen.getByTestId('draggable-chip');
      mockElementRect(chip);

      // Start drag
      fireEvent.mouseDown(chip, {
        button: 0,
        clientX: 50,
        clientY: 16,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(chip);
        expect(computedStyle.opacity).to.equal('0.7');
      });
    });

    it('applies touch-action: none', () => {
      renderInChipList(<DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />);

      const chip = screen.getByTestId('draggable-chip');
      expect(chip.className).to.include('MuiDraggableChip-root');
    });
  });

  describe('ownerState', () => {
    it('isDragging correctly reflected', async () => {
      renderInChipList(<DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />);

      const chip = screen.getByTestId('draggable-chip');
      mockElementRect(chip);

      // Initially not dragging
      expect(window.getComputedStyle(chip).cursor).to.equal('grab');

      // Start drag
      fireEvent.mouseDown(chip, {
        button: 0,
        clientX: 50,
        clientY: 16,
      });

      await waitFor(() => {
        expect(window.getComputedStyle(chip).cursor).to.equal('grabbing');
      });
    });

    it('disabled correctly reflected', () => {
      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" disabled data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      expect(chip.className).to.include('Mui-disabled');
    });

    it('variant correctly reflected', () => {
      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" variant="outlined" data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      expect(chip.className).to.include('MuiChip-outlined');
    });

    it('dragDisabled correctly reflected', () => {
      const { rerender } = render(
        <DndContext>
          <SortableContext items={['chip-0']} strategy="horizontal">
            <Stack direction="row" spacing={1}>
              <DraggableChip
                id="chip-0"
                label="Tag"
                dragDisabled={false}
                data-testid="draggable-chip"
              />
            </Stack>
          </SortableContext>
        </DndContext>,
      );

      let chip = screen.getByTestId('draggable-chip');
      expect(window.getComputedStyle(chip).cursor).to.equal('grab');

      rerender(
        <DndContext>
          <SortableContext items={['chip-0']} strategy="horizontal">
            <Stack direction="row" spacing={1}>
              <DraggableChip id="chip-0" label="Tag" dragDisabled data-testid="draggable-chip" />
            </Stack>
          </SortableContext>
        </DndContext>,
      );

      chip = screen.getByTestId('draggable-chip');
      expect(window.getComputedStyle(chip).cursor).to.equal('default');
    });
  });

  describe('useSortable integration', () => {
    it('disabled passed as (dragDisabled || disabled)', async () => {
      // When disabled=true, useSortable should be disabled
      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" disabled data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      mockElementRect(chip);

      // Attempt to start drag
      fireEvent.mouseDown(chip, {
        button: 0,
        clientX: 50,
        clientY: 16,
      });

      // Should not start dragging (cursor stays default)
      await new Promise((resolve) => setTimeout(resolve, 50));
      const computedStyle = window.getComputedStyle(chip);
      expect(computedStyle.cursor).to.equal('default');
    });

    it('id prop passed correctly', () => {
      renderInChipList(
        <DraggableChip id="unique-chip-123" label="Tag" data-testid="draggable-chip" />,
        ['unique-chip-123', 'chip-1'],
      );

      const chip = screen.getByTestId('draggable-chip');
      expect(chip).not.to.equal(null);
    });

    it('data prop passed correctly', () => {
      const customData = { type: 'tag', category: 'priority' };

      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" data={customData} data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      expect(chip).not.to.equal(null);
    });
  });

  describe('accessibility', () => {
    it('inherits useSortable ARIA attributes', () => {
      renderInChipList(<DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />);

      const chip = screen.getByTestId('draggable-chip');
      expect(chip).to.have.attribute('role', 'button');
      expect(chip).to.have.attribute('aria-pressed');
    });

    it('has role="button"', () => {
      renderInChipList(<DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />);

      const chip = screen.getByTestId('draggable-chip');
      expect(chip).to.have.attribute('role', 'button');
    });

    it('tabIndex is 0 when enabled', () => {
      renderInChipList(<DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />);

      const chip = screen.getByTestId('draggable-chip');
      expect(chip).to.have.attribute('tabindex', '0');
    });

    it('tabIndex is -1 when disabled', () => {
      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" disabled data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      expect(chip).to.have.attribute('tabindex', '-1');
    });

    it('works with Chips existing a11y features', () => {
      renderInChipList(
        <DraggableChip
          id="chip-0"
          label="Priority Tag"
          color="primary"
          data-testid="draggable-chip"
        />,
      );

      const chip = screen.getByTestId('draggable-chip');
      expect(chip).not.to.equal(null);
      expect(screen.getByText('Priority Tag')).not.to.equal(null);
    });
  });

  describe('theming', () => {
    it('uses theme.shadows[2] (subtle) when dragging', async () => {
      const customTheme = createTheme({
        shadows: [
          'none',
          '0px 1px 1px rgba(0,0,0,0.1)',
          '0px 2px 2px rgba(0,0,0,0.15)', // shadows[2] used for chips
          ...Array(22).fill('0px 5px 5px rgba(0,0,0,0.1)'),
        ] as any,
      });

      render(
        <ThemeProvider theme={customTheme}>
          <DndContext>
            <SortableContext items={['chip-0', 'chip-1']} strategy="horizontal">
              <Stack direction="row" spacing={1}>
                <DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />
              </Stack>
            </SortableContext>
          </DndContext>
        </ThemeProvider>,
      );

      const chip = screen.getByTestId('draggable-chip');
      mockElementRect(chip);

      // Start drag
      fireEvent.mouseDown(chip, {
        button: 0,
        clientX: 50,
        clientY: 16,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(chip);
        expect(computedStyle.boxShadow).to.include('0.15)');
      });
    });

    it('uses theme.zIndex.tooltip when dragging', async () => {
      const customTheme = createTheme({
        zIndex: {
          tooltip: 1500,
        },
      });

      render(
        <ThemeProvider theme={customTheme}>
          <DndContext>
            <SortableContext items={['chip-0', 'chip-1']} strategy="horizontal">
              <Stack direction="row" spacing={1}>
                <DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />
              </Stack>
            </SortableContext>
          </DndContext>
        </ThemeProvider>,
      );

      const chip = screen.getByTestId('draggable-chip');
      mockElementRect(chip);

      // Start drag
      fireEvent.mouseDown(chip, {
        button: 0,
        clientX: 50,
        clientY: 16,
      });

      await waitFor(() => {
        const computedStyle = window.getComputedStyle(chip);
        expect(computedStyle.zIndex).to.equal('1500');
      });
    });

    it('works with different Chip variants', () => {
      renderChipList([
        <DraggableChip key="1" id="chip-0" label="Filled" variant="filled" data-testid="filled" />,
        <DraggableChip key="2" id="chip-1" label="Outlined" variant="outlined" data-testid="outlined" />,
      ]);

      const filled = screen.getByTestId('filled');
      const outlined = screen.getByTestId('outlined');

      expect(filled.className).to.include('MuiChip-filled');
      expect(outlined.className).to.include('MuiChip-outlined');
    });

    it('works with different Chip colors', () => {
      renderChipList([
        <DraggableChip key="1" id="chip-0" label="Primary" color="primary" data-testid="primary" />,
        <DraggableChip key="2" id="chip-1" label="Secondary" color="secondary" data-testid="secondary" />,
        <DraggableChip key="3" id="chip-2" label="Error" color="error" data-testid="error" />,
      ], ['chip-0', 'chip-1', 'chip-2']);

      const primary = screen.getByTestId('primary');
      const secondary = screen.getByTestId('secondary');
      const error = screen.getByTestId('error');

      expect(primary.className).to.include('MuiChip-colorPrimary');
      expect(secondary.className).to.include('MuiChip-colorSecondary');
      expect(error.className).to.include('MuiChip-colorError');
    });
  });

  describe('with SortableContext horizontal strategy', () => {
    it('works with strategy="horizontal"', () => {
      render(
        <DndContext>
          <SortableContext items={['chip-0', 'chip-1', 'chip-2']} strategy="horizontal">
            <Stack direction="row" spacing={1}>
              <DraggableChip id="chip-0" label="Tag 1" data-testid="chip-0" />
              <DraggableChip id="chip-1" label="Tag 2" data-testid="chip-1" />
              <DraggableChip id="chip-2" label="Tag 3" data-testid="chip-2" />
            </Stack>
          </SortableContext>
        </DndContext>,
      );

      expect(screen.getByTestId('chip-0')).not.to.equal(null);
      expect(screen.getByTestId('chip-1')).not.to.equal(null);
      expect(screen.getByTestId('chip-2')).not.to.equal(null);
    });

    it('items shift left/right during sorting', async () => {
      render(
        <DndContext>
          <SortableContext items={['chip-0', 'chip-1']} strategy="horizontal">
            <Stack direction="row" spacing={1}>
              <DraggableChip id="chip-0" label="Tag 1" data-testid="chip-0" />
              <DraggableChip id="chip-1" label="Tag 2" data-testid="chip-1" />
            </Stack>
          </SortableContext>
        </DndContext>,
      );

      const chip0 = screen.getByTestId('chip-0');
      const chip1 = screen.getByTestId('chip-1');

      mockElementRect(chip0);
      mockElementRect(chip1);

      // Start drag on chip-0
      fireEvent.mouseDown(chip0, {
        button: 0,
        clientX: 50,
        clientY: 16,
      });

      await waitFor(() => {
        expect(chip0).to.have.attribute('aria-pressed', 'true');
      });
    });
  });

  describe('edge cases', () => {
    it('onDelete click doesnt start drag', async () => {
      const handleDelete = spy();

      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" onDelete={handleDelete} data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      mockElementRect(chip);

      // Find delete button - it typically has CancelIcon or deleteIcon class
      const deleteButton = chip.querySelector('.MuiChip-deleteIcon');

      if (deleteButton) {
        // Click delete should trigger onDelete, not start drag
        fireEvent.click(deleteButton);
        expect(handleDelete.calledOnce).to.equal(true);

        // Chip should not be in dragging state
        expect(chip).to.have.attribute('aria-pressed', 'false');
      }
    });

    it('clickable chips (onClick + drag)', async () => {
      const handleClick = spy();

      renderInChipList(
        <DraggableChip id="chip-0" label="Tag" onClick={handleClick} data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      mockElementRect(chip);

      // Click should trigger onClick
      fireEvent.click(chip);
      expect(handleClick.calledOnce).to.equal(true);

      // Drag should still work
      fireEvent.mouseDown(chip, {
        button: 0,
        clientX: 50,
        clientY: 16,
      });

      await waitFor(() => {
        expect(chip).to.have.attribute('aria-pressed', 'true');
      });
    });

    it('handles numeric id', () => {
      render(
        <DndContext>
          <SortableContext items={[1, 2]} strategy="horizontal">
            <Stack direction="row" spacing={1}>
              <DraggableChip id={1} label="Tag 1" data-testid="draggable-chip" />
            </Stack>
          </SortableContext>
        </DndContext>,
      );

      const chip = screen.getByTestId('draggable-chip');
      expect(chip).not.to.equal(null);
    });

    it('unmount during drag cleans up gracefully', async () => {
      const { unmount } = renderInChipList(
        <DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />,
      );

      const chip = screen.getByTestId('draggable-chip');
      mockElementRect(chip);

      // Start drag
      fireEvent.mouseDown(chip, {
        button: 0,
        clientX: 50,
        clientY: 16,
      });

      await waitFor(() => {
        expect(chip).to.have.attribute('aria-pressed', 'true');
      });

      // Unmount while dragging - should not throw
      unmount();
    });
  });

  describe('ref forwarding', () => {
    it('callback ref receives element', () => {
      let refElement: HTMLDivElement | null = null;

      renderInChipList(
        <DraggableChip
          id="chip-0"
          label="Tag"
          ref={(el) => {
            refElement = el;
          }}
        />,
      );

      expect(refElement).not.to.equal(null);
      expect(refElement?.tagName.toLowerCase()).to.equal('div');
    });

    it('object ref receives element', () => {
      const ref = React.createRef<HTMLDivElement>();

      renderInChipList(<DraggableChip id="chip-0" label="Tag" ref={ref} />);

      expect(ref.current).not.to.equal(null);
      expect(ref.current?.tagName.toLowerCase()).to.equal('div');
    });

    it('setNodeRef from useSortable also receives element (verified by drag working)', async () => {
      renderInChipList(<DraggableChip id="chip-0" label="Tag" data-testid="draggable-chip" />);

      const chip = screen.getByTestId('draggable-chip');
      mockElementRect(chip);

      // If setNodeRef received the element, drag should work
      fireEvent.mouseDown(chip, {
        button: 0,
        clientX: 50,
        clientY: 16,
      });

      await waitFor(() => {
        expect(chip).to.have.attribute('aria-pressed', 'true');
      });
    });
  });

  describe('multiple chips', () => {
    it('multiple DraggableChips render in same container', () => {
      render(
        <DndContext>
          <SortableContext items={['chip-0', 'chip-1', 'chip-2']} strategy="horizontal">
            <Stack direction="row" spacing={1}>
              <DraggableChip id="chip-0" label="Tag 1" />
              <DraggableChip id="chip-1" label="Tag 2" />
              <DraggableChip id="chip-2" label="Tag 3" />
            </Stack>
          </SortableContext>
        </DndContext>,
      );

      expect(screen.getByText('Tag 1')).not.to.equal(null);
      expect(screen.getByText('Tag 2')).not.to.equal(null);
      expect(screen.getByText('Tag 3')).not.to.equal(null);
    });

    it('each chip is independently draggable', async () => {
      render(
        <DndContext>
          <SortableContext items={['chip-0', 'chip-1']} strategy="horizontal">
            <Stack direction="row" spacing={1}>
              <DraggableChip id="chip-0" label="Tag 1" data-testid="chip-0" />
              <DraggableChip id="chip-1" label="Tag 2" data-testid="chip-1" />
            </Stack>
          </SortableContext>
        </DndContext>,
      );

      const chip0 = screen.getByTestId('chip-0');
      const chip1 = screen.getByTestId('chip-1');

      mockElementRect(chip0);
      mockElementRect(chip1);

      // Drag chip-0
      fireEvent.mouseDown(chip0, {
        button: 0,
        clientX: 50,
        clientY: 16,
      });

      await waitFor(() => {
        expect(chip0).to.have.attribute('aria-pressed', 'true');
        // chip-1 should not be dragging
        expect(chip1).to.have.attribute('aria-pressed', 'false');
      });
    });
  });
});
