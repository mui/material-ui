import type { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';

export interface PreviewCardProps<Payload = unknown> extends Pick<
  BasePreviewCard.Root.Props<Payload>,
  | 'children'
  | 'defaultOpen'
  | 'defaultTriggerId'
  | 'onOpenChange'
  | 'onOpenChangeComplete'
  | 'open'
  | 'triggerId'
> {
  /**
   * A ref to imperative actions.
   * - `unmount`: Ends the closing phase of the preview card after an externally controlled closing animation finishes.
   * Call `preventUnmountOnClose()` in `onOpenChange` first, otherwise the preview card completes closing on its own.
   * Whether it leaves the DOM is decided by `keepMounted` on `PreviewCardPopup`.
   * - `close`: Closes the preview card imperatively when called.
   */
  actionsRef?: BasePreviewCard.Root.Props<Payload>['actionsRef'] | undefined;
  /**
   * A handle that connects the preview card with triggers rendered outside of it.
   * Create one with `createPreviewCardHandle()`.
   */
  handle?: BasePreviewCard.Root.Props<Payload>['handle'] | undefined;
}
