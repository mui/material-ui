import * as React from 'react';
import AppNavDrawerBase from '@mui/docs/AppLayoutDocs/AppNavDrawer';
import type { AppNavDrawerProps } from '@mui/docs/AppLayoutDocs/AppNavDrawer';
import ROUTES from 'docs/src/route';

export type { AppNavDrawerProps };

export default function AppNavDrawer(props: AppNavDrawerProps) {
  return <AppNavDrawerBase {...props} routes={ROUTES} />;
}
