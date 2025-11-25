export interface DraggableChipClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied when the chip is being dragged. */
  dragging: string;
  /** Styles applied when drag is disabled. */
  disabled: string;
  /** Styles applied to the outlined variant. */
  outlined: string;
  /** Styles applied to the filled variant. */
  filled: string;
}

const draggableChipClasses: DraggableChipClasses = {
  root: 'MuiDraggableChip-root',
  dragging: 'MuiDraggableChip-dragging',
  disabled: 'MuiDraggableChip-disabled',
  outlined: 'MuiDraggableChip-outlined',
  filled: 'MuiDraggableChip-filled',
};

export default draggableChipClasses;
