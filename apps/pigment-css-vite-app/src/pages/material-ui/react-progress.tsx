import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MaterialUILayout from '../../Layout';
import CircularColor from '../../../../../docs/data/material/components/progress/CircularColor';
import CircularDeterminate from '../../../../../docs/data/material/components/progress/CircularDeterminate';
import CircularIndeterminate from '../../../../../docs/data/material/components/progress/CircularIndeterminate';
import CircularIntegration from '../../../../../docs/data/material/components/progress/CircularIntegration';
import CircularUnderLoad from '../../../../../docs/data/material/components/progress/CircularUnderLoad';
import CircularWithValueLabel from '../../../../../docs/data/material/components/progress/CircularWithValueLabel';
import CustomizedProgressBars from '../../../../../docs/data/material/components/progress/CustomizedProgressBars';
import DelayingAppearance from '../../../../../docs/data/material/components/progress/DelayingAppearance';
import LinearColor from '../../../../../docs/data/material/components/progress/LinearColor';
import LinearIndeterminate from '../../../../../docs/data/material/components/progress/LinearIndeterminate';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Progress() {
  return (
    <MaterialUILayout>
      <h1>Progress</h1>
      <section>
        <h2> Circular Color</h2>
        <div className="demo-container">
          <CircularColor />
        </div>
      </section>
      <section>
        <h2> Circular Determinate</h2>
        <div className="demo-container">
          <CircularDeterminate />
        </div>
      </section>
      <section>
        <h2> Circular Indeterminate</h2>
        <div className="demo-container">
          <CircularIndeterminate />
        </div>
      </section>
      <section>
        <h2> Circular Integration</h2>
        <div className="demo-container">
          <CircularIntegration />
        </div>
      </section>
      <section>
        <h2> Circular Under Load</h2>
        <div className="demo-container">
          <CircularUnderLoad />
        </div>
      </section>
      <section>
        <h2> Circular With Value Label</h2>
        <div className="demo-container">
          <CircularWithValueLabel />
        </div>
      </section>
      <section>
        <h2> Customized Progress Bars</h2>
        <div className="demo-container">
          <CustomizedProgressBars />
        </div>
      </section>
      <section>
        <h2> Delaying Appearance</h2>
        <div className="demo-container">
          <DelayingAppearance />
        </div>
      </section>
      <section>
        <h2> Linear Buffer</h2>
        <div className="demo-container">
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="buffer" value={10} valueBuffer={30} />
          </Box>
        </div>
      </section>
      <section>
        <h2> Linear Color</h2>
        <div className="demo-container">
          <LinearColor />
        </div>
      </section>
      <section>
        <h2> Linear Determinate</h2>
        <div className="demo-container">
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={10} />
          </Box>
        </div>
      </section>
      <section>
        <h2> Linear Indeterminate</h2>
        <div className="demo-container">
          <LinearIndeterminate />
        </div>
      </section>
      <section>
        <h2> Linear With Value Label</h2>
        <div className="demo-container">
          <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={10} />
          </Box>
        </div>
      </section>
    </MaterialUILayout>
  );
}
