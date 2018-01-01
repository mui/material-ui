import * as React from 'react';

export interface PortalProps {
  children: React.ReactElement<any>;
  container?: React.ReactInstance | (() => React.ReactInstance);
  onRendered?: () => any;
}

export default class Portal extends React.Component<PortalProps> {}
