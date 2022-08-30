import * as React from 'react';
import { useSelect, SelectOption } from '@mui/base';
import { styled } from '@mui/system';

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
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
  padding: 12px;
  border-radius: 12px;
  text-align: left;
  line-height: 1.5;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: var(--color, ${theme.palette.mode === 'dark' ? grey[900] : '#fff'});
  margin: 0.5em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: default;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

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
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  padding: 12px;
  border-radius: 12px;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  padding: 5px;
  margin: 5px 0 0 0;
  position: absolute;
  height: auto;
  width: 100%;
  overflow: auto;
  z-index: 1;
  outline: 0px;
  list-style: none;

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

interface Props {
  options: SelectOption<string>[];
  placeholder?: string;
}

function CustomSelect({ options, placeholder }: Props) {
  const listboxRef = React.useRef<HTMLUListElement>(null);
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
      <Toggle {...getButtonProps()} style={{ '--color': value } as any}>
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
  return <CustomSelect placeholder="Select a color…" options={options} />;
}
