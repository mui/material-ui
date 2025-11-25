'use client';
import * as React from 'react';
import { styled } from '../styles';
import Grid from '../Grid';
import { useSortable } from '../useSortable';
import { getTransformStyle } from '../DndContext/transform';
import type { UniqueIdentifier } from '../DndContext/DndContextTypes';
import type { GridProps } from '../Grid';

export interface DraggableGridItemOwnProps {
  /**
   * Unique identifier for this draggable grid item.
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
   * The item renders normally but cannot be dragged.
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

// Exclude 'container' since DraggableGridItem is always an item, not a container
export interface DraggableGridItemProps
  extends Omit<GridProps, 'container' | 'ref'>,
    DraggableGridItemOwnProps {}

interface DraggableGridItemOwnerState extends DraggableGridItemOwnProps {
  isDragging: boolean;
  isSorting: boolean;
  dragDisabled: boolean;
}

const DraggableGridItemRoot = styled(Grid, {
  name: 'MuiDraggableGridItem',
  slot: 'Root',
})<{ ownerState: DraggableGridItemOwnerState }>(({ theme, ownerState }) => ({
  cursor: ownerState.dragDisabled ? 'default' : 'grab',
  userSelect: 'none',
  touchAction: 'none',
  ...(ownerState.isDragging && {
    cursor: 'grabbing',
    opacity: 0.7,
    boxShadow: theme.shadows[8],
    zIndex: theme.zIndex.modal,
    // Scale slightly to indicate active drag
    '& > *': {
      transform: 'scale(1.02)',
    },
  }),
}));

/**
 * DraggableGridItem is a wrapper around Grid that adds drag-and-drop functionality
 * for dashboard-style layouts with 2D reordering.
 *
 * When using with SortableContext, use `strategy="grid"` with `columns` prop for
 * proper 2D sorting behavior. If using `strategy="vertical"`, items will only
 * reorder vertically.
 *
 * @example
 * ```tsx
 * <DndContext onDragEnd={handleDragEnd}>
 *   <SortableContext items={cards.map(c => c.id)} strategy="grid" columns={3}>
 *     <Grid container spacing={2}>
 *       {cards.map((card) => (
 *         <DraggableGridItem key={card.id} id={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
 *           <Card>
 *             <CardContent>
 *               <Typography>{card.title}</Typography>
 *             </CardContent>
 *           </Card>
 *         </DraggableGridItem>
 *       ))}
 *     </Grid>
 *   </SortableContext>
 * </DndContext>
 * ```
 */
export const DraggableGridItem = React.forwardRef<HTMLDivElement, DraggableGridItemProps>(
  function DraggableGridItem(props, ref) {
    const {
      id,
      data,
      dragDisabled = false,
      transition: transitionConfig,
      children,
      size,
      sx,
      ...other
    } = props;

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

    const ownerState: DraggableGridItemOwnerState = {
      id,
      data,
      dragDisabled,
      transition: transitionConfig,
      isDragging,
      isSorting,
    };

    const style: React.CSSProperties = {
      transform: transform ? getTransformStyle(transform.x, transform.y) : undefined,
      transition,
    };

    return (
      <DraggableGridItemRoot
        ref={(node) => {
          setNodeRef(node);
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        ownerState={ownerState}
        size={size}
        sx={[style, ...(Array.isArray(sx) ? sx : [sx])]}
        {...attributes}
        {...(dragDisabled ? {} : listeners)}
        {...other}
      >
        {children}
      </DraggableGridItemRoot>
    );
  },
);

export default DraggableGridItem;
