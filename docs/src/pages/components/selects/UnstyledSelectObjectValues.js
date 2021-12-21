import * as React from 'react';
import SelectUnstyled, {
  Option,
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import { styled } from '@mui/system';

const StyledButton = styled('button')`
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 200px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0.75em;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;

  &.${selectUnstyledClasses.focusVisible} {
    outline: 4px solid rgba(100, 100, 100, 0.3);
  }

  &.${selectUnstyledClasses.expanded} {
    border-radius: 0.75em 0.75em 0 0;

    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
`;

const StyledListbox = styled('ul')`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background-color: #fff;
  min-width: 200px;
  border: 1px solid #ccc;
  border-top: none;
`;

const StyledOption = styled('li')`
  list-style: none;
  padding: 4px 10px;
  margin: 0;
  border-bottom: 1px solid #ddd;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${selectUnstyledClasses.disabled} {
    color: #888;
  }

  &.${selectUnstyledClasses.selected} {
    background-color: rgba(25, 118, 210, 0.08);
  }

  &.${selectUnstyledClasses.highlighted} {
    background-color: #16d;
    color: #fff;
  }

  &.${selectUnstyledClasses.highlighted}.${selectUnstyledClasses.selected} {
    background-color: #05e;
    color: #fff;
  }

  &:hover:not(.${selectUnstyledClasses.disabled}) {
    background-color: #39e;
  }
`;

function CustomSelect(props) {
  const components = {
    Root: StyledButton,
    ListboxRoot: StyledListbox,
    ListboxOption: StyledOption,
  };

  return <SelectUnstyled {...props} components={components} />;
}

const characters = [
  { name: 'Frodo', race: 'Hobbit' },
  { name: 'Sam', race: 'Hobbit' },
  { name: 'Merry', race: 'Hobbit' },
  { name: 'Gandalf', race: 'Maia' },
  { name: 'Gimli', race: 'Dwarf' },
];

export default function UnstyledSelectObjectValues() {
  const [character, setCharacter] = React.useState(characters[0]);
  return (
    <div>
      <CustomSelect value={character} onChange={setCharacter}>
        {characters.map((c) => (
          <Option key={c.name} value={c}>
            {c.name}
          </Option>
        ))}
      </CustomSelect>

      <p>Selected character:</p>
      <pre>{JSON.stringify(character, null, 2)}</pre>
    </div>
  );
}
