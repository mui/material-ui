import * as React from 'react';

export interface PortalProps {
  children: React.ReactElement<any>;
  container?: object | (() => Element);
  onRendered?: () => any;
}

export default class Portal extends React.Component<PortalProps> {}
