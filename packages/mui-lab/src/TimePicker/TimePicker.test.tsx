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

  describe('shared functions', () => {
    describe('prop: mask', () => {
      const ChildComponent = ({ mask, ampm }: { mask?: string; ampm?: boolean }) => {
        const { mask: outputMask } = useTimePickerDefaultizedProps(
          { mask, ampm } as DesktopTimePickerProps<unknown>,
          'MuiDesktopTimePicker',
        );

        return <div id="mask">{outputMask}</div>;
      };

      const TestComponent = ({ mask, ampm }: { mask?: string; ampm?: boolean }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ChildComponent mask={mask} ampm={ampm} />
        </LocalizationProvider>
      );
      it('uses the mask prop if passed', () => {
        const inputMask = '__:__ _M';
        const { container } = render(<TestComponent mask={inputMask} />);

        const mask = container.querySelector('#mask')?.textContent;
        expect(mask).to.equal(inputMask.toLowerCase());
      });

      it('defaults to an ampm mask if no mask prop is passed and ampm is passed as true', () => {
        const { container } = render(<TestComponent ampm />);

        const mask = container.querySelector('#mask')?.textContent;
        expect(mask).to.equal('__:__ _m');
      });

      it('defaults to a 24 hour mask if no mask prop is passed and ampm is passed as false', () => {
        const { container } = render(<TestComponent ampm={false} />);

        const mask = container.querySelector('#mask')?.textContent;
        expect(mask).to.equal('__:__');
      });
    });
  });
});
