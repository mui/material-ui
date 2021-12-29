import * as React from 'react';
import MultiSelectUnstyled from '@mui/base/MultiSelectUnstyled';
import { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import OptionGroupUnstyled from '@mui/base/OptionGroupUnstyled';

describe('MultiSelectUnstyled', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const componentToTest = (
    <MultiSelectUnstyled defaultListboxOpen>
      <OptionGroupUnstyled label="Group">
        <OptionUnstyled value={1}>1</OptionUnstyled>
      </OptionGroupUnstyled>
    </MultiSelectUnstyled>
  );

  describeConformanceUnstyled(componentToTest, () => ({
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
