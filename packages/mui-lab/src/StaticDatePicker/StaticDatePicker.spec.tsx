import * as React from 'react';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

{
  // Allows to pass the wrapper-specific props only to the proper wrapper
  <StaticDatePicker
    value={new Date()}
    onChange={(date) => date?.getDate()}
    renderInput={() => <input />}
    displayStaticWrapperAs="desktop"
  />;
}
