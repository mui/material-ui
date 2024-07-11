import isHostComponent from './isHostComponent';

const shouldSpreadAdditionalProps = (Slot) => {
  return !Slot || !isHostComponent(Slot);
};

export default shouldSpreadAdditionalProps;
