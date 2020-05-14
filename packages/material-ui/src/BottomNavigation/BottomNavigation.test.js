import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import describeConformance from '../test-utils/describeConformance';
import BottomNavigationAction from '../BottomNavigationAction';
import Icon from '../Icon';
import BottomNavigation from './BottomNavigation';

describe('<BottomNavigation />', () => {
  const mount = createMount();
  let classes;
  let actionClasses;
  const render = createClientRender();
  const icon = <Icon>restore</Icon>;
  const getBottomNavigation = (container) => container.firstChild;

  before(() => {
    classes = getClasses(
      <BottomNavigation showLabels value={0}>
        <BottomNavigationAction icon={icon} />
      </BottomNavigation>,
    );
    actionClasses = getClasses(<BottomNavigationAction icon={icon} />);
  });

  describeConformance(
    <BottomNavigation>
      <BottomNavigationAction label="One" />
    </BottomNavigation>,
    () => ({
      classes,
      inheritComponent: 'div',
      mount,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'span',
    }),
  );

  it('renders with a null child', () => {
    const { container } = render(
      <BottomNavigation showLabels value={0}>
        <BottomNavigationAction label="One" />
        {null}
        <BottomNavigationAction label="Three" />
      </BottomNavigation>,
    );
    expect(getBottomNavigation(container).childNodes.length).to.equal(2);
  });

  it('should pass selected prop to children', () => {
    const { container } = render(
      <BottomNavigation showLabels value={1}>
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction icon={icon} />
      </BottomNavigation>,
    );
    expect(getBottomNavigation(container).childNodes[0]).to.not.have.class(actionClasses.selected);
    expect(getBottomNavigation(container).childNodes[1]).to.have.class(actionClasses.selected);
  });

  it('should overwrite parent showLabel prop adding class iconOnly', () => {
    const { getByTestId } = render(
      <BottomNavigation showLabels>
        <BottomNavigationAction icon={icon} data-testid="withLabel" />
        <BottomNavigationAction icon={icon} showLabel={false} data-testid="withoutLabel" />
      </BottomNavigation>,
    );
    expect(getByTestId('withLabel')).to.not.have.class(actionClasses.iconOnly);
    expect(getByTestId('withoutLabel')).to.have.class(actionClasses.iconOnly);
  });

  it('should forward the click', () => {
    const handleChange = spy();
    const { container } = render(
      <BottomNavigation showLabels value={0} onChange={handleChange}>
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction icon={icon} />
      </BottomNavigation>,
    );
    fireEvent.click(getBottomNavigation(container).childNodes[1]);
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.equal(1);
  });

  it('should use custom action values', () => {
    const handleChange = spy();
    const { container } = render(
      <BottomNavigation showLabels value={'first'} onChange={handleChange}>
        <BottomNavigationAction value="first" icon={icon} />
        <BottomNavigationAction value="second" icon={icon} />
      </BottomNavigation>,
    );
    fireEvent.click(getBottomNavigation(container).childNodes[1]);
    expect(handleChange.args[0][1]).to.equal('second', 'should have been called with value second');
  });

  it('should handle also empty action value', () => {
    const handleChange = spy();
    const { container } = render(
      <BottomNavigation showLabels value="val" onChange={handleChange}>
        <BottomNavigationAction value="" icon={icon} />
        <BottomNavigationAction icon={icon} />
        <BottomNavigationAction value={null} icon={icon} />
      </BottomNavigation>,
    );
    fireEvent.click(getBottomNavigation(container).childNodes[0]);
    expect(handleChange.args[0][1], '');
    fireEvent.click(getBottomNavigation(container).childNodes[1]);
    expect(handleChange.args[1][1], 1);
    fireEvent.click(getBottomNavigation(container).childNodes[2]);
    expect(handleChange.args[2][1], '');
  });
});
