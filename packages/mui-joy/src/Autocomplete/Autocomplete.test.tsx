import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, screen, act, fireEvent } from 'test/utils';
import Autocomplete, { autocompleteClasses as classes } from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';
import { ThemeProvider } from '@mui/joy/styles';

describe('Joy <Autocomplete />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Autocomplete options={[]} renderInput={(params) => <Input {...params} />} />,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      ThemeProvider,
      refInstanceof: window.HTMLDivElement,
      muiName: 'JoyAutocomplete',
      testDeepOverrides: { slotName: 'listbox', slotClassName: classes.listbox },
      skip: ['componentsProp', 'classesRoot'],
    }),
  );

  it('should be customizable in the theme', () => {
    render(
      <ThemeProvider
        theme={{
          components: {
            JoyAutocomplete: {
              styleOverrides: {
                listbox: {
                  mixBlendMode: 'darken',
                },
              },
            },
          },
        }}
      >
        <Autocomplete options={[]} open renderInput={(params) => <Input {...params} />} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('listbox')).to.toHaveComputedStyle({
      mixBlendMode: 'darken',
    });
  });

  describe('combobox', () => {
    it('should clear the input when blur', () => {
      const { getByRole } = render(
        <Autocomplete options={[]} renderInput={(params) => <Input {...params} />} />,
      );
      const input = getByRole('combobox') as HTMLInputElement;

      act(() => {
        input.focus();
        fireEvent.change(document.activeElement!, { target: { value: 'a' } });
      });

      expect(input.value).to.equal('a');

      act(() => {
        (document.activeElement as HTMLElement).blur();
      });
      expect(input.value).to.equal('');
    });

    it('should apply the icon classes', () => {
      const { container } = render(
        <Autocomplete
          value="one"
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} />}
        />,
      );
      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasClearIcon);
      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
    });
  });

  describe('prop: loading', () => {
    it('should show a loading message when open', () => {
      render(
        <Autocomplete
          options={[]}
          freeSolo
          loading
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      expect(document.querySelector(`.${classes.loading}`)?.textContent).to.equal('Loading…');
    });
  });
});
