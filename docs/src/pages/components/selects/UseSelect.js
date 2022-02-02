import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelect } from '@mui/base';
import { styled } from '@mui/system';

const Root = styled('div')`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  position: relative;
  display: inline-block;
  vertical-align: baseline;
  color: #000;
`;

const Toggle = styled('div')`
  min-width: 150px;
  min-height: calc(1.5em + 10px);
  padding: 5px;
  background-color: var(--color, #333);
  box-shadow: 0 5px 13px -3px var(--color, #333);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: default;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  & .placeholder {
    opacity: 0.8;
  }
`;

const Listbox = styled('ul')`
  background: #eee;
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
  position: absolute;
  height: auto;
  transition: opacity 0.1s ease;
  width: 100%;
  box-shadow: 0 5px 13px -3px #333;

  &.hidden {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s 0.5s ease, visibility 0.4s 0.5s step-end;
  }

  & > li {
    padding: 5px;

    &:hover {
      background: #ccc;
    }

    &[aria-selected='true'] {
      background: #ccc;
    }
  }
`;

function CustomSelect({ options, placeholder }) {
  const listboxRef = React.useRef(null);
  const [listboxVisible, setListboxVisible] = React.useState(false);

  const { getButtonProps, getListboxProps, getOptionProps, value } = useSelect({
    listboxRef,
    options,
  });

  React.useEffect(() => {
    if (listboxVisible) {
      listboxRef.current?.focus();
    }
  }, [listboxVisible]);

  return (
    <Root
      onMouseOver={() => setListboxVisible(true)}
      onMouseOut={() => setListboxVisible(false)}
      onFocus={() => setListboxVisible(true)}
      onBlur={() => setListboxVisible(false)}
    >
      <Toggle {...getButtonProps()} style={{ '--color': value }}>
        {value ?? <span className="placeholder">{placeholder ?? ' '}</span>}
      </Toggle>
      <Listbox {...getListboxProps()} className={listboxVisible ? '' : 'hidden'}>
        {options.map((option) => (
          <li key={option.value} {...getOptionProps(option)}>
            {option.label}
          </li>
        ))}
      </Listbox>
    </Root>
  );
}

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      label: PropTypes.node,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  placeholder: PropTypes.string,
};

const options = [
  {
    label: 'Red',
    value: '#D32F2F',
  },
  {
    label: 'Green',
    value: '#4CAF50',
  },
  {
    label: 'Blue',
    value: '#2196F3',
  },
];

export default function UseSelect() {
  return <CustomSelect placeholder="Select a color..." options={options} />;
}
