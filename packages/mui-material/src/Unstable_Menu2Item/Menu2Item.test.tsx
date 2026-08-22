import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item, { menu2ItemClasses as classes } from '@mui/material/Unstable_Menu2Item';
import describeConformance from '../../test/describeConformance';

describe('<Menu2Item />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2Item>Item</Menu2Item>, () => ({
    classes,
    render: (node) => {
      const { container, ...other } = render(
        <Menu2 defaultOpen modal={false} anchor={document.body}>
          {node}
        </Menu2>,
      );
      // The popup renders in a portal; hand the harness a container whose
      // firstChild is the item root (the conformance contract).
      const item = document.querySelector('[role="menuitem"]')!;
      return { ...other, container: { firstChild: item } as unknown as HTMLElement };
    },
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenu2Item',
    testVariantProps: { dense: true },
  }));

  // `disableRipple` and `suppressKeyboardActivation` are internal to
  // `ButtonBase`. A custom root slot does not reach it, so React warns if the
  // slot spreads them onto the DOM.
  it('does not forward the internal ButtonBase props to a custom root slot', async () => {
    let received: string[] = [];
    const CustomRoot = React.forwardRef(function CustomRoot(
      { ownerState, ...other }: any,
      ref: React.Ref<HTMLDivElement>,
    ) {
      received = Object.keys(other);
      return <div ref={ref} {...other} />;
    });

    render(
      <Menu2 defaultOpen modal={false} anchor={document.body}>
        <Menu2Item slots={{ root: CustomRoot }}>Item</Menu2Item>
      </Menu2>,
    );

    await screen.findByRole('menuitem', { name: 'Item' });
    // The slot is in use, so the assertion below is not vacuous.
    expect(received).to.include('className');
    expect(received).not.to.include('suppressKeyboardActivation');
    expect(received).not.to.include('disableRipple');
  });
});
