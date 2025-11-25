import type { Active, Over, AnnouncementCallbacks } from './DndContextTypes';

/**
 * Default screen reader announcements for drag and drop operations.
 */
export const defaultAnnouncements: Required<AnnouncementCallbacks> = {
  onDragStart: (active: Active) => `Picked up draggable item ${active.id}.`,

  onDragOver: (active: Active, over: Over) =>
    `Draggable item ${active.id} is over droppable area ${over.id}.`,

  onDragEnd: (active: Active, over: Over | null) => {
    if (over) {
      return `Draggable item ${active.id} was dropped over droppable area ${over.id}.`;
    }
    return `Draggable item ${active.id} was dropped.`;
  },

  onDragCancel: (active: Active) => `Dragging of item ${active.id} was cancelled.`,
};

/**
 * Default screen reader instructions shown when a draggable is focused.
 */
export const defaultScreenReaderInstructions =
  'To pick up a draggable item, press space or enter. ' +
  'While dragging, use the arrow keys to move the item. ' +
  'Press space or enter again to drop the item in its new position, ' +
  'or press escape to cancel.';

/**
 * Get the announcement text for a drag event.
 */
export function getAnnouncement(
  type: keyof AnnouncementCallbacks,
  active: Active,
  over: Over | null,
  customAnnouncements?: AnnouncementCallbacks,
): string {
  const announcements = { ...defaultAnnouncements, ...customAnnouncements };

  switch (type) {
    case 'onDragStart':
      return announcements.onDragStart!(active);
    case 'onDragOver':
      if (over) {
        return announcements.onDragOver!(active, over);
      }
      return '';
    case 'onDragEnd':
      return announcements.onDragEnd!(active, over);
    case 'onDragCancel':
      return announcements.onDragCancel!(active);
    default:
      return '';
  }
}
