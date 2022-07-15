import * as React from 'react';
import Checkbox from '@mui/joy/Checkbox';

<Checkbox id="test" name="test" />;

<Checkbox component="div" />;

<Checkbox data-testid="any" />;

<Checkbox defaultChecked />;

<Checkbox checked />;

<Checkbox indeterminate />;

<Checkbox
  onChange={(event) => {
    const checked = event.target.checked;
  }}
/>;

<Checkbox color="primary" />;
<Checkbox color="danger" />;
<Checkbox color="info" />;
<Checkbox color="success" />;
<Checkbox color="warning" />;
<Checkbox color="neutral" />;

<Checkbox variant="outlined" />;
<Checkbox variant="soft" />;
<Checkbox variant="solid" />;

<Checkbox size="sm" />;
<Checkbox size="md" />;
<Checkbox size="lg" />;
