import * as React from 'react';
import SelectUnstyled, {
  SelectUnstyledProps,
  Option,
  selectUnstyledClasses,
  OptionGroup,
} from '@mui/base/SelectUnstyled';
import { styled } from '@mui/system';

const StyledButton = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
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
  color: #000;

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
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background-color: #fff;
  min-width: 200px;
  border: 1px solid #ccc;
  border-top: none;
  color: #000;
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

const StyledGroupRoot = styled('li')`
  list-style: none;
`;

const StyledGroupHeader = styled('span')`
  display: block;
  padding: 10px 10px 4px 10px;
  font-size: 0.75em;
  text-transform: uppercase;
`;

const StyledGroupOptions = styled('ul')`
  list-style: none;
  margin-left: 0;
  padding: 0;

  > li {
    padding-left: 20px;
  }
`;

const CustomSelect = React.forwardRef(function CustomSelect(
  props: SelectUnstyledProps<string>,
  ref: React.ForwardedRef<any>,
) {
  const components: SelectUnstyledProps<string>['components'] = {
    Root: StyledButton,
    ListboxRoot: StyledListbox,
    ListboxOption: StyledOption,
    ListboxOptionGroupRoot: StyledGroupRoot,
    ListboxOptionGroupHeader: StyledGroupHeader,
    ListboxOptionGroupOptions: StyledGroupOptions,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

export default function UnstyledSelectGrouping() {
  return (
    <CustomSelect>
      <OptionGroup label="Hobbits">
        <Option value="Frodo">Frodo</Option>
        <Option value="Sam">Sam</Option>
        <Option value="Merry">Merry</Option>
        <Option value="Pippin">Pippin</Option>
      </OptionGroup>
      <OptionGroup label="Elves">
        <Option value="Galadriel">Galadriel</Option>
        <Option value="Legolas">Legolas</Option>
      </OptionGroup>
    </CustomSelect>
  );
}
