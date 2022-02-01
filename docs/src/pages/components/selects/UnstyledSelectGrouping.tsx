import * as React from 'react';
import SelectUnstyled, {
  SelectUnstyledProps,
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import OptionGroupUnstyled, {
  OptionGroupUnstyledProps,
} from '@mui/base/OptionGroupUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
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

const StyledOption: typeof OptionUnstyled = styled(OptionUnstyled)`
  list-style: none;
  padding: 4px 10px;
  margin: 0;
  border-bottom: 1px solid #ddd;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.disabled} {
    color: #888;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: rgba(25, 118, 210, 0.08);
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: #16d;
    color: #fff;
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: #05e;
    color: #fff;
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
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

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

function CustomSelect(props: SelectUnstyledProps<string>) {
  const components: SelectUnstyledProps<string>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

const CustomOptionGroup = React.forwardRef(function CustomOptionGroup(
  props: OptionGroupUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  const components: OptionGroupUnstyledProps['components'] = {
    Root: StyledGroupRoot,
    Label: StyledGroupHeader,
    List: StyledGroupOptions,
    ...props.components,
  };

  return <OptionGroupUnstyled {...props} ref={ref} components={components} />;
});

export default function UnstyledSelectGrouping() {
  return (
    <CustomSelect>
      <CustomOptionGroup label="Hobbits">
        <StyledOption value="Frodo">Frodo</StyledOption>
        <StyledOption value="Sam">Sam</StyledOption>
        <StyledOption value="Merry">Merry</StyledOption>
        <StyledOption value="Pippin">Pippin</StyledOption>
      </CustomOptionGroup>
      <CustomOptionGroup label="Elves">
        <StyledOption value="Galadriel">Galadriel</StyledOption>
        <StyledOption value="Legolas">Legolas</StyledOption>
      </CustomOptionGroup>
    </CustomSelect>
  );
}
