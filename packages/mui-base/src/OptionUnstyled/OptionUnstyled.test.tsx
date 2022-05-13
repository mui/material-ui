import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import { SelectUnstyledContext } from '@mui/base/SelectUnstyled';

const dummyGetOptionState = () => ({
  disabled: false,
  highlighted: false,
  selected: false,
});

const dummyGetOptionProps = () => ({
  'aria-disabled': false,
  'aria-selected': false,
  label: '',
  onClick: () => {},
  role: 'option',
  value: '',
});

describe('OptionUnstyled', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<OptionUnstyled value={42} />, () => ({
    inheritComponent: 'li',
    render: (node) => {
      return render(
        <SelectUnstyledContext.Provider
          value={{
            getOptionState: dummyGetOptionState,
            getOptionProps: dummyGetOptionProps,
            listboxRef: React.createRef(),
          }}
        >
          {node}
        </SelectUnstyledContext.Provider>,
      );
    },
    mount: (node: React.ReactNode) => {
      const wrapper = mount(
        <SelectUnstyledContext.Provider
          value={{
            getOptionState: dummyGetOptionState,
            getOptionProps: dummyGetOptionProps,
            listboxRef: React.createRef(),
          }}
        >
          {node}
        </SelectUnstyledContext.Provider>,
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
      'componentsPropsCallbacks', // not implemented yet
    ],
  }));
});
