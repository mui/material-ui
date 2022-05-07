import { OverridableComponent, OverridableTypeMap } from '@mui/types';
import { ExtendBadgeUnstyledTypeMap, BadgeUnstyledTypeMap } from './BadgeUnstyledProps';

export type ExtendBadgeUnstyled<M extends OverridableTypeMap> = OverridableComponent<
  ExtendBadgeUnstyledTypeMap<M>
>;

/**
 *
 * Demos:
 *
 * - [Badge](https://mui.com/base/react-badge/)
 *
 * API:
 *
 * - [BadgeUnstyled API](https://mui.com/base/api/badge-unstyled/)
 */
declare const BadgeUnstyled: OverridableComponent<BadgeUnstyledTypeMap>;

export default BadgeUnstyled;
