import * as React from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
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

const StyledOption = styled(OptionUnstyled)`
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

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
};

function ColorDot(props) {
  return (
    <div
      style={{
        display: 'inline-block',
        width: '0.75em',
        height: '0.75em',
        borderRadius: '50%',
        backgroundColor: props.color,
        marginRight: '0.5em',
      }}
    />
  );
}

ColorDot.propTypes = {
  color: PropTypes.string.isRequired,
};

export default function UnstyledSelectRichOptions() {
  return (
    <CustomSelect>
      <StyledOption value="#ff0000">
        <span>
          <ColorDot color="#ff0000" />
          Red
        </span>
      </StyledOption>
      <StyledOption value="#00ff00">
        <span>
          <ColorDot color="#00ff00" />
          Green
        </span>
      </StyledOption>
      <StyledOption value="#0000ff">
        <span>
          <ColorDot color="#0000ff" />
          Blue
        </span>
      </StyledOption>
    </CustomSelect>
  );
}
