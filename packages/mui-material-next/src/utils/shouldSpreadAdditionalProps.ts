import { isHostComponent } from '@mui/base';

const shouldSpreadAdditionalProps = (Slot: any) => {
  return !Slot || !isHostComponent(Slot);
};

export default shouldSpreadAdditionalProps;
