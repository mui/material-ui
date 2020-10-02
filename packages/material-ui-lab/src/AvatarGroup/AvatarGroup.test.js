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

  it('should display all avatars with default(circular) variant', () => {
    const { container } = render(
      <AvatarGroup max={3}>
        <Avatar src="image-url" />
        <Avatar src="image-url" />
        <Avatar src="image-url" />
        <Avatar src="image-url" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll('.MuiAvatar-root').length).to.equal(
      container.firstChild.childNodes.length,
    );
    expect(container.querySelector('.MuiAvatar-rounded')).to.equal(null);
    expect(container.querySelector('.MuiAvatar-square')).to.equal(null);
  });

  it('should display all avatars with square variant', () => {
    const { container } = render(
      <AvatarGroup max={3} variant="square">
        <Avatar src="image-url" />
        <Avatar src="image-url" />
        <Avatar src="image-url" />
        <Avatar src="image-url" />
      </AvatarGroup>,
    );
    const avatarsLength = container.querySelectorAll('.MuiAvatar-root').length;
    expect(avatarsLength).to.equal(container.firstChild.childNodes.length);
    expect(container.querySelectorAll('.MuiAvatar-square').length).to.equal(avatarsLength);
    expect(container.querySelector('.MuiAvatar-rounded')).to.equal(null);
  });

  it('should display all avatars with square variant except the first avatar being rounded', () => {
    const { container } = render(
      <AvatarGroup max={3} variant="square">
        <Avatar src="image-url" variant="rounded" />
        <Avatar src="image-url" />
        <Avatar src="image-url" />
        <Avatar src="image-url" />
      </AvatarGroup>,
    );
    const avatarGroup = container.firstChild;
    // avatar group display is flex row-reverse
    const firstAvatar = avatarGroup.lastChild;
    expect(firstAvatar).to.have.class('MuiAvatar-root');
    expect(firstAvatar).to.have.class('MuiAvatar-rounded');
    expect(firstAvatar).to.not.have.class('MuiAvatar-square');
    const avatarsLength = container.querySelectorAll('.MuiAvatar-root').length;
    expect(container.querySelectorAll('.MuiAvatar-square').length).to.equal(avatarsLength - 1);
  });
});
