import MobileStepper from '@org/ui/material/MobileStepper';
import { MobileStepper as MyMobileStepper } from '@org/ui/material';

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
