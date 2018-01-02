import * as React from 'react';

export interface PortalProps {
  children: React.ReactElement<any>;
  container?: React.ReactInstance | (() => React.ReactInstance);
  onRendered?: () => void;
}

export default class Portal extends React.Component<PortalProps> {}
