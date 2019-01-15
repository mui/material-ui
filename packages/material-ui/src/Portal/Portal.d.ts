import * as React from 'react';
import { PortalProps } from '../Portal';

export interface PortalProps {
  children: React.ReactElement<any>;
  container?: React.ReactInstance | (() => React.ReactInstance) | null;
  disablePortal?: boolean;
  onRendered?: () => void;
}

export default class Portal extends React.Component<PortalProps> {}
