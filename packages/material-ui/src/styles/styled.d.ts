import * as React from 'react';
import { ComponentCreator } from './legacy_styled';

// @deprecated Follow the upgrade guide on http://next.material-ui.com/guides/migration-v4/#theme
export default function styled<Component extends React.ElementType>(
  Component: Component
): ComponentCreator<Component>;
