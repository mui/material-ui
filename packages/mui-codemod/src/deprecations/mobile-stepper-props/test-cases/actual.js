import MobileStepper from '@mui/material-v7/MobileStepper';
import { MobileStepper as MyMobileStepper } from '@mui/material-v7';

<MobileStepper variant="progress" LinearProgressProps={{ variant: 'determinate' }} />;
<MyMobileStepper
  variant="progress"
  LinearProgressProps={{ variant: 'determinate' }}
  slotProps={{
    progress: {
      sx: { width: '100%' },
    },
  }}
/>;

<CustomMobileStepper LinearProgressProps={{ variant: 'determinate' }} />;
