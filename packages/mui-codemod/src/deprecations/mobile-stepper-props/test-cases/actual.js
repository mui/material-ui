import MobileStepper from '@mui/material/MobileStepper';
import { MobileStepper as MyMobileStepper } from '@mui/material';

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
