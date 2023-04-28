import * as React from 'react';
import useAutocomplete from '@mui/base/useAutocomplete';
import { styled } from '@mui/system';

export default function ControlledStates() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: ['Firefox', 'Google Chrome', 'Microsoft Edge', 'Safari', 'Opera', ''],
    value,
    onChange: (event, newValue) => setValue(newValue),
    inputValue,
    onInputChange: (event, newInputValue) => setInputValue(newInputValue),
  });

  return (
    <Layout>
      <Pre>value: {value ?? ' '}</Pre>
      <Pre>inputValue: {inputValue ?? ' '}</Pre>
      <Autocomplete>
        <div {...getRootProps()}>
          <Label {...getInputLabelProps()}>Label</Label>
          <Input {...getInputProps()} />
        </div>
        {groupedOptions.length > 0 && (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>{option}</li>
            ))}
          </Listbox>
        )}
      </Autocomplete>
    </Layout>
  );
}

const Label = styled('label')`
  display: block;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Input = styled('input')(({ theme }) => ({
  width: 320,
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  color: theme.palette.mode === 'light' ? '#000' : '#fff',
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: 320,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  overflow: 'auto',
  maxHeight: 200,
  border: '1px solid rgba(0,0,0,.25)',
  '& li.Mui-focused': {
    backgroundColor: '#4a8df6',
    color: '#fff',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: '#fff',
  },
}));

const Autocomplete = styled('div')`
  margin: 1.5rem 0;
`;

const Layout = styled('div')`
  display: flex;
  flex-flow: column nowrap;
`;

const Pre = styled('pre')`
  margin: 0.5rem 0;
`;
