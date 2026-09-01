import { describe, it, expect, beforeEach } from 'vitest';
import * as React from 'react';
import {
  createRenderer,
  screen,
  ErrorBoundary,
  act,
  fireEvent,
  reactMajor,
  isJsdom,
  flushEffects,
} from '@mui/internal-test-utils';
import { spy } from 'sinon';
import useAutocomplete, { createFilterOptions } from '@mui/material/useAutocomplete';

describe('useAutocomplete', () => {
  const { render } = createRenderer();

  it('should preserve DOM nodes of options when re-ordering', () => {
    function Test(props) {
      const { options } = props;
      const {
        groupedOptions,
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
      } = useAutocomplete({
        options,
        open: true,
      });

      return (
        <div>
          <div {...getRootProps()}>
            <label {...getInputLabelProps()}>useAutocomplete</label>
            <input {...getInputProps()} />
          </div>
          {groupedOptions.length > 0 ? (
            <ul {...getListboxProps()}>
              {groupedOptions.map((option, index) => {
                const { key, ...optionProps } = getOptionProps({ option, index });
                return (
                  <li key={key} {...optionProps}>
                    {option}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      );
    }

    const view = render(<Test options={['foo', 'bar']} />);
    const [fooOptionAsFirst, barOptionAsSecond] = screen.getAllByRole('option');
    view.rerender(<Test options={['bar', 'foo']} />);
    const [barOptionAsFirst, fooOptionAsSecond] = screen.getAllByRole('option');

    // If the DOM nodes are not preserved VO will not read the first option again since it thinks it didn't change.
    expect(fooOptionAsFirst).to.equal(fooOptionAsSecond);
    expect(barOptionAsFirst).to.equal(barOptionAsSecond);
  });

  describe('createFilterOptions', () => {
    it('defaults to getOptionLabel for text filtering', () => {
      const filterOptions = createFilterOptions();

      const getOptionLabel = (option) => option.name;
      const options = [
        {
          id: '1234',
          name: 'cat',
        },
        {
          id: '5678',
          name: 'dog',
        },
        {
          id: '9abc',
          name: 'emu',
        },
      ];

      expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal([
        options[0],
      ]);
    });

    it('filters without error with empty option set', () => {
      const filterOptions = createFilterOptions();

      const getOptionLabel = (option) => option.name;
      const options = [];

      expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal([]);
    });

    describe('option: limit', () => {
      it('limits the number of suggested options to be shown', () => {
        const filterOptions = createFilterOptions({ limit: 2 });

        const getOptionLabel = (option) => option.name;
        const options = [
          {
            id: '1234',
            name: 'a1',
          },
          {
            id: '5678',
            name: 'a2',
          },
          {
            id: '9abc',
            name: 'a3',
          },
          {
            id: '9abc',
            name: 'a4',
          },
        ];

        expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal([
          options[0],
          options[1],
        ]);
      });
    });

    describe('option: matchFrom', () => {
      let filterOptions;
      let getOptionLabel;
      let options;

      beforeEach(() => {
        filterOptions = createFilterOptions({ matchFrom: 'any' });
        getOptionLabel = (option) => option.name;
        options = [
          {
            id: '1234',
            name: 'ab',
          },
          {
            id: '5678',
            name: 'ba',
          },
          {
            id: '9abc',
            name: 'ca',
          },
        ];
      });

      describe('any', () => {
        it('show all results that match', () => {
          expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal(
            options,
          );
        });
      });

      describe('empty', () => {
        it('does not call getOptionLabel if filter is empty', () => {
          const getOptionLabelSpy = spy(getOptionLabel);
          expect(
            filterOptions(options, { inputValue: '', getOptionLabel: getOptionLabelSpy }),
          ).to.deep.equal(options);
          expect(getOptionLabelSpy.callCount).to.equal(0);
        });
      });

      describe('start', () => {
        it('show only results that start with search', () => {
          expect(filterOptions(options, { inputValue: 'a', getOptionLabel })).to.deep.equal(
            options,
          );
        });
      });
    });

    describe('option: ignoreAccents', () => {
      it('does not ignore accents', () => {
        const filterOptions = createFilterOptions({ ignoreAccents: false });

        const getOptionLabel = (option) => option.name;
        const options = [
          {
            id: '1234',
            name: 'áb',
          },
          {
            id: '5678',
            name: 'ab',
          },
          {
            id: '9abc',
            name: 'áe',
          },
          {
            id: '9abc',
            name: 'ae',
          },
        ];

        expect(filterOptions(options, { inputValue: 'á', getOptionLabel })).to.deep.equal([
          options[0],
          options[2],
        ]);
      });
    });

    describe('option: ignoreCase', () => {
      it('matches results with case insensitive', () => {
        const filterOptions = createFilterOptions({ ignoreCase: false });

        const getOptionLabel = (option) => option.name;
        const options = [
          {
            id: '1234',
            name: 'Ab',
          },
          {
            id: '5678',
            name: 'ab',
          },
          {
            id: '9abc',
            name: 'Ae',
          },
          {
            id: '9abc',
            name: 'ae',
          },
        ];

        expect(filterOptions(options, { inputValue: 'A', getOptionLabel })).to.deep.equal([
          options[0],
          options[2],
        ]);
      });
    });
  });

  // can't catch render errors in the browser for unknown reason
  // tried try-catch + error boundary + window onError preventDefault
  // TODO is this fixed?
  it.skipIf(!isJsdom())('should warn if the input is not bound', async () => {
    function Test(props) {
      const { options } = props;
      const {
        groupedOptions,
        getRootProps,
        getInputLabelProps,
        // getInputProps,
        getListboxProps,
        getOptionProps,
      } = useAutocomplete({
        options,
        open: true,
      });

      return (
        <div>
          <div {...getRootProps()}>
            <label {...getInputLabelProps()}>useAutocomplete</label>
          </div>
          {groupedOptions.length > 0 ? (
            <ul {...getListboxProps()}>
              {groupedOptions.map((option, index) => {
                const { key, ...optionProps } = getOptionProps({ option, index });
                return (
                  <li key={key} {...optionProps}>
                    {option}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      );
    }

    const muiErrorMessage = 'MUI: Unable to find the input element.';
    const aboveErrorUlElementMessage = 'The above error occurred in the <ul> component';
    const aboveErrorTestComponentMessage = 'The above error occurred in the <Test> component';
    const node16ErrorMessage =
      "TypeError: Cannot read properties of null (reading 'removeAttribute')";
    const olderNodeErrorMessage = "TypeError: Cannot read property 'removeAttribute' of null";

    const nodeVersion = Number(process.versions.node.split('.')[0]);
    const nodeErrorMessage = nodeVersion >= 16 ? node16ErrorMessage : olderNodeErrorMessage;

    const defaultErrorMessages = [muiErrorMessage, nodeErrorMessage, nodeErrorMessage];

    const errorMessagesByReactMajor = {
      17: [
        nodeErrorMessage,
        muiErrorMessage,
        nodeErrorMessage,
        aboveErrorUlElementMessage,
        aboveErrorTestComponentMessage,
      ],
      18: [
        nodeErrorMessage,
        muiErrorMessage,
        nodeErrorMessage,
        muiErrorMessage,
        nodeErrorMessage,
        aboveErrorUlElementMessage,
        aboveErrorTestComponentMessage,
        aboveErrorTestComponentMessage,
      ],
      19: [
        muiErrorMessage,
        muiErrorMessage,
        nodeErrorMessage,
        nodeErrorMessage,
        nodeErrorMessage,
        nodeErrorMessage,
      ],
    };

    const devErrorMessages = errorMessagesByReactMajor[reactMajor] || defaultErrorMessages;

    expect(() => {
      render(
        <ErrorBoundary>
          <Test options={['foo', 'bar']} />
        </ErrorBoundary>,
      );
    }).toErrorDev(devErrorMessages);

    await flushEffects();
  });

  it('should not crash when the input ref is cleared before a pending highlighted index sync', async () => {
    function Test() {
      const [showAutocomplete, setShowAutocomplete] = React.useState(true);
      const options = showAutocomplete ? ['foo', 'bar'] : [];
      const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } =
        useAutocomplete({ options, open: true });

      return (
        <React.Fragment>
          <button type="button" onClick={() => setShowAutocomplete(false)}>
            Hide
          </button>
          <div {...getRootProps()}>
            {showAutocomplete ? <input {...getInputProps()} /> : null}
            {groupedOptions.length > 0 ? (
              <ul {...getListboxProps()}>
                {groupedOptions.map((option, index) => {
                  const { key, ...optionProps } = getOptionProps({ option, index });
                  return (
                    <li key={key} {...optionProps}>
                      {option}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </React.Fragment>
      );
    }

    const { user } = render(<Test />);

    // This hides the input/listbox while the hook stays mounted. A full unmount
    // doesn't run the highlighted index sync after refs are cleared; this state
    // update does, so it exercises the problematic ordering.
    await user.click(screen.getByRole('button', { name: 'Hide' }));

    await flushEffects();
  });

  describe('prop: freeSolo', () => {
    it('should not reset if the component value does not change on blur', () => {
      function Test(props) {
        const { options } = props;
        const { getInputProps } = useAutocomplete({ options, open: true, freeSolo: true });

        return <input {...getInputProps()} />;
      }
      render(<Test options={['foo', 'bar']} />);
      const input = screen.getByRole('combobox');

      fireEvent.change(input, { target: { value: 'free' } });
      act(() => {
        input.blur();
      });

      expect(input.value).to.equal('free');
    });
  });

  describe('getInputProps', () => {
    it('should disable input element', () => {
      function Test(props) {
        const { options } = props;
        const { getInputProps } = useAutocomplete({ options, disabled: true });

        return <input {...getInputProps()} />;
      }
      render(<Test options={['foo', 'bar']} />);
      const input = screen.getByRole('combobox');

      expect(input).to.have.attribute('disabled');
    });
  });

  it('should allow tuples or arrays as value when multiple=false', () => {
    const defaultValue = ['bar'];

    function Test() {
      const { getClearProps, getInputProps } = useAutocomplete({
        defaultValue,
        disableClearable: false,
        getOptionLabel: ([val]) => val,
        isOptionEqualToValue: (option, value) => {
          if (option === value) {
            return true;
          }
          return option[0] === value[0];
        },
        multiple: false,
        options: [['foo'], defaultValue, ['baz']],
      });

      return (
        <div>
          <input {...getInputProps()} />
          <button data-testid="button" {...getClearProps()} />;
        </div>
      );
    }

    render(<Test />);

    const button = screen.getByTestId('button');

    expect(() => {
      fireEvent.click(button);
    }).not.to.throw();
  });

  describe('prop: isOptionEqualToValue', () => {
    it('should respect custom equality even when option is referentially equal to value', () => {
      const option = { id: 1, label: 'foo' };

      function Test() {
        const { groupedOptions, getInputProps, getListboxProps, getOptionProps } = useAutocomplete({
          options: [option],
          open: true,
          multiple: true,
          value: [option],
          filterSelectedOptions: true,
          getOptionLabel: (optionParam) => optionParam.label,
          isOptionEqualToValue: () => false,
        });

        return (
          <div>
            <input {...getInputProps()} />
            <ul {...getListboxProps()}>
              {groupedOptions.map((optionParam, index) => {
                const { key, ...optionProps } = getOptionProps({ option: optionParam, index });
                return (
                  <li key={key} {...optionProps}>
                    {optionParam.label}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }

      render(<Test />);

      const renderedOption = screen.getByRole('option');
      expect(renderedOption).to.have.text('foo');
      expect(renderedOption).to.have.attribute('aria-selected', 'false');
    });
  });

  describe('prop: getOptionValue', () => {
    const options = [
      { id: 'foo', label: 'Foo' },
      { id: 'bar', label: 'Bar' },
    ];

    function Test(props) {
      const { groupedOptions, getInputProps, getListboxProps, getOptionProps } = useAutocomplete({
        options,
        open: true,
        multiple: true,
        value: ['foo'],
        getOptionLabel: (option) => option.label,
        getOptionValue: (option) => option.id,
        ...props,
      });

      return (
        <div>
          <input {...getInputProps()} />
          <ul {...getListboxProps()}>
            {groupedOptions.map((option, index) => {
              const { key, ...optionProps } = getOptionProps({ option, index });
              return (
                <li key={key} {...optionProps}>
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    it('uses the mapped option value for default equality', () => {
      render(<Test />);

      expect(screen.getByRole('option', { name: 'Foo' })).to.have.attribute(
        'aria-selected',
        'true',
      );
      expect(screen.getByRole('option', { name: 'Bar' })).to.have.attribute(
        'aria-selected',
        'false',
      );
    });

    it('returns the mapped option value when selecting a single option', async () => {
      const onChange = spy();

      const { user } = render(
        <Test
          multiple={false}
          value={undefined}
          getOptionLabel={(option) => option.label ?? option}
          onChange={onChange}
        />,
      );
      await user.click(screen.getByRole('option', { name: 'Bar' }));

      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.equal('bar');
      expect(onChange.args[0][2]).to.equal('selectOption');
      expect(onChange.args[0][3]).to.deep.equal({ option: options[1] });
    });

    it('appends the mapped option value when selecting multiple options', async () => {
      const onChange = spy();

      const { user } = render(<Test onChange={onChange} />);
      await user.click(screen.getByRole('option', { name: 'Bar' }));

      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.deep.equal(['foo', 'bar']);
      expect(onChange.args[0][2]).to.equal('selectOption');
      expect(onChange.args[0][3]).to.deep.equal({ option: options[1] });
    });

    it('uses the mapped option value when filtering selected options', () => {
      render(<Test filterSelectedOptions />);

      expect(screen.queryByRole('option', { name: 'Foo' })).to.equal(null);
      expect(screen.getByRole('option', { name: 'Bar' })).to.have.attribute(
        'aria-selected',
        'false',
      );
    });

    it('uses mapped equality when toggling an already selected option', async () => {
      const onChange = spy();

      const { user } = render(<Test onChange={onChange} />);
      await user.click(screen.getByRole('option', { name: 'Foo' }));

      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.deep.equal([]);
      expect(onChange.args[0][2]).to.equal('removeOption');
      expect(onChange.args[0][3]).to.deep.equal({ option: options[0] });
    });

    it('gives a custom isOptionEqualToValue precedence over mapped default equality', () => {
      const isOptionEqualToValue = spy(() => false);

      render(<Test isOptionEqualToValue={isOptionEqualToValue} />);

      expect(isOptionEqualToValue.calledWith(options[0], 'foo')).to.equal(true);
      expect(screen.getByRole('option', { name: 'Foo' })).to.have.attribute(
        'aria-selected',
        'false',
      );
    });

    it('uses the default getOptionValue when no getOptionValue is provided', () => {
      render(<Test getOptionValue={undefined} value={[options[0]]} />);

      expect(screen.getByRole('option', { name: 'Foo' })).to.have.attribute(
        'aria-selected',
        'true',
      );
      expect(screen.getByRole('option', { name: 'Bar' })).to.have.attribute(
        'aria-selected',
        'false',
      );
    });

    function ValidationTest({ options: optionsProp, getOptionValue }) {
      const { getInputProps } = useAutocomplete({ options: optionsProp, getOptionValue });
      return <input {...getInputProps()} />;
    }

    it.each([
      { description: 'an object', optionValue: {}, returnedValue: 'a value of type object' },
      { description: 'null', optionValue: null, returnedValue: 'null' },
      {
        description: 'undefined',
        optionValue: undefined,
        returnedValue: 'a value of type undefined',
      },
      {
        description: 'a symbol',
        optionValue: Symbol('value'),
        returnedValue: 'a value of type symbol',
      },
      { description: 'NaN', optionValue: NaN, returnedValue: 'NaN' },
    ])('warns when getOptionValue returns $description', ({ optionValue, returnedValue }) => {
      expect(() => {
        render(<ValidationTest options={[{}]} getOptionValue={() => optionValue} />, {
          strict: false,
        });
      }).toErrorDev(
        `MUI: The \`getOptionValue\` method of useAutocomplete returned ${returnedValue}, which is not a valid option value.\n` +
          'useAutocomplete uses this value to identify and match options. ' +
          'Return a unique string, number, bigint, or boolean for every option.',
      );
    });

    it('warns once per duplicate mapped value', () => {
      expect(() => {
        render(
          <ValidationTest
            options={[{ id: 'duplicate' }, { id: 'duplicate' }, { id: 'duplicate' }]}
            getOptionValue={(option) => option.id}
          />,
          { strict: false },
        );
      }).toErrorDev([
        'MUI: The `getOptionValue` method of useAutocomplete returned the duplicate value "duplicate" for multiple options.\n' +
          'useAutocomplete uses these values to identify options. ' +
          'Change `getOptionValue` or the options so that every option has a unique value.',
      ]);
    });

    it('accepts supported primitive option values', () => {
      expect(() => {
        render(
          <ValidationTest options={['string', 1, 2n, true]} getOptionValue={(option) => option} />,
          { strict: false },
        );
      }).not.toErrorDev();
    });

    it('does not validate raw options when getOptionValue is not provided', () => {
      expect(() => {
        render(<ValidationTest options={[{ id: 'foo' }, { id: 'foo' }]} />, { strict: false });
      }).not.toErrorDev();
    });
  });

  describe('prop: defaultValue', () => {
    it('should not trigger onInputChange when defaultValue is provided', () => {
      const onInputChange = spy();
      const defaultValue = 'foo';

      function Test() {
        const { getInputProps } = useAutocomplete({
          defaultValue,
          onInputChange,
          options: ['foo', 'bar'],
        });

        return <input {...getInputProps()} />;
      }

      render(<Test />);
      expect(onInputChange.callCount).to.equal(0);
    });
  });

  describe('prop: value', () => {
    it('should not trigger onInputChange when value is provided', () => {
      const onInputChange = spy();

      function Test() {
        const [value, setValue] = React.useState('foo');
        const { getInputProps } = useAutocomplete({
          value,
          onChange: (event, valueParam) => setValue(valueParam),
          onInputChange,
          options: ['foo', 'bar'],
        });

        return <input {...getInputProps()} />;
      }

      render(<Test />);
      expect(onInputChange.callCount).to.equal(0);
    });
  });

  describe('prop: multiple', () => {
    it('should set aria-multiselectable on the listbox when multiple prop is true', () => {
      function Test(props) {
        const { options } = props;
        const { getListboxProps, getInputProps } = useAutocomplete({
          options,
          open: true,
          multiple: true,
        });
        return (
          <div>
            <input {...getInputProps()} />
            <ul {...getListboxProps()} />;
          </div>
        );
      }

      render(<Test options={['foo', 'bar']} />);

      const listbox = screen.getByRole('listbox');

      expect(listbox).to.have.attribute('aria-multiselectable', 'true');
    });

    it('should not set aria-multiselectable on the listbox when multiple prop is false', () => {
      function Test(props) {
        const { options } = props;
        const { getListboxProps, getInputProps } = useAutocomplete({
          options,
          open: true,
          multiple: false,
        });
        return (
          <div>
            <input {...getInputProps()} />
            <ul {...getListboxProps()} />;
          </div>
        );
      }

      render(<Test options={['foo', 'bar']} />);
      const listbox = screen.getByRole('listbox');

      expect(listbox).to.not.have.attribute('aria-multiselectable');
    });
  });
});
