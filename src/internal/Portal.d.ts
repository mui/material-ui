import * as React from 'react';

export interface PortalProps {
  document?: HTMLDocument;
  open?: boolean;
}

export default class Portal extends React.Component<PortalProps> {}
