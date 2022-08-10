import * as React from 'react';
import StepIcon from '@mui/material/StepIcon';
import GlobalStyles from '@mui/material/GlobalStyles';

export default function BiggerStepIconREM() {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          html: { fontSize: '24px' },
        }}
      />
      <StepIcon completed icon={1} />
      <StepIcon icon={2} />
    </React.Fragment>
  );
}
