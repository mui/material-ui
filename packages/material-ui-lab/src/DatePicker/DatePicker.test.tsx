import * as React from 'react';
import { expect } from 'chai';
import TextField from '@material-ui/core/TextField';
import { fireEvent, screen } from 'test/utils';
import DatePicker from '@material-ui/lab/DatePicker';
import { createPickerRender } from '../internal/pickers/test-utils';

describe('<DatePicker />', () => {
  const render = createPickerRender({ strict: false });

  it('ref - should forwardRef to text field', () => {
    const Component = () => {
      const ref = React.useRef<HTMLInputElement>(null);
      const focusPicker = () => {
        if (ref.current) {
          ref.current.focus();
          expect(ref.current.id).to.equal('test-focusing-picker');
        } else {
          throw new Error('Ref must be available');
        }
      };

      return (
        <React.Fragment>
          <DatePicker
            ref={ref}
            value={null}
            onChange={() => {}}
            renderInput={(params) => <TextField id="test-focusing-picker" {...params} />}
          />
          <button type="button" onClick={focusPicker}>
            test
          </button>
        </React.Fragment>
      );
    };

    render(<Component />);
    fireEvent.click(screen.getByText('test'));
  });
});
