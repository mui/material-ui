export interface DraggableGridItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied when the item is being dragged. */
  dragging: string;
  /** Styles applied when drag is disabled. */
  disabled: string;
}

const draggableGridItemClasses: DraggableGridItemClasses = {
  root: 'MuiDraggableGridItem-root',
  dragging: 'MuiDraggableGridItem-dragging',
  disabled: 'MuiDraggableGridItem-disabled',
};

export default draggableGridItemClasses;
