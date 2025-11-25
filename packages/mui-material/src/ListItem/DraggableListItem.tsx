'use client';
import * as React from 'react';
import { styled } from '../styles';
import ListItem from '../ListItem';
import { useSortable } from '../useSortable';
import { getTransformStyle } from '../DndContext/transform';
import type { UniqueIdentifier } from '../DndContext/DndContextTypes';
import type { ListItemProps } from '../ListItem';

export interface DraggableListItemOwnProps {
  id: UniqueIdentifier;
  data?: Record<string, unknown>;
  dragDisabled?: boolean;
  transition?: { duration?: number; easing?: string };
}

export interface DraggableListItemProps
  extends Omit<ListItemProps, 'ref'>,
    DraggableListItemOwnProps {}

const DraggableListItemRoot = styled(ListItem, {
  name: 'MuiDraggableListItem',
  slot: 'Root',
})(({ theme, ownerState }) => ({
  cursor: ownerState.dragDisabled ? 'default' : 'grab',
  userSelect: 'none',
  touchAction: 'none',
  ...(ownerState.isDragging && {
    cursor: 'grabbing',
    opacity: 0.5,
    boxShadow: theme.shadows[4],
    zIndex: theme.zIndex.modal,
  }),
}));

export const DraggableListItem = React.forwardRef<HTMLLIElement, DraggableListItemProps>(
  function DraggableListItem(props, ref) {
    const {
      id,
      data,
      dragDisabled = false,
      transition: transitionConfig,
      children,
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

    const ownerState = { ...props, isDragging, isSorting, dragDisabled };

    const style: React.CSSProperties = {
      transform: transform ? getTransformStyle(transform.x, transform.y) : undefined,
      transition,
    };

    return (
      <DraggableListItemRoot
        ref={(node) => {
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
        {children}
      </DraggableListItemRoot>
    );
  }
);

export default DraggableListItem;
