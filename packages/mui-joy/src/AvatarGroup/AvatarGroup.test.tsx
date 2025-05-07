import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import AvatarGroup, { avatarGroupClasses as classes } from '@mui/joy/AvatarGroup';
import Avatar, { avatarClasses } from '@mui/joy/Avatar';
import describeConformance from '../../test/describeConformance';

describe('<AvatarGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<AvatarGroup />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyAvatarGroup',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['classesRoot', 'componentsProp'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('provide context to Avatar', () => {
    const { container } = render(
      <AvatarGroup variant="solid" color="primary" size="sm">
        <Avatar src="/" />
      </AvatarGroup>,
    );

    const firstChild = container.firstChild;
    if (firstChild === null) {
      return;
    }
    const avatar = container.firstChild?.firstChild;
    expect(avatar).to.have.class(avatarClasses.colorPrimary);
    expect(avatar).to.have.class(avatarClasses.variantSolid);
    expect(avatar).to.have.class(avatarClasses.sizeSm);
  });
});
