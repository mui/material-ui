import * as React from 'react';
import Divider from '@mui/material/Divider';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { DashboardSidebarContext } from '../../../context';
import { getDrawerSxTransitionMixin } from '../../../mixins';

export default function DashboardSidebarDividerItem() {
  const sidebarContext = React.useContext(DashboardSidebarContext);
  if (!sidebarContext) {
    throw new Error('Sidebar context was used without a provider.');
  }
  const { fullyExpanded = true, hasDrawerTransitions } = sidebarContext;

  return (
    <li>
      <Divider
        sx={{
          borderBottomWidth: 2,
          m: 1,
          ...(hasDrawerTransitions
            ? getDrawerSxTransitionMixin(fullyExpanded, 'margin')
            : {}),
        }}
      />
    </li>
  );
}
