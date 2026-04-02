import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import Chip, { chipClasses } from '@mui/material/Chip';
import ChipLink, { chipLinkClasses as classes } from '@mui/material/ChipLink';
import * as rippleTest from '../../test/ripple';

describe('<ChipLink />', () => {
  const { render } = createRenderer();

  describe('rendering', () => {
    it('renders an <a> element inside Chip', () => {
      render(<Chip label="Chip" action={<ChipLink href="#" />} />);

      const link = screen.getByRole('link');
      expect(link).to.have.class(classes.root);
      expect(link).to.have.tagName('A');
      expect(link).to.have.attribute('href', '#');
    });

    it('renders the label text inside the link', () => {
      render(<Chip label="Visit" action={<ChipLink href="#" />} />);

      const link = screen.getByRole('link');
      expect(link).to.have.text('Visit');
    });

    it('renders with muiName for Chip validation', () => {
      expect((ChipLink as any).muiName).to.equal('ChipLink');
    });
  });

  describe('interaction', () => {
    it('fires onClick on the link', () => {
      const handleClick = spy();
      render(<Chip label="Chip" action={<ChipLink href="#" onClick={handleClick} />} />);

      fireEvent.click(screen.getByRole('link'));
      expect(handleClick.callCount).to.equal(1);
    });

    it('composes onKeyDown handlers', () => {
      const handleKeyDown = spy();
      render(<Chip label="Chip" action={<ChipLink href="#" onKeyDown={handleKeyDown} />} />);

      const link = screen.getByRole('link');
      act(() => {
        link.focus();
      });
      fireEvent.keyDown(link, { key: 'Enter' });
      expect(handleKeyDown.callCount).to.equal(1);
    });
  });

  describe('ripple', () => {
    const RIPPLE_CLASS = '.MuiTouchRipple-root';

    it('mounts TouchRipple after mouseDown', async () => {
      render(<Chip label="Chip" action={<ChipLink href="#" />} />);

      const link = screen.getByRole('link');
      expect(link.querySelector(RIPPLE_CLASS)).to.equal(null);

      await rippleTest.startTouch(link);
      expect(link.querySelector(RIPPLE_CLASS)).not.to.equal(null);
    });
  });

  describe('focus', () => {
    it('can receive focus', () => {
      render(<Chip label="Chip" action={<ChipLink href="#" />} />);

      const link = screen.getByRole('link');
      act(() => {
        link.focus();
      });
      expect(document.activeElement).to.equal(link);
    });

    it('fires onFocus when focused', () => {
      const handleFocus = spy();
      render(<Chip label="Chip" action={<ChipLink href="#" onFocus={handleFocus} />} />);

      const link = screen.getByRole('link');
      act(() => {
        link.focus();
      });
      expect(handleFocus.callCount).to.equal(1);
    });

    it('fires onBlur when blurred', () => {
      const handleBlur = spy();
      render(<Chip label="Chip" action={<ChipLink href="#" onBlur={handleBlur} />} />);

      const link = screen.getByRole('link');
      act(() => {
        link.focus();
      });
      act(() => {
        link.blur();
      });
      expect(handleBlur.callCount).to.equal(1);
    });
  });

  describe('HTML attributes', () => {
    it('passes target and rel to the anchor element', () => {
      render(<Chip label="Chip" action={<ChipLink href="#" target="_blank" rel="noopener" />} />);

      const link = screen.getByRole('link');
      expect(link).to.have.attribute('target', '_blank');
      expect(link).to.have.attribute('rel', 'noopener');
    });

    it('forwards additional anchor attributes', () => {
      render(<Chip label="Download" action={<ChipLink href="/file.pdf" download="file.pdf" />} />);

      const link = screen.getByRole('link');
      expect(link).to.have.attribute('download', 'file.pdf');
    });
  });

  describe('keyboard', () => {
    it('fires onKeyUp on Space key', () => {
      const handleKeyUp = spy();
      render(<Chip label="Chip" action={<ChipLink href="#" onKeyUp={handleKeyUp} />} />);

      const link = screen.getByRole('link');
      act(() => {
        link.focus();
      });
      fireEvent.keyUp(link, { key: ' ' });
      expect(handleKeyUp.callCount).to.equal(1);
    });
  });

  describe('edge cases', () => {
    it('renders an empty link when Chip has no label', () => {
      render(<Chip action={<ChipLink href="#" />} />);

      const link = screen.getByRole('link');
      expect(link).to.have.text('');
    });
  });

  describe('ignores disabled from parent Chip', () => {
    it('does not render disabled attributes when Chip is not disabled', () => {
      render(<Chip label="Chip" action={<ChipLink href="#" />} />);

      const link = screen.getByRole('link');
      expect(link).not.to.have.attribute('disabled');
      expect(link).not.to.have.attribute('aria-disabled');
    });

    it('stays enabled even when Chip is disabled', () => {
      render(<Chip data-testid="chip" label="Chip" disabled action={<ChipLink href="#" />} />);

      const link = screen.getByRole('link');
      expect(link).not.to.have.attribute('aria-disabled');
      expect(link).to.have.attribute('href', '#');

      // Chip root should not have the disabled class either
      const root = screen.getByTestId('chip');
      expect(root).not.to.have.class(chipClasses.disabled);
    });

    it('fires onClick even when Chip is disabled', () => {
      const handleClick = spy();
      render(<Chip label="Chip" disabled action={<ChipLink href="#" onClick={handleClick} />} />);

      const link = screen.getByRole('link');
      fireEvent.click(link);
      expect(handleClick.callCount).to.equal(1);
    });
  });
});
