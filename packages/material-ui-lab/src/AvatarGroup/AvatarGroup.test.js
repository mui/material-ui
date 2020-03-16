import * as React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import AvatarGroup from './AvatarGroup';
import { Avatar } from '@material-ui/core';

describe('<AvatarGroup />', () => {
  let mount;
  let classes;
  const render = createClientRender();

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<AvatarGroup />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<AvatarGroup />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should not display all the avatars', () => {
    const { container } = render(
      <AvatarGroup max={1}>
        <Avatar src="broken-url" />
        <Avatar src="broken-url" />
        <Avatar src="broken-url" />
      </AvatarGroup>,
    );
    expect(container.querySelectorAll('img').length).to.equal(1);
    expect(container.textContent).to.equal('+2');
  });
});
