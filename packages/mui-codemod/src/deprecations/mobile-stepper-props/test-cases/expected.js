import MobileStepper from '@mui/material-v7/MobileStepper';
import { MobileStepper as MyMobileStepper } from '@mui/material-v7';

<MobileStepper variant="progress" slotProps={{
  progress: { variant: 'determinate' }
}} />;
<MyMobileStepper
  variant="progress"
  slotProps={{
    progress: {
      ...{ variant: 'determinate' },

      ...{
        sx: { width: '100%' },
      }
    },
  }} />;

<CustomMobileStepper LinearProgressProps={{ variant: 'determinate' }} />;
