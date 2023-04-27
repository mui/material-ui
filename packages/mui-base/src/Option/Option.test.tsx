import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import Option, { optionClasses } from '@mui/base/Option';
import SelectProvider from '../useSelect/SelectProvider';

const dummyGetItemState = () => ({
  disabled: false,
  highlighted: false,
  selected: false,
  index: 0,
  focusable: false,
});

describe('<Option />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<Option value={42} />, () => ({
    inheritComponent: 'li',
    render: (node) => {
      return render(
        <SelectProvider
          value={{
            dispatch: () => {},
            getItemIndex: () => 0,
            getItemState: dummyGetItemState,
            registerHighlightChangeHandler: () => () => {},
            registerItem: () => ({ id: 0, deregister: () => {} }),
            registerSelectionChangeHandler: () => () => {},
            totalSubitemCount: 0,
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
            registerItem: () => ({ id: 0, deregister: () => {} }),
            registerSelectionChangeHandler: () => () => {},
            totalSubitemCount: 0,
          }}
        >
          {node}
        </SelectProvider>,
      );
      return wrapper.childAt(0);
    },
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'span',
    muiName: 'MuiOption',
    slots: {
      root: {
        expectedClassName: optionClasses.root,
      },
    },
    skip: [
      'reactTestRenderer', // Need to be wrapped in SelectContext
    ],
  }));
});
