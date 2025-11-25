'use client';
import * as React from 'react';
import { styled } from '../styles';
import Chip from '../Chip';
import { useSortable } from '../useSortable';
import { getTransformStyle } from '../DndContext/transform';
import type { UniqueIdentifier } from '../DndContext/DndContextTypes';
import type { ChipProps } from '../Chip';

export interface DraggableChipOwnProps {
  /**
   * Unique identifier for this draggable chip.
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
   * Note: This is separate from Chip's `disabled` prop which affects styling.
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

export interface DraggableChipProps
  extends Omit<ChipProps, 'ref'>,
    DraggableChipOwnProps {}

interface DraggableChipOwnerState extends DraggableChipOwnProps {
  isDragging: boolean;
  isSorting: boolean;
  disabled?: boolean;
  variant?: 'filled' | 'outlined';
}

const DraggableChipRoot = styled(Chip, {
  name: 'MuiDraggableChip',
  slot: 'Root',
})<{ ownerState: DraggableChipOwnerState }>(({ theme, ownerState }) => ({
  cursor: ownerState.dragDisabled || ownerState.disabled ? 'default' : 'grab',
  userSelect: 'none',
  touchAction: 'none',
  ...(ownerState.isDragging && {
    cursor: 'grabbing',
    opacity: 0.7,
    boxShadow: theme.shadows[2],
    zIndex: theme.zIndex.tooltip,
  }),
}));

/**
 * DraggableChip is a wrapper around Chip that adds drag-and-drop functionality
 * for tag management and horizontal reordering use cases.
 *
 * Typically used with `strategy="horizontal"` in SortableContext for horizontal
 * tag lists, but also works with vertical layouts.
 *
 * @example
 * ```tsx
 * <DndContext onDragEnd={handleDragEnd}>
 *   <SortableContext items={tags.map(t => t.id)} strategy="horizontal">
 *     <Stack direction="row" spacing={1} flexWrap="wrap">
 *       {tags.map((tag) => (
 *         <DraggableChip
 *           key={tag.id}
 *           id={tag.id}
 *           label={tag.name}
 *           color={tag.color}
 *           variant="outlined"
 *           onDelete={() => handleDelete(tag.id)}
 *         />
 *       ))}
 *     </Stack>
 *   </SortableContext>
 * </DndContext>
 * ```
 */
export const DraggableChip = React.forwardRef<HTMLDivElement, DraggableChipProps>(
  function DraggableChip(props, ref) {
    const {
      id,
      data,
      dragDisabled = false,
      transition: transitionConfig,
      disabled,
      variant,
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
      disabled: dragDisabled || disabled,
      transition: transitionConfig,
    });

    const ownerState: DraggableChipOwnerState = {
      id,
      data,
      dragDisabled,
      transition: transitionConfig,
      isDragging,
      isSorting,
      disabled,
      variant,
    };

    const style: React.CSSProperties = {
      transform: transform ? getTransformStyle(transform.x, transform.y) : undefined,
      transition,
    };

    return (
      <DraggableChipRoot
        ref={(node) => {
          setNodeRef(node);
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        ownerState={ownerState}
        disabled={disabled}
        variant={variant}
        sx={[style, ...(Array.isArray(sx) ? sx : [sx])]}
        {...attributes}
        {...(dragDisabled || disabled ? {} : listeners)}
        {...other}
      />
    );
  },
);

export default DraggableChip;
