import * as React from 'react';
import Radio from '@mui/joy/Radio';

<Radio id="test" name="test" />;

<Radio component="div" />;

<Radio data-testid="any" />;

<Radio defaultChecked />;

<Radio checked />;

<Radio
  onChange={(event) => {
    const checked = event.target.checked;
  }}
/>;

<Radio color="primary" />;
<Radio color="danger" />;
<Radio color="info" />;
<Radio color="success" />;
<Radio color="warning" />;
<Radio color="neutral" />;

<Radio variant="outlined" />;
<Radio variant="soft" />;
<Radio variant="solid" />;

<Radio size="sm" />;
<Radio size="md" />;
<Radio size="lg" />;
