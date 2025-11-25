export interface DraggableTableRowClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied when the row is being dragged. */
  dragging: string;
  /** Styles applied when drag is disabled. */
  disabled: string;
}

const draggableTableRowClasses: DraggableTableRowClasses = {
  root: 'MuiDraggableTableRow-root',
  dragging: 'MuiDraggableTableRow-dragging',
  disabled: 'MuiDraggableTableRow-disabled',
};

export default draggableTableRowClasses;
