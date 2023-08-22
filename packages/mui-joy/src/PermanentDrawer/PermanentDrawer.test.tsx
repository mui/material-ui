import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import PermanentDrawer, { permanentDrawerClasses as classes } from '@mui/joy/PermanentDrawer';

describe('<PermanentDrawer />', () => {
  const { render } = createRenderer();

  describeConformance(
    <PermanentDrawer>
      <div />
    </PermanentDrawer>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      ThemeProvider,
      muiName: 'JoyPermanentDrawer',
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'header',
      slots: {
        root: { expectedClassName: classes.root },
        content: { expectedClassName: classes.content },
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
      <PermanentDrawer>
        <span>test</span>
      </PermanentDrawer>,
    );

    expect(getByText('test')).toBeVisible();
  });
});
