import * as React from 'react';
import { expect } from 'chai';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import { createPickerRenderer } from '../internal/pickers/test-utils';

describe('<DatePicker />', () => {
  const { render } = createPickerRenderer();

  describe('prop: inputRef', () => {
    it('should forward ref to the text box', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(
        <DatePicker
          inputRef={inputRef}
          value={null}
          onChange={() => {}}
          renderInput={(params) => <TextField id="test-focusing-picker" {...params} />}
        />,
      );

      expect(inputRef.current).to.have.tagName('input');
    });
  });
});
