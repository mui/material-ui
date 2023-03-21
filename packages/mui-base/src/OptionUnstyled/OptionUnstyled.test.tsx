import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import SelectProvider from '../useSelect/SelectProvider';

const dummyGetItemState = () => ({
  disabled: false,
  highlighted: false,
  selected: false,
  index: 0,
  focusable: undefined,
});

describe('<OptionUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<OptionUnstyled value={42} />, () => ({
    inheritComponent: 'li',
    render: (node) => {
      return render(
        <SelectProvider
          value={{
            dispatch: () => {},
            getItemIndex: () => 0,
            getItemState: dummyGetItemState,
            registerHighlightChangeHandler: () => () => {},
            registerItem: () => () => {},
            registerSelectionChangeHandler: () => () => {},
            totalSubitemCount: 0,
            unregisterItem: () => () => {},
          }}
        >
          {node}
        </SelectProvider>,
      );
    },
    mount: (node: React.ReactNode) => {
      const wrapper = mount(
        <SelectProvider
          value={{
            dispatch: () => {},
            getItemIndex: () => 0,
            getItemState: dummyGetItemState,
            registerHighlightChangeHandler: () => () => {},
            registerItem: () => () => {},
            registerSelectionChangeHandler: () => () => {},
            totalSubitemCount: 0,
            unregisterItem: () => () => {},
          }}
        >
          {node}
        </SelectProvider>,
      );
      return wrapper.childAt(0);
    },
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'span',
    muiName: 'MuiOptionUnstyled',
    slots: {
      root: {
        expectedClassName: optionUnstyledClasses.root,
      },
    },
    skip: [
      'reactTestRenderer', // Need to be wrapped in SelectUnstyledContext
    ],
  }));
});
