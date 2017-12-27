import * as React from 'react';

export interface PortalProps {
  children: React.ReactElement<any>;
  container?: object | Function;
  onRendered?: Function;
}

export default class Portal extends React.Component<PortalProps> {}
