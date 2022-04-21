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

<Checkbox palette="primary" />;
<Checkbox palette="danger" />;
<Checkbox palette="info" />;
<Checkbox palette="success" />;
<Checkbox palette="warning" />;
<Checkbox palette="neutral" />;

<Checkbox variant="outlined" />;
<Checkbox variant="light" />;
<Checkbox variant="contained" />;

<Checkbox size="sm" />;
<Checkbox size="md" />;
<Checkbox size="lg" />;
