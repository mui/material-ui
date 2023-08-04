import * as React from 'react';
import { act, createRenderer, createMount, describeConformanceUnstyled } from 'test/utils';
import { Popup, popupClasses, PopupProps } from '@mui/base/Popup';

describe('<Popup />', () => {
  const { render } = createRenderer();
  const mount = createMount();

  const defaultProps: PopupProps = {
    anchor: () => document.createElement('div'),
    children: <span>Hello World</span>,
    open: true,
  };

  describeConformanceUnstyled(<Popup {...defaultProps} />, () => ({
    inheritComponent: 'div',
    render: async (...renderArgs) => {
      const result = render(...renderArgs);
      if (/jsdom/.test(window.navigator.userAgent)) {
        // flush microtasks (https://floating-ui.com/docs/react#testing)
        await act(() => async () => {});
      }

      return result;
    },
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      // https://github.com/facebook/react/issues/11565
      'reactTestRenderer',
      'componentProp',
    ],
    slots: {
      root: {
        expectedClassName: popupClasses.root,
      },
    },
  }));
});
