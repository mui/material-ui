import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem, {
  menu2RadioItemClasses as classes,
} from '@mui/material/Unstable_Menu2RadioItem';
import describeConformance from '../../test/describeConformance';
import withPortalledRoot from '../../test/menu2Conformance';

describe('<Menu2RadioItem />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2RadioItem value="one">One</Menu2RadioItem>, () => ({
    classes,
    render: (node) =>
      withPortalledRoot(
        render(
          <Menu2 defaultOpen modal={false} anchor={document.body}>
            <Menu2RadioGroup>{node}</Menu2RadioGroup>
          </Menu2>,
        ),
        `.${classes.root}`,
      ),
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    muiName: 'MuiMenu2RadioItem',
    testVariantProps: { 'data-variant': 'probe' },
  }));

  // The item root is a ButtonBase. Base UI and ButtonBase both emulate keyboard
  // activation on a non-native root, which used to select the item twice.
  it('selects once per keyboard activation', async () => {
    const onChange = spy();
    const { user } = render(
      <Menu2 defaultOpen modal={false} anchor={document.body}>
        <Menu2RadioGroup defaultValue="one" onChange={onChange}>
          <Menu2RadioItem closeOnClick={false} value="two">
            Two
          </Menu2RadioItem>
        </Menu2RadioGroup>
      </Menu2>,
    );

    const item = screen.getByRole('menuitemradio', { name: 'Two' });
    await act(async () => {
      item.focus();
    });

    await user.keyboard('[Space]');
    expect(onChange.callCount).to.equal(1);
    expect(item).to.have.attribute('aria-checked', 'true');

    await user.keyboard('[Enter]');
    expect(onChange.callCount).to.equal(2);
  });
});
