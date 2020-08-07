import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { createClientRender } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import CardHeader from './CardHeader';
import Typography from '../Typography';

describe('<CardHeader />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();
  const typographyClasses = getClasses(<Typography />);
  before(() => {
    classes = getClasses(<CardHeader />);
  });

  describeConformance(<CardHeader />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
  }));

  describe('without an avatar', () => {
    it('should render the title as headline text', () => {
      const cardHeader = render(<CardHeader title="Title" subheader="Subheader" />).container
        .firstChild;
      const wrapper = cardHeader.firstChild;
      const title = wrapper.childNodes[0];
      expect(title).to.have.class(typographyClasses.root);
      expect(title).to.have.class(typographyClasses.h5);
    });

    it('should render the subheader as body1 secondary text', () => {
      const cardHeader = render(<CardHeader title="Title" subheader="Subheader" />).container
        .firstChild;
      const wrapper = cardHeader.firstChild;
      const subheader = wrapper.childNodes[1];
      expect(subheader).to.have.class(typographyClasses.root);
      expect(subheader).to.have.class(typographyClasses.body1);
      expect(subheader).to.have.class(typographyClasses.colorTextSecondary);
    });

    it('should not render the subheader if none is given', () => {
      const cardHeader = render(<CardHeader title="Title" />).container.firstChild;
      const wrapper = cardHeader.firstChild;
      const title = wrapper.childNodes[0];
      expect(title).to.have.class(typographyClasses.root);
      expect(wrapper.childNodes.length).to.equal(1);
    });
  });

  describe('with an avatar', () => {
    let avatar;
    let cardHeader;

    beforeEach(() => {
      avatar = <span />;
      cardHeader = render(<CardHeader avatar={avatar} title="Title" subheader="Subhead" />)
        .container.firstChild;
    });

    it('should render the avatar inside the first child', () => {
      const avatarWrapper = cardHeader.childNodes[0];
      expect(avatarWrapper.tagName).to.equal('DIV');
      expect(avatarWrapper).to.have.class(classes.avatar);
      expect(avatarWrapper.firstChild.tagName).to.equal('SPAN');
    });

    it('should render the title text inside the second child', () => {
      const titleWrapper = cardHeader.childNodes[1];
      expect(titleWrapper).to.have.class(classes.content, 'should have the content class');
      const title = titleWrapper.childNodes[0];
      expect(title).to.have.class(typographyClasses.root);
      expect(title).to.have.class(typographyClasses.body2);
    });

    it('should render the subheader as body2 secondary text inside the second child', () => {
      const titleWrapper = cardHeader.childNodes[1];
      expect(titleWrapper).to.have.class(classes.content, 'should have the content class');
      const subHeader = titleWrapper.childNodes[1];
      expect(subHeader).to.have.class(typographyClasses.root);
      expect(subHeader).to.have.class(typographyClasses.body2);
      expect(subHeader).to.have.class(typographyClasses.colorTextSecondary);
    });
  });
});
