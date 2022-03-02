import { OverridableComponent, OverridableTypeMap } from '@mui/types';
import { ExtendBadgeUnstyledTypeMap, BadgeUnstyledTypeMap } from './BadgeUnstyledProps';

export type ExtendBadgeUnstyled<M extends OverridableTypeMap> = OverridableComponent<
  ExtendBadgeUnstyledTypeMap<M>
>;

/**
 *
 * Demos:
 *
 * - [Badges](https://mui.com/components/badges/)
 *
 * API:
 *
 * - [BadgeUnstyled API](https://mui.com/api/badge-unstyled/)
 */
declare const BadgeUnstyled: OverridableComponent<BadgeUnstyledTypeMap>;

export default BadgeUnstyled;
