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

<Radio palette="primary" />;
<Radio palette="danger" />;
<Radio palette="info" />;
<Radio palette="success" />;
<Radio palette="warning" />;
<Radio palette="neutral" />;

<Radio variant="outlined" />;
<Radio variant="light" />;
<Radio variant="contained" />;

<Radio size="sm" />;
<Radio size="md" />;
<Radio size="lg" />;
