import * as React from 'react';
import { expect } from 'chai';
import { act, createRenderer, fireEvent } from 'test/utils';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import SelectUnstyled from '@mui/base/SelectUnstyled';
import { styled } from '@mui/system';

describe('<SelectUnstyled> integration', () => {
  const { render } = createRenderer();

  it('should scroll to highlighted option so it is visible', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const SelectListbox = styled('ul')({
      maxHeight: '100px',
      overflow: 'auto',
    });

    const Option = styled(OptionUnstyled)({
      height: '50px',
    });

    const { getByRole } = render(
      <SelectUnstyled components={{ Listbox: SelectListbox }}>
        <Option value="1">1</Option>
        <Option value="2">2</Option>
        <Option value="3">3</Option>
        <Option value="4">4</Option>
        <Option value="5">5</Option>
        <Option value="6">6</Option>
      </SelectUnstyled>,
    );

    const select = getByRole('button');

    act(() => {
      select.focus();
    });

    fireEvent.keyDown(select, { key: 'ArrowDown' });

    const listbox = getByRole('listbox');

    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });

    expect(listbox.scrollTop).to.equal(100);

    fireEvent.keyDown(listbox, { key: 'ArrowUp' });
    fireEvent.keyDown(listbox, { key: 'ArrowUp' });

    expect(listbox.scrollTop).to.equal(50);
  });
});
