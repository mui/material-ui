import * as React from 'react';
import Switch from '@mui/joy/Switch';

<Switch />;

<Switch component="div" />;

<Switch data-testid="any" />;

// common HTML attributes
<Switch onDrop={() => {}} />;

<Switch defaultChecked />;

<Switch checked />;

<Switch
  onChange={(event) => {
    const checked = event.target.checked;
  }}
/>;

<Switch color="primary" />;
<Switch color="danger" />;
<Switch color="info" />;
<Switch color="success" />;
<Switch color="warning" />;
<Switch color="neutral" />;

<Switch variant="outlined" />;
<Switch variant="soft" />;
<Switch variant="solid" />;

<Switch size="sm" />;
<Switch size="md" />;
<Switch size="lg" />;

<Switch
  sx={{
    '--joy-Switch-track-radius': '8px',
    '--joy-Switch-track-width': '48px',
    '--joy-Switch-track-height': '24px',
    '--joy-Switch-thumb-size': '16px',
  }}
/>;
