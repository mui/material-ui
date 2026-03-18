import * as React from 'react';
import MuiProductSelectorBase from '@mui/docs/AppLayoutDocs/MuiProductSelector';
import type { MenuListProps } from '@mui/material/MenuList';
import ROUTES from 'docs/src/route';

const MuiProductSelector = React.forwardRef(function MuiProductSelector(
  props: MenuListProps<'div'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return <MuiProductSelectorBase {...props} ref={ref} routes={ROUTES} />;
});

export default MuiProductSelector;
