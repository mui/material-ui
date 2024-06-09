import * as React from 'react';
import {
  Select as BaseSelect,
  SelectProps,
  selectClasses,
  SelectRootSlotProps,
} from '@mui/base/Select';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { styled } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';

export default function UnstyledSelectObjectValues() {
  const [character, setCharacter] = React.useState<Character | null>(characters[0]);
  return (
    <div>
      <Select
        value={character}
        onChange={(event, newValue) => setCharacter(newValue)}
      >
        {characters.map((c) => (
          <Option key={c.name} value={c}>
            {c.name}
          </Option>
        ))}
      </Select>
      <Paragraph>Selected character:</Paragraph>
      <Pre>{JSON.stringify(character, null, 2)}</Pre>
    </div>
  );
}

function Select<TValue extends {}, Multiple extends boolean = false>(
  props: SelectProps<TValue, Multiple>,
) {
  const slots: SelectProps<TValue, Multiple>['slots'] = {
    root: Button,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} slots={slots} />;
}

interface Character {
  name: string;
  race: string;
}

const characters: Character[] = [
  { name: 'Frodo', race: 'Hobbit' },
  { name: 'Sam', race: 'Hobbit' },
  { name: 'Merry', race: 'Hobbit' },
  { name: 'Gandalf', race: 'Maia' },
  { name: 'Gimli', race: 'Dwarf' },
];

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
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean,
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { ownerState, ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </StyledButton>
  );
});

const StyledButton = styled('button', { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 320px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  position: relative;
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 2px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
  };
  `,
);

const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
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

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
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

const Popup = styled('div')`
  z-index: 1;
`;

const Paragraph = styled('p')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin: 12px 0;
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
  `,
);

const Pre = styled('pre')(
  ({ theme }) => `
  font-family: monospace;
  font-size: 0.75rem;
  color: ${theme.palette.mode === 'dark' ? '#FFF' : '#000'};
  `,
);
