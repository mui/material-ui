import * as React from 'react';
import SelectUnstyled, { Option, OptionGroup } from '@mui/base/SelectUnstyled';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import selectUnstyledClasses from './selectUnstyledClasses';

describe('SelectUnstyled', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const singleSelectToTest = (
    <SelectUnstyled defaultListboxOpen>
      <OptionGroup label="Group">
        <Option value={1}>1</Option>
      </OptionGroup>
    </SelectUnstyled>
  );

  describeConformanceUnstyled(singleSelectToTest, () => ({
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
      listboxRoot: {
        expectedClassName: selectUnstyledClasses.listbox,
        testWithElement: 'ul',
      },
      listboxOption: {
        expectedClassName: selectUnstyledClasses.option,
        testWithElement: 'li',
      },
      listboxOptionGroupRoot: {
        expectedClassName: selectUnstyledClasses.groupRoot,
        testWithElement: 'li',
      },
      listboxOptionGroupHeader: {
        expectedClassName: selectUnstyledClasses.groupHeader,
      },
      listboxOptionGroupOptions: {
        expectedClassName: selectUnstyledClasses.groupOptions,
        testWithElement: 'ul',
      },
    },
  }));

  const multiSelectToTest = (
    <SelectUnstyled multiple defaultListboxOpen>
      <OptionGroup label="Group">
        <Option value={1}>1</Option>
      </OptionGroup>
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
      listboxRoot: {
        expectedClassName: selectUnstyledClasses.listbox,
        testWithElement: 'ul',
      },
      listboxOption: {
        expectedClassName: selectUnstyledClasses.option,
        testWithElement: 'li',
      },
      listboxOptionGroupRoot: {
        expectedClassName: selectUnstyledClasses.groupRoot,
        testWithElement: 'li',
      },
      listboxOptionGroupHeader: {
        expectedClassName: selectUnstyledClasses.groupHeader,
      },
      listboxOptionGroupOptions: {
        expectedClassName: selectUnstyledClasses.groupOptions,
        testWithElement: 'ul',
      },
    },
  }));
});
