import type * as React from 'react';
import type { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';

export interface PreviewCardTriggerProps<Payload = unknown>
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'color'>,
    Pick<BasePreviewCard.Trigger.Props<Payload>, 'closeDelay' | 'delay' | 'payload'> {
  /**
   * @ignore
   */
  children?: React.ReactNode | undefined;
  /**
   * A handle that connects the trigger with a `PreviewCard` rendered elsewhere.
   * Create one with `createPreviewCardHandle()`.
   */
  handle?: BasePreviewCard.Trigger.Props<Payload>['handle'] | undefined;
  /**
   * The id of the trigger. Pass it to `triggerId` on `PreviewCard` to open the card from this trigger.
   */
  id?: string | undefined;
  /**
   * The element that opens the preview card, usually a link.
   * Accepts an element or a function that receives the props and the Base UI state.
   */
  render: NonNullable<BasePreviewCard.Trigger.Props['render']>;
}
