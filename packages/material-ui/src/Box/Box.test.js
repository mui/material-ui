import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import { consoleWarnMock } from 'test/utils/consoleErrorMock';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import Box from './Box';

describe('<Box />', () => {
  const mount = createMount();
  const render = createClientRender();

  beforeEach(() => {
    consoleWarnMock.spy();
  });

  afterEach(() => {
    consoleWarnMock.reset();
  });

  describeConformance(<Box />, () => ({
    mount,
    only: ['refForwarding'],
    refInstanceof: window.HTMLDivElement,
  }));

  const testChildren = (
    <div data-testid="child" className="unique">
      Hello World
    </div>
  );

  it('renders children and box content', () => {
    const { container, getByTestId } = render(
      <Box component="span" m={1}>
        {testChildren}
      </Box>,
    );
    expect(container.firstChild).contain(getByTestId('child'));
    expect(container.querySelectorAll('span').length).to.equal(1);
  });

  it('does not forward style props as DOM attributes', () => {
    const elementRef = React.createRef();
    render(
      <Box
        color="primary.main"
        fontFamily="Comic Sans"
        fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
        ref={elementRef}
      />,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('color')).to.equal(null);
    expect(element.getAttribute('font-family')).to.equal(null);
    expect(element.getAttribute('font-size')).to.equal(null);
  });

  it('warns if the css prop is used ', () => {
    render(<Box css={{ m: 1, p: 1 }} />);

    expect(consoleWarnMock.callCount()).to.equal(2); // strict mode renders twice
    expect(consoleWarnMock.messages()[0]).to.include(
      'Material-UI: The css prop on the MuiBox component is deprecated, please use the sx prop instead.',
    );
  });
});
