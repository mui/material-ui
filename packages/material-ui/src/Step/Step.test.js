import * as React from 'react';
import * as PropTypes from 'prop-types';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import { createClientRender, within } from 'test/utils/createClientRender';
import Step from './Step';

/**
 * Exposes props stringified in the dataset of the `[data-testid="props"]`
 */
function PropsAsDataset(props) {
  const elementRef = React.useRef();
  React.useEffect(() => {
    const { current: element } = elementRef;

    Object.keys(props).forEach((key) => {
      // converted to strings internally. writing it out for readability
      element.dataset[key] = String(props[key]);
    });
  });

  return <span data-testid="props" ref={elementRef} />;
}

/**
 * A component that can be used as a child of `Step`.
 * It passes through all unrelated props to the underlying `div`
 * The props passed from `Step` are intercepted
 */
function StepChildDiv(props) {
  const {
    active,
    alternativeLabel,
    completed,
    disabled,
    expanded,
    icon,
    last,
    orientation,
    ...other
  } = props;

  return <div {...other} />;
}
StepChildDiv.propTypes = {
  active: PropTypes.bool,
  alternativeLabel: PropTypes.bool,
  completed: PropTypes.bool,
  disabled: PropTypes.bool,
  expanded: PropTypes.bool,
  icon: PropTypes.node,
  last: PropTypes.bool,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

describe('<Step />', () => {
  let classes;
  const mount = createMount();

  const render = createClientRender();

  before(() => {
    classes = getClasses(<Step />);
  });

  describeConformance(<Step />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('merges styles and other props into the root node', () => {
    const { getByTestId } = render(
      <Step
        index={1}
        style={{ paddingRight: 200, color: 'purple', border: '1px solid tomato' }}
        data-testid="root"
        orientation="horizontal"
      />,
    );

    const rootNode = getByTestId('root');
    expect(rootNode.style).to.have.property('paddingRight', '200px');
    expect(rootNode.style).to.have.property('color', 'purple');
    expect(rootNode.style).to.have.property('border', '1px solid tomato');
  });

  describe('rendering children', () => {
    it('renders children', () => {
      const { getByTestId } = render(
        <Step data-testid="root" label="Step One" index={1} orientation="horizontal">
          <StepChildDiv data-testid="child">Hello World</StepChildDiv>
        </Step>,
      );

      expect(within(getByTestId('root')).getByTestId('child')).not.to.equal(null);
    });

    it('renders children with all props passed through', () => {
      const { getAllByTestId } = render(
        <Step active={false} completed disabled index={0} orientation="horizontal">
          <PropsAsDataset />
          <PropsAsDataset />
        </Step>,
      );
      getAllByTestId('props').forEach((child) => {
        // HTMLElement.dataset is a DOMStringMap which fails deep.equal
        const datasetAsObject = { ...child.dataset };
        expect(datasetAsObject).to.deep.equal({
          // props passed from Step
          active: 'false',
          alternativeLabel: 'undefined',
          completed: 'true',
          disabled: 'true',
          expanded: 'false',
          last: 'undefined',
          icon: '1',
          orientation: 'horizontal',
          // test impl details
          testid: 'props',
        });
      });
    });

    it('honours children overriding props passed through', () => {
      const { getByTestId } = render(
        <Step active label="Step One" orientation="horizontal" index={0}>
          <PropsAsDataset active={false} />
        </Step>,
      );

      expect(getByTestId('props').dataset).to.have.property('active', 'false');
    });

    it('should handle null children', () => {
      const { getByTestId } = render(
        <Step label="Step One" index={1} orientation="horizontal">
          <StepChildDiv data-testid="child">Hello World</StepChildDiv>
          {null}
        </Step>,
      );

      expect(getByTestId('child')).not.to.equal(null);
    });
  });
});
