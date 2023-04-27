import * as React from 'react';
import PropTypes from 'prop-types';
import Select, { selectClasses } from '@mui/base/Select';

import Option, { optionClasses } from '@mui/base/Option';
import Popper from '@mui/base/Popper';
import { styled } from '@mui/system';
import Box from '@mui/system/Box';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(Option)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(Popper)`
  z-index: 1;
`;

const Label = styled('label')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.85rem;
  display: block;
  margin-bottom: 4px;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? grey[400] : grey[700]};
  `,
);

const Button = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  vertical-align: middle;

  &:hover {
    background-color: ${blue[600]};
  }
`;

function CustomSelect(props) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} slots={slots} />;
}

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    popper: PropTypes.func,
    root: PropTypes.elementType,
  }),
};

const characters = [
  { name: 'Frodo', race: 'Hobbit' },
  { name: 'Sam', race: 'Hobbit' },
  { name: 'Merry', race: 'Hobbit' },
  { name: 'Gandalf', race: 'Maia' },
  { name: 'Gimli', race: 'Dwarf' },
];

export default function UnstyledSelectObjectValuesForm() {
  const getSerializedValue = (option) => {
    if (option?.value == null) {
      return '';
    }

    return `${option.value.race}.${option.value.name}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    alert(`character=${formData.get('character')}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <div>
            <Label
              id="object-value-default-label"
              htmlFor="object-value-default-button"
            >
              Default behavior
            </Label>
            <CustomSelect
              name="character"
              id="object-value-default-button"
              aria-labelledby="object-value-default-label object-value-default-button"
            >
              {characters.map((character) => (
                <StyledOption key={character.name} value={character}>
                  {character.name}
                </StyledOption>
              ))}
            </CustomSelect>
          </div>
          <Button sx={{ ml: 1 }} type="submit">
            Submit
          </Button>
        </Box>
      </form>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
          <div>
            <Label
              id="object-value-serialize-label"
              htmlFor="object-value-serialize-button"
            >
              Custom getSerializedValue
            </Label>
            <CustomSelect
              getSerializedValue={getSerializedValue}
              name="character"
              id="object-value-serialize-button"
              aria-labelledby="object-value-serialize-label object-value-serialize-button"
            >
              {characters.map((character) => (
                <StyledOption key={character.name} value={character}>
                  {character.name}
                </StyledOption>
              ))}
            </CustomSelect>
          </div>
          <Button sx={{ ml: 1 }} type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}
