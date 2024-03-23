import * as React from 'react';
import { createMount, createRenderer } from '@mui-internal/test-utils';
import { Option, optionClasses } from '@mui/base/Option';
import { SelectProvider } from '../useSelect/SelectProvider';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

const dummyGetItemState = () => ({
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
            registerItem: () => ({ id: 0, deregister: () => {} }),
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
            registerItem: () => ({ id: 0, deregister: () => {} }),
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
    slots: {
      root: {
        expectedClassName: optionClasses.root,
      },
    },
    skip: [
      'componentProp',
      'reactTestRenderer', // Need to be wrapped in SelectContext
    ],
  }));
});
