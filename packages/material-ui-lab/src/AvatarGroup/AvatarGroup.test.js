import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, describeConformance, createClientRender } from 'test/utils';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from './AvatarGroup';

describe('<AvatarGroup />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<AvatarGroup />);
  });

  describeConformance(<AvatarGroup />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should display all the avatars', () => {
    const { container } = render(
      <AvatarGroup max={3}>
        <Avatar src="image-url" />
        <Avatar src="image-url" />
        <Avatar src="image-url" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(3);
    expect(container.querySelectorAll('img').length).to.equal(3);
    expect(container.textContent).to.equal('');
  });

  it('should display 2 avatars and "+2"', () => {
    const { container } = render(
      <AvatarGroup max={3}>
        <Avatar src="image-url" />
        <Avatar src="image-url" />
        <Avatar src="image-url" />
        <Avatar src="image-url" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(3);
    expect(container.querySelectorAll('img').length).to.equal(2);
    expect(container.textContent).to.equal('+2');
  });

  it('should display all avatars with default (circular) variant', () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar src="image-url" />
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
        <Avatar src="image-url" />
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
        <Avatar src="image-url" variant="rounded" />
      </AvatarGroup>,
    );
    const avatarGroup = container.firstChild;
    const roundedAvatar = avatarGroup.firstChild;
    expect(roundedAvatar).to.have.class('MuiAvatar-rounded');
    expect(roundedAvatar).to.not.have.class('MuiAvatar-circular');
    expect(roundedAvatar).to.not.have.class('MuiAvatar-square');
  });
});
