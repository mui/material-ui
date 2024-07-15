import isHostComponent from '@mui/utils/isHostComponent';

const shouldSpreadAdditionalProps = (Slot) => {
  return !Slot || !isHostComponent(Slot);
};

export default shouldSpreadAdditionalProps;
