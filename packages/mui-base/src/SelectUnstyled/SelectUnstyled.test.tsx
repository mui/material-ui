import * as React from 'react';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import OptionGroupUnstyled from '@mui/base/OptionGroupUnstyled';

describe('SelectUnstyled', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const singleSelectToTest = (
    <SelectUnstyled defaultListboxOpen>
      <OptionGroupUnstyled label="Group">
        <OptionUnstyled value={1}>1</OptionUnstyled>
      </OptionGroupUnstyled>
    </SelectUnstyled>
  );

  describeConformanceUnstyled(singleSelectToTest, () => ({
    inheritComponent: 'button',
    render,
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    muiName: 'MuiSelectUnstyled',
    slots: {
      root: {
        expectedClassName: selectUnstyledClasses.button,
      },
      listbox: {
        expectedClassName: selectUnstyledClasses.listbox,
        testWithElement: 'ul',
      },
    },
  }));

  const multiSelectToTest = (
    <SelectUnstyled multiple defaultListboxOpen>
      <OptionGroupUnstyled label="Group">
        <OptionUnstyled value={1}>1</OptionUnstyled>
      </OptionGroupUnstyled>
    </SelectUnstyled>
  );

  describeConformanceUnstyled(multiSelectToTest, () => ({
    inheritComponent: 'button',
    render,
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    muiName: 'MuiSelect',
    slots: {
      root: {
        expectedClassName: selectUnstyledClasses.button,
      },
      listbox: {
        expectedClassName: selectUnstyledClasses.listbox,
        testWithElement: 'ul',
      },
    },
  }));
});
