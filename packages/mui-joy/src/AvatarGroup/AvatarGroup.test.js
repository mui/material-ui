import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import AvatarGroup, { avatarGroupClasses as classes } from '@mui/joy/AvatarGroup';
import Avatar, { avatarClasses } from '@mui/joy/Avatar';

describe('<AvatarGroup />', () => {
  const { render } = createRenderer();

  describeConformance(<AvatarGroup />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'MuiAvatarGroup',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'contained' },
    skip: ['classesRoot', 'componentsProp'],
  }));

  it('provide context to Avatar', () => {
    const { container } = render(
      <AvatarGroup variant="contained" color="primary" size="sm">
        <Avatar src="/" />
      </AvatarGroup>,
    );

    const avatar = container.firstChild.firstChild;
    expect(avatar).to.have.class(avatarClasses.colorPrimary);
    expect(avatar).to.have.class(avatarClasses.variantContained);
    expect(avatar).to.have.class(avatarClasses.sizeSm);
  });
});
