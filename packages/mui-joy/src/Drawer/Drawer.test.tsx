import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Modal, { modalClasses } from '@mui/joy/Modal';
import Drawer, { drawerClasses as classes } from '@mui/joy/Drawer';

describe('<Drawer />', () => {
  const { render } = createRenderer();

  const CustomComponent = React.forwardRef<
    HTMLElement,
    React.PropsWithChildren<{ className?: string; tabIndex?: number }>
  >(({ className, children, tabIndex }, ref) => (
    <i className={className} ref={ref} tabIndex={tabIndex} data-testid="custom">
      {children}
    </i>
  ));

  describeConformance(
    <Drawer open>
      <div />
    </Drawer>,
    () => ({
      classes,
      inheritComponent: Modal,
      render,
      ThemeProvider,
      muiName: 'JoyDrawer',
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'header',
      testVariantProps: { hideBackdrop: true },
      slots: {
        root: { expectedClassName: classes.root },
        backdrop: { expectedClassName: modalClasses.backdrop },
        sheet: { expectedClassName: classes.sheet, testWithComponent: CustomComponent },
      },
      skip: [
        'classesRoot',
        'rootClass', // portal, can't determine the root
        'componentsProp', // TODO isRTL is leaking, why do we even have it in the first place?
        'themeDefaultProps', // portal, can't determine the root
        'themeStyleOverrides', // portal, can't determine the root
        'reactTestRenderer', // portal https://github.com/facebook/react/issues/11565
      ],
    }),
  );

  it('renders children', () => {
    const { getByText } = render(
      <Drawer open>
        <span>test</span>
      </Drawer>,
    );

    expect(getByText('test')).toBeVisible();
  });
});
