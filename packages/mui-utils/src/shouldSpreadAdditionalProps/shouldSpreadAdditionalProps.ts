import * as React from 'react';
import isHostComponent from '../isHostComponent';

const shouldSpreadAdditionalProps = (Slot: React.ElementType) => {
  return !Slot || !isHostComponent(Slot);
};

export default shouldSpreadAdditionalProps;
