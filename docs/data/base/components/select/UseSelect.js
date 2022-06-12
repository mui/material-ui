import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelect } from '@mui/base';
import { styled } from '@mui/system';

const grey = {
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

const Root = styled('div')`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  position: relative;
  display: inline-block;
  vertical-align: baseline;
  color: #000;
`;

const Toggle = styled('div')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  background: var(--color, ${theme.palette.mode === 'dark' ? grey[900] : '#fff'});
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0 5px 13px -3px rgba(0,0,0,0.4)`
      : `0 5px 13px -3px ${grey[200]}`
  };
  border-radius: 0.75em;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  & .placeholder {
    opacity: 0.8;
  }
  `,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 5px 0 0 0;
  list-style: none;
  position: absolute;
  height: auto;
  transition: opacity 0.1s ease;
  width: 100%;
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0 5px 13px -3px rgba(0,0,0,0.4)`
      : `0 5px 13px -3px ${grey[200]}`
  };
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  z-index: 1;
  outline: 0px;

  &.hidden {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s 0.5s ease, visibility 0.4s 0.5s step-end;
  }

  & > li {
    padding: 8px;
    border-radius: 0.45em;

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    }

    &[aria-selected='true'] {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    }
  }
  `,
);

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
