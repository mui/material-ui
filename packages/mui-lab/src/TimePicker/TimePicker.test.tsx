/* eslint-disable material-ui/mui-name-matches-component-name */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { createClientRender, describeConformance } from 'test/utils';
import { expect } from 'chai';
import TimePicker from './TimePicker';
import { wrapPickerMount } from '../internal/pickers/test-utils';
import { useTimePickerDefaultizedProps } from './shared';
import { DesktopTimePickerProps, LocalizationProvider } from '..';
import AdapterDateFns from '../AdapterDateFns';

describe('<TimePicker />', () => {
  const render = createClientRender();
  describeConformance(
    <TimePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={null}
    />,
    () => ({
      classes: {},
      muiName: 'MuiTimePicker',
      wrapMount: wrapPickerMount,
      refInstanceof: window.HTMLDivElement,
      skip: [
        'componentProp',
        'componentsProp',
        'themeDefaultProps',
        'themeStyleOverrides',
        'themeVariants',
        'mergeClassName',
        'propsSpread',
        'rootClass',
        'reactTestRenderer',
      ],
    }),
  );
});
