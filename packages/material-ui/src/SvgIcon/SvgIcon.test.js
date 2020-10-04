import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, describeConformance, createClientRender } from 'test/utils';
import SvgIcon from './SvgIcon';

describe('<SvgIcon />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;
  let path;

  before(() => {
    classes = getClasses(<SvgIcon>foo</SvgIcon>);
    path = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" data-testid="test-path" />;
  });

  describeConformance(
    <SvgIcon>
      <path />
    </SvgIcon>,
    () => ({
      classes,
      inheritComponent: 'svg',
      mount,
      refInstanceof: window.SVGSVGElement,
      testComponentPropWith: (props) => (
        <svg {...props}>
          <defs>
            <linearGradient id="gradient1">
              <stop offset="20%" stopColor="#39F" />
              <stop offset="90%" stopColor="#F3F" />
            </linearGradient>
          </defs>
          {props.children}
        </svg>
      ),
    }),
  );

  it('renders children by default', () => {
    const { container, queryByTestId } = render(<SvgIcon>{path}</SvgIcon>);
    const root = container.firstChild;

    expect(queryByTestId('test-path')).to.not.equal(null);
    expect(root).to.have.attribute('aria-hidden', 'true');
  });

  describe('prop: titleAccess', () => {
    it('should be able to make an icon accessible', () => {
      const { container, queryByText } = render(
        <SvgIcon title="Go to link" titleAccess="Network">
          {path}
        </SvgIcon>,
      );

      expect(queryByText('Network')).to.not.equal(null);
      expect(container.firstChild).to.not.have.attribute('aria-hidden');
    });
  });

  describe('prop: color', () => {
    it('should render with the user and SvgIcon classes', () => {
      const { container } = render(<SvgIcon className="meow">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class('meow');
    });

    it('should render with the secondary color', () => {
      const { container } = render(<SvgIcon color="secondary">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorSecondary);
    });

    it('should render with the action color', () => {
      const { container } = render(<SvgIcon color="action">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorAction);
    });

    it('should render with the error color', () => {
      const { container } = render(<SvgIcon color="error">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorError);
    });

    it('should render with the primary class', () => {
      const { container } = render(<SvgIcon color="primary">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.colorPrimary);
    });
  });

  describe('prop: fontSize', () => {
    it('should be able to change the fontSize', () => {
      const { container } = render(<SvgIcon fontSize="inherit">{path}</SvgIcon>);

      expect(container.firstChild).to.have.class(classes.fontSizeInherit);
    });
  });
});
