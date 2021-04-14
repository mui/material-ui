import * as React from 'react';
import { expect } from 'chai';
import TextField from '@material-ui/core/TextField';
import DatePicker from '@material-ui/lab/DatePicker';
import { createPickerRender } from '../internal/pickers/test-utils';

describe('<DatePicker />', () => {
  const render = createPickerRender();

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
