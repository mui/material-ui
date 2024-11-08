import * as React from 'react';
import { expect } from 'chai';
import { act, createRenderer, fireEvent } from '@mui/internal-test-utils';
import ListItemButton, { listItemButtonClasses as classes } from '@mui/material/ListItemButton';
import ButtonBase from '@mui/material/ButtonBase';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ListContext from '../List/ListContext';
import describeConformance from '../../test/describeConformance';

describe('<ListItemButton />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItemButton />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'a',
    muiName: 'MuiListItemButton',
    testVariantProps: { dense: true },
    skip: ['componentsProp'],
  }));

  it('should render with gutters classes', () => {
    const { getByRole } = render(<ListItemButton />);
    expect(getByRole('button')).to.have.class(classes.gutters);
  });

  it('should render with the selected class', () => {
    const { getByRole } = render(<ListItemButton selected />);
    expect(getByRole('button')).to.have.class(classes.selected);
  });

  it('should disable the gutters', () => {
    const { getByRole } = render(<ListItemButton disableGutters />);
    expect(getByRole('button')).not.to.have.class(classes.gutters);
  });

  describe('context: dense', () => {
    it('should forward the context', () => {
      let context = null;
      const { setProps } = render(
        <ListItemButton>
          <ListContext.Consumer>
            {(options) => {
              context = options;
            }}
          </ListContext.Consumer>
        </ListItemButton>,
      );
      expect(context).to.have.property('dense', false);
      setProps({ dense: true });
      expect(context).to.have.property('dense', true);
    });
  });

  describe('prop: focusVisibleClassName', () => {
    before(function beforeCallback() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // JSDOM doesn't support :focus-visible
        this.skip();
      }
    });

    it('should merge the class names', async () => {
      const { getByRole } = render(
        <ListItemButton focusVisibleClassName="focusVisibleClassName" />,
      );
      const button = getByRole('button');

      fireEvent.keyDown(document.activeElement || document.body, { key: 'Tab' });

      await act(async () => {
        button.focus();
      });

      expect(button).to.have.class('focusVisibleClassName');
      expect(button).to.have.class(classes.focusVisible);
    });
  });

  describe('prop: href', () => {
    const href = 'example.com';

    it('should rendered as link without specifying component="a"', () => {
      const { getByRole } = render(<ListItemButton href={href} />);

      const link = getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should rendered as link when specifying component="div"', () => {
      const { getByRole } = render(<ListItemButton href={href} component="div" />);

      const link = getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should rendered as link when specifying component="a"', () => {
      const { getByRole } = render(<ListItemButton href={href} component="a" />);

      const link = getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should rendered as specifying component', () => {
      const { getByRole } = render(<ListItemButton href={href} component="h1" />);

      const heading = getByRole('heading');

      expect(!!heading).to.equal(true);
    });
  });

  describe('prop: to', () => {
    const to = 'example.com';

    it('should rendered as link without specifying component="a"', () => {
      const { getByRole } = render(<ListItemButton to={to} />);

      const link = getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should rendered as link when specifying component="div"', () => {
      const { getByRole } = render(<ListItemButton to={to} component="div" />);

      const link = getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should rendered as link when specifying component="a"', () => {
      const { getByRole } = render(<ListItemButton to={to} component="a" />);

      const link = getByRole('link');

      expect(!!link).to.equal(true);
    });

    it('should rendered as specifying component', () => {
      const { getByRole } = render(<ListItemButton to={to} component="h1" />);

      const heading = getByRole('heading');

      expect(!!heading).to.equal(true);
    });
  });

  describe('prop: LinkComponent', () => {
    const href = 'example.com';
    const customLinkId = 'customLink';
    const CustomLink = React.forwardRef((props, ref) => {
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a data-testid={customLinkId} ref={ref} {...props} />;
    });

    it('should rendered as LinkComponent when href is provided', () => {
      const { container, getByTestId } = render(
        <ListItemButton href={href} LinkComponent={CustomLink} />,
      );
      const button = container.firstChild;

      expect(getByTestId(customLinkId)).not.to.equal(null);
      expect(button).to.have.property('nodeName', 'A');
      expect(button).to.have.attribute('href', href);
    });

    it('should ignore LinkComponent is component is provided', () => {
      const { container, queryByTestId } = render(
        <ListItemButton href={href} LinkComponent={CustomLink} component="h1" />,
      );
      const button = container.firstChild;

      expect(queryByTestId(customLinkId)).to.equal(null);
      expect(button).to.have.property('nodeName', 'H1');
      expect(button).to.have.attribute('href', href);
    });

    it('should rendered as LinkComponent (from theme) when href is provided', () => {
      const theme = createTheme({
        components: {
          MuiListItemButton: {
            defaultProps: {
              LinkComponent: CustomLink,
            },
          },
        },
      });
      const { container, getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ListItemButton href={href} />,
        </ThemeProvider>,
      );
      const button = container.firstChild;

      expect(getByTestId(customLinkId)).not.to.equal(null);
      expect(button).to.have.property('nodeName', 'A');
      expect(button).to.have.attribute('href', href);
    });

    it('should rendered as LinkComponent (from theme MuiButtonBase) when href is provided', () => {
      const theme = createTheme({
        components: {
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: CustomLink,
            },
          },
        },
      });
      const { container, getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ListItemButton href={href} />,
        </ThemeProvider>,
      );
      const button = container.firstChild;

      expect(getByTestId(customLinkId)).not.to.equal(null);
      expect(button).to.have.property('nodeName', 'A');
      expect(button).to.have.attribute('href', href);
    });

    it('should prefer LinkComponent from MuiListItemButton over MuiButtonBase', () => {
      const WrongCustomLink = React.forwardRef((props, ref) => {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a data-testid="wrong-link" ref={ref} {...props} />;
      });

      const theme = createTheme({
        components: {
          MuiListItemButton: {
            defaultProps: {
              LinkComponent: CustomLink,
            },
          },
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: WrongCustomLink,
            },
          },
        },
      });
      const { container, getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ListItemButton href={href} />,
        </ThemeProvider>,
      );
      const button = container.firstChild;

      expect(getByTestId(customLinkId)).not.to.equal(null);
      expect(button).to.have.property('nodeName', 'A');
      expect(button).to.have.attribute('href', href);
    });
  });
});
