import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceStorage = (props) => (
  <SvgIcon {...props}>
    <path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/>
  </SvgIcon>
);
DeviceStorage = pure(DeviceStorage);
DeviceStorage.displayName = 'DeviceStorage';

export default DeviceStorage;
