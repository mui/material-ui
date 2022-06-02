import * as React from 'react';
import Slider from '@mui/joy/Slider';

<Slider />;

<Slider component="div" />;

<Slider data-testid="any" />;

// common HTML attributes
<Slider onDrop={() => {}} />;

<Slider defaultValue={30} />;

<Slider color="primary" />;
<Slider color="danger" />;
<Slider color="info" />;
<Slider color="success" />;
<Slider color="warning" />;
<Slider color="neutral" />;

<Slider size="sm" />;
<Slider size="md" />;
<Slider size="lg" />;

<Slider
  sx={{
    '--joy-Slider-track-radius': '8px',
    '--joy-Slider-track-width': '48px',
    '--joy-Slider-track-height': '24px',
    '--joy-Slider-thumb-size': '16px',
  }}
/>;
