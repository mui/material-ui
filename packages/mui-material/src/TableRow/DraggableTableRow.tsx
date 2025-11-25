'use client';
import * as React from 'react';
import { styled } from '../styles';
import TableRow from '../TableRow';
import { useSortable } from '../useSortable';
import { getTransformStyle } from '../DndContext/transform';
import type { UniqueIdentifier } from '../DndContext/DndContextTypes';
import type { TableRowProps } from '../TableRow';

export interface DraggableTableRowOwnProps {
  /**
   * Unique identifier for this draggable table row.
   * Used by DndContext for tracking.
   */
  id: UniqueIdentifier;
  /**
   * Optional data to attach to drag events.
   * Accessible in onDragStart, onDragEnd, etc.
   */
  data?: Record<string, unknown>;
  /**
   * If true, disables drag functionality.
   * The row renders normally but cannot be dragged.
   * @default false
   */
  dragDisabled?: boolean;
  /**
   * Transition configuration for smooth reordering animations.
   */
  transition?: {
    /**
     * Duration of the transition in milliseconds.
     * @default 200
     */
    duration?: number;
    /**
     * CSS easing function for the transition.
     * @default 'ease'
     */
    easing?: string;
  };
}

export interface DraggableTableRowProps
  extends Omit<TableRowProps, 'ref'>,
    DraggableTableRowOwnProps {}

interface DraggableTableRowOwnerState extends DraggableTableRowProps {
  isDragging: boolean;
  isSorting: boolean;
}

const DraggableTableRowRoot = styled(TableRow, {
  name: 'MuiDraggableTableRow',
  slot: 'Root',
})<{ ownerState: DraggableTableRowOwnerState }>(({ theme, ownerState }) => ({
  cursor: ownerState.dragDisabled ? 'default' : 'grab',
  touchAction: 'none',
  userSelect: 'none',
  ...(ownerState.isDragging && {
    cursor: 'grabbing',
    backgroundColor: theme.palette.action.selected,
    boxShadow: theme.shadows[2],
    // Keep row in document flow but position it with transform
    position: 'relative',
    zIndex: 1,
  }),
}));

/**
 * DraggableTableRow is a wrapper around TableRow that adds drag-and-drop functionality.
 * It maintains cell widths during drag operations to prevent layout collapse.
 *
 * @example
 * ```tsx
 * <DndContext onDragEnd={handleDragEnd}>
 *   <SortableContext items={rows.map(r => r.id)} strategy="vertical">
 *     <Table>
 *       <TableBody>
 *         {rows.map((row) => (
 *           <DraggableTableRow key={row.id} id={row.id}>
 *             <TableCell>{row.name}</TableCell>
 *             <TableCell>{row.status}</TableCell>
 *           </DraggableTableRow>
 *         ))}
 *       </TableBody>
 *     </Table>
 *   </SortableContext>
 * </DndContext>
 * ```
 */
export const DraggableTableRow = React.forwardRef<HTMLTableRowElement, DraggableTableRowProps>(
  function DraggableTableRow(props, ref) {
    const {
      id,
      data,
      dragDisabled = false,
      transition: transitionConfig,
      children,
      sx,
      ...other
    } = props;

    const cellWidthsRef = React.useRef<number[]>([]);
    const rowRef = React.useRef<HTMLTableRowElement | null>(null);

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
      isSorting,
    } = useSortable({
      id,
      data,
      disabled: dragDisabled,
      transition: transitionConfig,
    });

    // Capture cell widths on drag start to prevent layout collapse
    React.useEffect(() => {
      if (isDragging && rowRef.current) {
        const cells = rowRef.current.querySelectorAll('td, th');
        cellWidthsRef.current = Array.from(cells).map(
          (cell) => cell.getBoundingClientRect().width,
        );
      }
    }, [isDragging]);

    // Clone children and apply widths during drag to maintain cell structure
    const processedChildren = React.Children.map(children, (child, index) => {
      if (!isDragging || !React.isValidElement(child)) {
        return child;
      }
      const width = cellWidthsRef.current[index];
      if (width === undefined) {
        return child;
      }
      return React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
        style: {
          ...(child.props as { style?: React.CSSProperties }).style,
          width,
          minWidth: width,
          maxWidth: width,
        },
      });
    });

    const ownerState: DraggableTableRowOwnerState = {
      ...props,
      isDragging,
      isSorting,
    };

    const style: React.CSSProperties = {
      transform: transform ? getTransformStyle(transform.x, transform.y) : undefined,
      transition,
    };

    return (
      <DraggableTableRowRoot
        ref={(node) => {
          rowRef.current = node;
          setNodeRef(node);
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        ownerState={ownerState}
        sx={[style, ...(Array.isArray(sx) ? sx : [sx])]}
        {...attributes}
        {...(dragDisabled ? {} : listeners)}
        {...other}
      >
        {processedChildren}
      </DraggableTableRowRoot>
    );
  },
);

export default DraggableTableRow;
