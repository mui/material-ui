import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { expect } from 'chai';
import { createClientRender, screen } from 'test/utils';
import useReactId from './useReactId';

describe('useId', () => {
  const render = createClientRender();

  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    container.remove();
  });

  it('returns the provided ID', () => {
    const TestComponent = ({ id: idProp }) => {
      const id = useReactId(idProp);
      return <span data-testid="target" id={id} />;
    };
    container.innerHTML = ReactDOMServer.renderToString(<TestComponent id="some-id" />);
    const { setProps } = render(<TestComponent id="some-id" />, { container, hydrate: true });

    expect(screen.getByTestId('target')).to.have.property('id', 'some-id');

    setProps({ id: 'another-id' });

    expect(screen.getByTestId('target')).to.have.property('id', 'another-id');
  });

  it("generates an ID if one isn't provided", () => {
    const TestComponent = ({ id: idProp }) => {
      const id = useReactId(idProp);
      return <span data-testid="target" id={id} />;
    };
    container.innerHTML = ReactDOMServer.renderToString(<TestComponent />);
    const { setProps } = render(<TestComponent />, { container, hydrate: true });

    expect(screen.getByTestId('target').id).not.to.equal('');

    setProps({ id: 'another-id' });
    expect(screen.getByTestId('target')).to.have.property('id', 'another-id');
  });

  it('can be suffixed', () => {
    function Widget() {
      const id = useReactId();
      const labelId = `${id}-label`;

      return (
        <React.Fragment>
          <span data-testid="labelable" aria-labelledby={labelId} />
          <span data-testid="label" id={labelId}>
            Label
          </span>
        </React.Fragment>
      );
    }
    render(<Widget />);

    expect(screen.getByTestId('labelable')).to.have.attr(
      'aria-labelledby',
      screen.getByTestId('label').id,
    );
  });

  it('can be used in in IDREF attributes', () => {
    function Widget() {
      const labelPartA = useReactId();
      const labelPartB = useReactId();

      return (
        <React.Fragment>
          <span data-testid="labelable" aria-labelledby={`${labelPartA} ${labelPartB}`} />
          <span data-testid="labelA" id={labelPartA}>
            A
          </span>
          <span data-testid="labelB" id={labelPartB}>
            B
          </span>
        </React.Fragment>
      );
    }
    render(<Widget />);

    expect(screen.getByTestId('labelable')).to.have.attr(
      'aria-labelledby',
      `${screen.getByTestId('labelA').id} ${screen.getByTestId('labelB').id}`,
    );
  });

  it('provides an ID on server in React 18', function test() {
    if (React.unstable_useId === undefined) {
      this.skip();
    }
    const TestComponent = () => {
      const id = useReactId();
      return <span data-testid="target" id={id} />;
    };
    container.innerHTML = ReactDOMServer.renderToString(<TestComponent />);

    expect(screen.getByTestId('target').id).not.to.equal('');
  });
});
