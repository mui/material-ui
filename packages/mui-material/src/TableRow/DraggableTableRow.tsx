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

/**
 * Metadata captured for each cell during drag to preserve layout.
 */
interface CellMetadata {
  width: number;
  colSpan: number;
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
 * It maintains cell widths and colSpan during drag operations to prevent layout collapse.
 *
 * ## Supported Features
 * - Preserves cell widths during drag
 * - Handles cells with colSpan correctly
 * - Works with fixed-width and auto-width tables
 *
 * ## Known Limitations (Edge Cases Not Yet Addressed)
 * - **rowSpan**: Cells with rowSpan that extend from a previous row into this row
 *   may cause incorrect width mapping, as the DOM cell count differs from React
 *   children count in that scenario.
 * - **Nested tables**: If a TableCell contains a nested table, the inner table's
 *   cells will be incorrectly targeted by the width capture logic.
 * - **Scrollable containers**: Auto-scroll during drag when the table is inside
 *   a scrollable container is not implemented.
 * - **Sticky headers**: Visual z-index conflicts may occur when dragging rows
 *   near sticky table headers.
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
 *
 * @example
 * ```tsx
 * // With colSpan - widths are preserved correctly
 * <DraggableTableRow id="row-1">
 *   <TableCell colSpan={2}>Spanning cell</TableCell>
 *   <TableCell>Normal cell</TableCell>
 * </DraggableTableRow>
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

    const cellMetadataRef = React.useRef<CellMetadata[]>([]);
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

    // Capture cell widths and colSpan on drag start to prevent layout collapse.
    // We query only direct children (> td, > th) to avoid capturing cells from
    // nested tables. This preserves correct width mapping for cells with colSpan.
    React.useEffect(() => {
      if (isDragging && rowRef.current) {
        const cells = rowRef.current.querySelectorAll(':scope > td, :scope > th');
        cellMetadataRef.current = Array.from(cells).map((cell) => ({
          width: cell.getBoundingClientRect().width,
          colSpan: (cell as HTMLTableCellElement).colSpan || 1,
        }));
      }
    }, [isDragging]);

    // Clone children and apply widths during drag to maintain cell structure.
    // Also preserves colSpan to ensure spanning cells render correctly.
    const processedChildren = React.Children.map(children, (child, index) => {
      if (!isDragging || !React.isValidElement(child)) {
        return child;
      }
      const metadata = cellMetadataRef.current[index];
      if (!metadata) {
        return child;
      }

      // Type for props we're cloning with
      type CellProps = {
        style?: React.CSSProperties;
        colSpan?: number;
      };

      const childProps = child.props as CellProps;

      return React.cloneElement(child as React.ReactElement<CellProps>, {
        style: {
          ...childProps.style,
          width: metadata.width,
          minWidth: metadata.width,
          maxWidth: metadata.width,
        },
        // Preserve colSpan - use the captured value to ensure consistency
        colSpan: metadata.colSpan > 1 ? metadata.colSpan : childProps.colSpan,
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
