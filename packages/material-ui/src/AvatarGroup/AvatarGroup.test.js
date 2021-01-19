import * as React from 'react';
import { expect } from 'chai';
import { createMount, describeConformanceV5, createClientRender } from 'test/utils';
import Avatar from '@material-ui/core/Avatar';
import classes from './avatarGroupClasses';
import AvatarGroup from './AvatarGroup';

describe('<AvatarGroup />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceV5(
    <AvatarGroup>
      <div />
    </AvatarGroup>,
    () => ({
      classes,
      inheritComponent: 'div',
      mount,
      muiName: 'MuiAvatarGroup',
      refInstanceof: window.HTMLDivElement,
      testDeepOverrides: { slotName: 'avatar', slotClassName: classes.avatar },
      testVariantProps: { max: 10, spacing: 'small', variant: 'square' },
      skip: ['componentsProp'],
    }),
  );

  it('should display all the avatars', () => {
    const { container } = render(
      <AvatarGroup max={3}>
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(3);
    expect(container.querySelectorAll('img').length).to.equal(3);
    expect(container.textContent).to.equal('');
  });

  it('should display 2 avatars and "+2"', () => {
    const { container } = render(
      <AvatarGroup max={3}>
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(3);
    expect(container.querySelectorAll('img').length).to.equal(2);
    expect(container.textContent).to.equal('+2');
  });

  it('should display all avatars with default (circular) variant', () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    const avatarGroup = container.firstChild;
    const avatar = avatarGroup.firstChild;
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(
      avatarGroup.childNodes.length,
    );
    expect(avatar).to.have.class('MuiAvatar-circular');
    expect(avatar).to.not.have.class('MuiAvatar-rounded');
    expect(avatar).to.not.have.class('MuiAvatar-square');
  });

  it('should display all avatars with the specified variant', () => {
    const { container } = render(
      <AvatarGroup variant="square">
        <Avatar src="/fake.png" />
      </AvatarGroup>,
    );
    const avatarGroup = container.firstChild;
    const avatar = avatarGroup.firstChild;
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(
      avatarGroup.childNodes.length,
    );
    expect(avatar).to.have.class('MuiAvatar-square');
    expect(avatar).to.not.have.class('MuiAvatar-circular');
    expect(avatar).to.not.have.class('MuiAvatar-rounded');
  });

  it("should respect child's avatar variant prop if specified", () => {
    const { container } = render(
      <AvatarGroup variant="square">
        <Avatar src="/fake.png" variant="rounded" />
      </AvatarGroup>,
    );
    const avatarGroup = container.firstChild;
    const roundedAvatar = avatarGroup.firstChild;
    expect(roundedAvatar).to.have.class('MuiAvatar-rounded');
    expect(roundedAvatar).to.not.have.class('MuiAvatar-circular');
    expect(roundedAvatar).to.not.have.class('MuiAvatar-square');
  });
});
