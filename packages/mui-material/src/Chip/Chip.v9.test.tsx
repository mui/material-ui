import * as React from 'react';
import { expect } from 'chai';
import {
  createRenderer,
  focusVisible,
  isJsdom,
  screen,
  strictModeDoubleLoggingSuppressed,
} from '@mui/internal-test-utils';
import Chip, { chipClasses as classes } from '@mui/material/Chip';
import ChipButton from '@mui/material/ChipButton';
import ChipDelete from '@mui/material/ChipDelete';
import ChipLink from '@mui/material/ChipLink';
import { hexToRgb } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CheckBox from '../internal/svg-icons/CheckBox';
import defaultTheme from '../styles/defaultTheme';

/**
 * Tests for the new Chip API surface:
 *   - action (ChipButton / ChipLink)
 *   - startAdornment / endAdornment (including ChipDelete)
 *   - component prop in the new render path
 */
describe('<Chip /> new API', () => {
  const { render } = createRenderer();

  describe('label slot', () => {
    const CustomLabel = React.forwardRef<HTMLElement, any>(function CustomLabel(props, ref) {
      const { ownerState, ...other } = props;

      return <strong data-testid="custom-label" ref={ref} {...other} />;
    });

    it('uses the Chip label slot when action renders a ChipButton', () => {
      render(
        <Chip
          label="My Chip"
          slots={{ label: CustomLabel }}
          action={<ChipButton onClick={() => {}} />}
        />,
      );

      const label = screen.getByTestId('custom-label');
      expect(label).to.have.tagName('STRONG');
      expect(label).to.have.class(classes.label);
      expect(label).to.have.text('My Chip');
      expect(screen.getByRole('button')).to.contain(label);
    });

    it('applies slotProps.label when action renders a ChipLink', () => {
      render(
        <Chip
          label="Visit"
          slotProps={{
            label: {
              'data-testid': 'slot-label',
              className: 'slot-label',
            } as React.HTMLAttributes<HTMLSpanElement> & { 'data-testid': string },
          }}
          action={<ChipLink href="#" />}
        />,
      );

      const label = screen.getByTestId('slot-label');
      expect(label).to.have.class(classes.label);
      expect(label).to.have.class('slot-label');
      expect(label).to.have.text('Visit');
      expect(screen.getByRole('link')).to.contain(label);
    });
  });

  describe('adornments', () => {
    it('renders an icon in startAdornment', () => {
      render(<Chip label="Chip" startAdornment={<CheckBox data-testid="start-icon" />} />);

      const icon = screen.getByTestId('start-icon');
      expect(icon.parentElement).to.have.class(classes.startAdornment);
    });

    it('renders an avatar in startAdornment', () => {
      render(
        <Chip
          label="Chip"
          startAdornment={
            <Avatar data-testid="start-avatar" src="/fake.png">
              A
            </Avatar>
          }
        />,
      );

      const avatar = screen.getByTestId('start-avatar');
      expect(avatar.parentElement).to.have.class(classes.startAdornment);
    });

    it('renders an icon in endAdornment', () => {
      render(<Chip label="Chip" endAdornment={<CheckBox data-testid="end-icon" />} />);

      const icon = screen.getByTestId('end-icon');
      expect(icon.parentElement).to.have.class(classes.endAdornment);
    });

    it('renders an avatar in endAdornment', () => {
      render(
        <Chip
          label="Chip"
          endAdornment={
            <Avatar data-testid="end-avatar" src="/fake.png">
              A
            </Avatar>
          }
        />,
      );

      const avatar = screen.getByTestId('end-avatar');
      expect(avatar.parentElement).to.have.class(classes.endAdornment);
    });
  });

  describe('prop: component', () => {
    it('renders the root as the specified element when action is provided', () => {
      const { container } = render(
        <Chip component="li" label="My Chip" action={<ChipButton onClick={() => {}} />} />,
      );

      expect(container.firstChild).to.have.tagName('li');
      expect(container.firstChild).to.have.class(classes.root);
    });

    it('renders the root as the specified element with adornments (no action)', () => {
      const { container } = render(
        <Chip component="span" label="My Chip" startAdornment={<CheckBox />} />,
      );

      expect(container.firstChild).to.have.tagName('span');
      expect(container.firstChild).to.have.class(classes.root);
    });

    it('slots.root takes precedence over component', () => {
      function CustomRoot({ ownerState, ...props }: any) {
        return <section {...props} />;
      }

      const { container } = render(
        <Chip
          component="li"
          label="My Chip"
          action={<ChipButton onClick={() => {}} />}
          slots={{ root: CustomRoot }}
        />,
      );

      expect(container.firstChild).to.have.tagName('section');
      expect(container.firstChild).to.have.class(classes.root);
    });
  });

  describe('focus', () => {
    it.skipIf(isJsdom())('uses the primary focus ring color for actionable primary chips', () => {
      render(<Chip color="primary" label="Chip" action={<ChipButton onClick={() => {}} />} />);

      const button = screen.getByRole('button');
      const chip = button.parentElement;

      focusVisible(button);

      expect(chip).toHaveComputedStyle({
        outlineColor: hexToRgb(defaultTheme.palette.primary.main),
      });
    });
  });

  describe('warnings', () => {
    it('warns when action receives a non-ChipButton/ChipLink element', () => {
      expect(() => {
        render(<Chip label="Chip" action={<button type="button">click</button>} />);
      }).toErrorDev([
        'MUI: The `action` prop expects a `<ChipButton>` or `<ChipLink>` component.',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: The `action` prop expects a `<ChipButton>` or `<ChipLink>` component.',
      ]);
    });

    const onDeleteAdornmentWarning = [
      'MUI: The `onDelete` prop is incompatible with the `startAdornment` and `endAdornment` props. ' +
        'Use `<ChipDelete>` as an adornment instead.',
      !strictModeDoubleLoggingSuppressed &&
        'MUI: The `onDelete` prop is incompatible with the `startAdornment` and `endAdornment` props. ' +
          'Use `<ChipDelete>` as an adornment instead.',
    ];

    it('warns when startAdornment is mixed with onDelete', () => {
      expect(() => {
        render(<Chip label="Chip" onDelete={() => {}} startAdornment={<ChipDelete />} />);
      }).toErrorDev(onDeleteAdornmentWarning);
    });

    it('warns when endAdornment is mixed with onDelete', () => {
      expect(() => {
        render(<Chip label="Chip" onDelete={() => {}} endAdornment={<ChipDelete />} />);
      }).toErrorDev(onDeleteAdornmentWarning);
    });

    it('does not warn when both adornments use ChipDelete', () => {
      expect(() => {
        render(<Chip label="Chip" startAdornment={<ChipDelete />} endAdornment={<ChipDelete />} />);
      }).not.toErrorDev();
    });

    it('warns when adornments are used with onClick but no action', () => {
      expect(() => {
        render(<Chip label="Chip" startAdornment={<ChipDelete />} onClick={() => {}} />);
      }).toErrorDev([
        'MUI: The `onClick` and `clickable` props have no effect when `startAdornment` or ' +
          '`endAdornment` is provided without `action`. ' +
          'Use `action={<ChipButton onClick={...} />}` to make the chip interactive.',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: The `onClick` and `clickable` props have no effect when `startAdornment` or ' +
            '`endAdornment` is provided without `action`. ' +
            'Use `action={<ChipButton onClick={...} />}` to make the chip interactive.',
      ]);
    });

    it('warns when adornments are used with clickable but no action', () => {
      expect(() => {
        render(<Chip label="Chip" endAdornment={<ChipDelete />} clickable />);
      }).toErrorDev([
        'MUI: The `onClick` and `clickable` props have no effect when `startAdornment` or ' +
          '`endAdornment` is provided without `action`. ' +
          'Use `action={<ChipButton onClick={...} />}` to make the chip interactive.',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: The `onClick` and `clickable` props have no effect when `startAdornment` or ' +
            '`endAdornment` is provided without `action`. ' +
            'Use `action={<ChipButton onClick={...} />}` to make the chip interactive.',
      ]);
    });
  });
});
