import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui-internal/test-utils';
import styled from '../../src/styled';

describe('props filtering', () => {
  const { render } = createRenderer();

  it('composes shouldForwardProp on composed styled components', () => {
    const StyledDiv = styled('div', {
      shouldForwardProp: (prop) => prop !== 'foo',
    })();

    const ComposedDiv = styled(StyledDiv, {
      shouldForwardProp: (prop) => prop !== 'bar',
    })();

    const { container } = render(<ComposedDiv foo bar xyz="true" />);

    expect(container.firstChild).to.not.have.attribute('foo');
    expect(container.firstChild).to.not.have.attribute('bar');
    expect(container.firstChild).to.have.attribute('xyz', 'true');
  });

  it('custom shouldForwardProp works', () => {
    function Svg(props) {
      return (
        <svg {...props}>
          <rect x="10" y="10" height="100" width="100" style={{ stroke: '#ff0000' }} />
        </svg>
      );
    }

    const StyledSvg = styled(Svg, {
      shouldForwardProp: (prop) => ['className', 'width', 'height'].indexOf(prop) !== -1,
    })`
      &,
      & * {
        fill: ${({ color }) => color};
      }
    `;

    const { container } = render(<StyledSvg color="#0000ff" width="100px" height="100px" />);
    expect(container.firstChild).to.not.have.attribute('color');
    expect(container.firstChild).to.have.attribute('width', '100px');
    expect(container.firstChild).to.have.attribute('height', '100px');
  });

  it('default prop filtering for native html tag', () => {
    const Link = styled('a')`
      color: green;
    `;
    const rest = { m: [3], pt: [4] };

    const { container } = render(
      <Link
        a="true"
        b="true"
        wow="true"
        prop="true"
        filtering="true"
        is="true"
        cool="true"
        aria-label="some label"
        data-wow="value"
        href="link"
        {...rest}
      >
        hello world
      </Link>,
    );
    expect(container.firstChild).to.have.attribute('href', 'link');
    expect(container.firstChild).to.have.attribute('aria-label', 'some label');
    expect(container.firstChild).to.have.attribute('data-wow', 'value');
    expect(container.firstChild).to.have.attribute('is', 'true');

    expect(container.firstChild).not.to.have.attribute('a');
    expect(container.firstChild).not.to.have.attribute('b');
    expect(container.firstChild).not.to.have.attribute('wow');
    expect(container.firstChild).not.to.have.attribute('prop');
    expect(container.firstChild).not.to.have.attribute('filtering');
    expect(container.firstChild).not.to.have.attribute('cool');
  });

  it('no prop filtering on non string tags', () => {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    const Link = styled((props) => <a {...props} />)`
      color: green;
    `;

    const { container } = render(
      <Link
        a="true"
        b="true"
        wow="true"
        prop="true"
        filtering="true"
        is="true"
        cool="true"
        aria-label="some label"
        data-wow="value"
        href="link"
      >
        hello world
      </Link>,
    );

    expect(container.firstChild).to.have.attribute('href', 'link');
    expect(container.firstChild).to.have.attribute('aria-label', 'some label');
    expect(container.firstChild).to.have.attribute('data-wow', 'value');
    expect(container.firstChild).to.have.attribute('is', 'true');
    expect(container.firstChild).to.have.attribute('a', 'true');
    expect(container.firstChild).to.have.attribute('b', 'true');
    expect(container.firstChild).to.have.attribute('wow', 'true');
    expect(container.firstChild).to.have.attribute('prop', 'true');
    expect(container.firstChild).to.have.attribute('filtering', 'true');
    expect(container.firstChild).to.have.attribute('cool', 'true');
  });

  describe('ownerState prop', () => {
    it('[HTML tag] does not forward `ownerState` by default', () => {
      const StyledDiv = styled('div')();

      const { container } = render(<StyledDiv ownerState={{ color: 'red' }} />);
      expect(container.firstChild).not.to.have.attribute('ownerState');
    });

    it('does not forward `ownerState` to other React component', () => {
      function InnerComponent(props) {
        const { ownerState } = props;
        return <div {...props} data-ownerstate={!!ownerState} />;
      }
      const StyledDiv = styled(InnerComponent)();

      const { container } = render(<StyledDiv ownerState={{ color: 'red' }} />);
      expect(container.firstChild).not.to.have.attribute('ownerState');
      expect(container.firstChild).to.have.attribute('data-ownerstate', 'false');
    });

    it('forward `ownerState` to inherited styled component', () => {
      const StyledDiv = styled('div')({
        classes: ['div1'],
        variants: [
          {
            props: ({ ownerState }) => ownerState.color === 'secondary',
            className: 'div1-secondary',
          },
        ],
      });

      const StyledDiv2 = styled(StyledDiv)({
        classes: ['div2'],
        variants: [
          {
            props: ({ ownerState }) => ownerState.color === 'secondary',
            className: 'div2-secondary',
          },
        ],
      });

      const { container } = render(<StyledDiv2 ownerState={{ color: 'secondary' }} />);
      expect(container.firstChild).to.have.class('div1-secondary');
      expect(container.firstChild).to.have.class('div2-secondary');
    });
  });

  describe('classes prop', () => {
    it('does not forward `classes` by default', () => {
      const StyledDiv = styled('div')();

      const { container } = render(<StyledDiv classes={{ root: 'root-123' }} />);
      expect(container.firstChild).not.to.have.attribute('classes');
    });

    it('does not forward `classes` for the root slot to other React component', () => {
      function InnerComponent(props) {
        const { classes = {} } = props;
        return <div {...props} className={classes.root} />;
      }
      const StyledDiv = styled(InnerComponent, {
        name: 'Div',
        slot: 'root',
      })();

      const { container } = render(<StyledDiv classes={{ root: 'root-123' }} />);
      expect(container.firstChild).not.to.have.attribute('classes');
      expect(container.firstChild).not.to.have.class('root-123');
    });

    it('forward `classes` for the root slot by a custom shouldForwardProp', () => {
      function ButtonBase(props) {
        const { classes = {} } = props;
        return <div {...props} className={classes.root} />;
      }
      const ButtonRoot = styled(ButtonBase, {
        name: 'Div',
        slot: 'root',
        shouldForwardProp: (prop) => prop === 'classes',
      })();

      const { container } = render(<ButtonRoot classes={{ root: 'root-123' }} />);
      expect(container.firstChild).to.have.class('root-123');
    });
  });
});
