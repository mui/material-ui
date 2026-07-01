/* eslint-disable @typescript-eslint/naming-convention, import/prefer-default-export */
/**
 * PaginationItem density token identities — the item box size (min-width/height,
 * 32/26/40 per size) shared by the page button and the ellipsis, over
 * `--comp-size` (raw px per preset). Inline padding + inter-item margin stay
 * literal (secondary). `private_*` per the density RFC.
 */
export const private_paginationItemVars = {
  smallSize: '--PaginationItem-small-size',
  mediumSize: '--PaginationItem-medium-size',
  largeSize: '--PaginationItem-large-size',
} as const;
