import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import Chip from '@mui/material/Chip';
import ChipButton, { chipButtonClasses as classes } from '@mui/material/ChipButton';
import * as ripple from '../../test/ripple';

describe('<ChipButton />', () => {
  const { render } = createRenderer();

  describe('rendering', () => {
    it('renders a button element inside Chip', () => {
      render(<Chip label="Chip" action={<ChipButton onClick={() => {}} />} />);

      const button = screen.getByRole('button');
      expect(button).to.have.class(classes.root);
      expect(button).to.have.attribute('type', 'button');
    });

    it('renders the label text inside the button', () => {
      render(<Chip label="Click me" action={<ChipButton onClick={() => {}} />} />);

      const button = screen.getByRole('button');
      expect(button).to.have.text('Click me');
    });

    it('renders with muiName for Chip validation', () => {
      expect((ChipButton as any).muiName).to.equal('ChipButton');
    });
  });

  describe('interaction', () => {
    it('fires onClick', () => {
      const handleClick = spy();
      render(<Chip label="Chip" action={<ChipButton onClick={handleClick} />} />);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick.callCount).to.equal(1);
    });

    it('composes onKeyDown', () => {
      const handleKeyDown = spy();
      render(
        <Chip label="Chip" action={<ChipButton onClick={() => {}} onKeyDown={handleKeyDown} />} />,
      );

      const button = screen.getByRole('button');
      act(() => {
        button.focus();
      });
      fireEvent.keyDown(button, { key: 'Enter' });
      expect(handleKeyDown.callCount).to.equal(1);
    });
  });

  describe('disabled + focusableWhenDisabled', () => {
    it('inherits disabled from parent Chip', () => {
      render(<Chip label="Chip" disabled action={<ChipButton onClick={() => {}} />} />);

      const button = screen.getByRole('button');
      expect(button).to.have.attribute('aria-disabled', 'true');
    });

    it('renders aria-disabled instead of disabled when focusableWhenDisabled (default)', () => {
      render(<Chip label="Chip" disabled action={<ChipButton onClick={() => {}} />} />);

      const button = screen.getByRole('button');
      expect(button).to.have.attribute('aria-disabled', 'true');
      expect(button).not.to.have.attribute('disabled');
    });

    it('renders disabled when focusableWhenDisabled=false', () => {
      render(
        <Chip
          label="Chip"
          disabled
          action={<ChipButton onClick={() => {}} focusableWhenDisabled={false} />}
        />,
      );

      const button = screen.getByRole('button');
      expect(button).to.have.attribute('disabled');
    });

    it('does not fire onClick when disabled', () => {
      const handleClick = spy();
      render(<Chip label="Chip" disabled action={<ChipButton onClick={handleClick} />} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(handleClick.callCount).to.equal(0);
    });
  });

  describe('ripple', () => {
    const RIPPLE_CLASS = '.MuiTouchRipple-root';

    it('mounts TouchRipple after mouseDown', async () => {
      render(<Chip label="Chip" action={<ChipButton onClick={() => {}} />} />);

      const button = screen.getByRole('button');
      expect(button.querySelector(RIPPLE_CLASS)).to.equal(null);

      await ripple.startTouch(button);
      expect(button.querySelector(RIPPLE_CLASS)).not.to.equal(null);
    });

    it('does not mount ripple when disabled', () => {
      render(<Chip label="Chip" disabled action={<ChipButton onClick={() => {}} />} />);

      const button = screen.getByRole('button');
      fireEvent.mouseDown(button);
      expect(button.querySelector(RIPPLE_CLASS)).to.equal(null);
    });
  });

  describe('type behavior', () => {
    it('always renders type="button" for native button roots', () => {
      render(<Chip label="Chip" action={<ChipButton onClick={() => {}} type="submit" />} />);

      const button = screen.getByRole('button');
      expect(button).to.have.attribute('type', 'button');
    });
  });

  describe('component prop', () => {
    it('component="div" renders a <div> with role="button" and no type attribute', () => {
      render(<Chip label="Chip" action={<ChipButton component="div" onClick={() => {}} />} />);

      const el = screen.getByRole('button');
      expect(el.tagName).to.equal('DIV');
      expect(el).not.to.have.attribute('type');
    });

    it('ref points to the rendered root when using custom component', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Chip label="Chip" action={<ChipButton component="div" ref={ref} onClick={() => {}} />} />,
      );

      expect(ref.current).not.to.equal(null);
      expect(ref.current!.tagName).to.equal('DIV');
    });

    it('non-native roots get tabIndex={0} by default', () => {
      render(<Chip label="Chip" action={<ChipButton component="div" onClick={() => {}} />} />);

      const el = screen.getByRole('button');
      expect(el).to.have.attribute('tabindex', '0');
    });

    it('Enter activates click on non-native roots', () => {
      const handleClick = spy();
      render(<Chip label="Chip" action={<ChipButton component="div" onClick={handleClick} />} />);

      const el = screen.getByRole('button');
      act(() => {
        el.focus();
      });
      fireEvent.keyDown(el, { key: 'Enter' });
      expect(handleClick.callCount).to.equal(1);
    });

    it('Space activates click on non-native roots', () => {
      const handleClick = spy();
      render(<Chip label="Chip" action={<ChipButton component="div" onClick={handleClick} />} />);

      const el = screen.getByRole('button');
      act(() => {
        el.focus();
      });
      fireEvent.keyDown(el, { key: ' ' });
      expect(handleClick.callCount).to.equal(0);
      fireEvent.keyUp(el, { key: ' ' });
      expect(handleClick.callCount).to.equal(1);
    });

    it('disabled non-native root: click handler does not fire', () => {
      const handleClick = spy();
      render(
        <Chip
          label="Chip"
          disabled
          action={<ChipButton component="div" onClick={handleClick} />}
        />,
      );

      const el = screen.getByRole('button');
      fireEvent.click(el);
      expect(handleClick.callCount).to.equal(0);
    });

    it('disabled + focusableWhenDisabled works for non-native roots', () => {
      render(
        <Chip label="Chip" disabled action={<ChipButton component="div" onClick={() => {}} />} />,
      );

      const el = screen.getByRole('button');
      expect(el).to.have.attribute('aria-disabled', 'true');
      expect(el).not.to.have.attribute('disabled');
    });

    it('component does not leak as a DOM attribute', () => {
      render(<Chip label="Chip" action={<ChipButton component="div" onClick={() => {}} />} />);

      const el = screen.getByRole('button');
      expect(el).not.to.have.attribute('component');
    });

    it('component="a" without href behaves like a non-native button', () => {
      render(<Chip label="Chip" action={<ChipButton component="a" onClick={() => {}} />} />);

      const el = screen.getByRole('button');
      expect(el.tagName).to.equal('A');
      expect(el).to.have.attribute('role', 'button');
      expect(el).not.to.have.attribute('type');
    });
  });

  describe('prop: nativeButton', () => {
    it('applies native button semantics by default for custom components rendering <button>', () => {
      const CustomButton = React.forwardRef<HTMLButtonElement>(function CustomButton(props, ref) {
        return <button ref={ref} {...props} />;
      });

      render(
        <Chip label="Chip" action={<ChipButton component={CustomButton} onClick={() => {}} />} />,
      );

      const button = screen.getByRole('button');
      expect(button).to.have.property('tagName', 'BUTTON');
      expect(button).to.have.attribute('type', 'button');
      expect(button).not.to.have.attribute('role');
    });

    it('uses native disabled by default for custom components rendering <button>', () => {
      const CustomButton = React.forwardRef<HTMLButtonElement>(function CustomButton(props, ref) {
        return <button ref={ref} {...props} />;
      });

      render(
        <Chip
          label="Chip"
          disabled
          action={
            <ChipButton component={CustomButton} focusableWhenDisabled={false} onClick={() => {}} />
          }
        />,
      );

      const button = screen.getByRole('button');
      expect(button).to.have.attribute('disabled');
      expect(button).not.to.have.attribute('role');
    });

    it('nativeButton={false} applies non-native semantics for custom components', () => {
      const CustomSpan = React.forwardRef<HTMLSpanElement>(function CustomSpan(props, ref) {
        return <span ref={ref} {...props} />;
      });

      render(
        <Chip
          label="Chip"
          action={<ChipButton component={CustomSpan} nativeButton={false} onClick={() => {}} />}
        />,
      );

      const el = screen.getByRole('button');
      expect(el).to.have.property('tagName', 'SPAN');
      expect(el).to.have.attribute('role', 'button');
      expect(el).not.to.have.attribute('type');
    });

    it('warns when a custom component renders a non-button without nativeButton', () => {
      const CustomSpan = React.forwardRef<HTMLSpanElement>(function CustomSpan(props, ref) {
        return <span ref={ref} {...props} />;
      });
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Chip label="Chip" action={<ChipButton component={CustomSpan} onClick={() => {}} />} />,
      );

      const messages = errorSpy.mock.calls.map((call) => String(call[0]).toLowerCase());
      expect(
        messages.some((msg) => msg.includes('nativebutton') && msg.includes('non-<button>')),
      ).to.equal(true);
      errorSpy.mockRestore();
    });
  });
});
