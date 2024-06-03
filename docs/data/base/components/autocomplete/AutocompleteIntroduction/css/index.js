import * as React from 'react';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { Button } from '@mui/base/Button';
import { Input } from '@mui/base/Input';
import { Popper } from '@mui/base/Popper';
import { useTheme } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClearIcon from '@mui/icons-material/Clear';
import clsx from 'clsx';

const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
  const {
    disableClearable = false,
    disabled = false,
    readOnly = false,
    options,
    ...other
  } = props;

  const {
    getRootProps,
    getInputProps,
    getPopupIndicatorProps,
    getClearProps,
    getListboxProps,
    getOptionProps,
    dirty,
    id,
    popupOpen,
    focused,
    anchorEl,
    setAnchorEl,
    groupedOptions,
  } = useAutocomplete({
    ...props,
    componentName: 'BaseAutocompleteIntroduction',
  });

  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;

  const rootRef = useForkRef(ref, setAnchorEl);

  return (
    <React.Fragment>
      <div
        {...getRootProps(other)}
        ref={rootRef}
        className={clsx('Autocomplete__root', focused && 'focused')}
      >
        <Input
          id={id}
          ref={setAnchorEl}
          disabled={disabled}
          readOnly={readOnly}
          slotProps={{
            root: {
              className: 'Autocomplete__input-root',
            },
            input: {
              className: 'Autocomplete__input',
              ...getInputProps(),
            },
          }}
        />
        {hasClearIcon && (
          <Button
            {...getClearProps()}
            className="Autocomplete__indicator clear-indicator"
          >
            <ClearIcon />
          </Button>
        )}

        <Button
          {...getPopupIndicatorProps()}
          className={clsx(
            'Autocomplete__indicator',
            'popup-indicator',
            popupOpen && 'popupOpen',
          )}
        >
          <ArrowDropDownIcon />
        </Button>
      </div>
      {anchorEl ? (
        <Popper
          open={popupOpen}
          anchorEl={anchorEl}
          slotProps={{
            root: { className: 'Autocomplete__popper' },
          }}
          modifiers={[
            { name: 'flip', enabled: false },
            { name: 'preventOverflow', enabled: false },
          ]}
        >
          <ul {...getListboxProps()} className="Autocomplete__listbox">
            {groupedOptions.map((option, index) => {
              const optionProps = getOptionProps({ option, index });

              return (
                <li {...optionProps} className="Autocomplete__option">
                  {option.label}
                </li>
              );
            })}

            {groupedOptions.length === 0 && (
              <li className="Autocomplete__no-options">No results</li>
            )}
          </ul>
        </Popper>
      ) : null}
      <Styles />
    </React.Fragment>
  );
});

Autocomplete.propTypes = {
  /**
   * If `true`, the input can't be cleared.
   * @default false
   */
  disableClearable: PropTypes.oneOf([false]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Array of options.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
    }),
  ).isRequired,
  /**
   * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
   * @default false
   */
  readOnly: PropTypes.bool,
};

export default function AutocompleteIntroduction() {
  return <Autocomplete options={top100Films} />;
}

const cyan = {
  50: '#E9F8FC',
  100: '#BDEBF4',
  200: '#99D8E5',
  300: '#66BACC',
  400: '#1F94AD',
  500: '#0D5463',
  600: '#094855',
  700: '#063C47',
  800: '#043039',
  900: '#022127',
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

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <style>
      {`
      .Autocomplete__root {
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 400;
        border-radius: 8px;
        background: ${isDarkMode ? grey[900] : '#fff'};
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        color: ${isDarkMode ? grey[300] : grey[900]};
        box-shadow: 0px 2px 4px ${
          isDarkMode ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };
        display: flex;
        gap: 5px;
        overflow: hidden;
        width: 320px;

        &.focused {
          border-color: ${cyan[400]};
          box-shadow: 0 0 0 3px ${isDarkMode ? cyan[500] : cyan[200]};
        }

        &:hover {
          border-color: ${cyan[400]};
        }

        &:focus-visible {
          outline: 0;
        }
      }

      .Autocomplete__popper {
        position: relative;
        z-index: 1001;
        width: 320px;
      }

      .Autocomplete__input-root {
        background: inherit;
        border-radius: inherit;
        flex: 1 0 auto;
      }

      .Autocomplete__input {
        font-size: 0.875rem;
        font-family: inherit;
        font-weight: 400;
        line-height: 1.5;
        color: ${isDarkMode ? grey[300] : grey[900]};
        background: inherit;
        border: none;
        border-radius: inherit;
        padding: 8px 12px;
        outline: 0;
      }

      .Autocomplete__indicator {
        outline: 0;
        box-shadow: none;
        border: 0;
        border-radius: 4px;
        background-color: transparent;
        align-self: center;
        padding: 0 2px;
        margin-right: 4px;

        &:hover {
          background-color: ${isDarkMode ? grey[700] : cyan[100]};
          cursor: pointer;
        }
      }

      .Autocomplete__indicator.popup-indicator > svg {
        transform: translateY(2px);
      }

      .Autocomplete__indicator.popup-indicator.popupOpen > svg {
        transform: translateY(2px) rotate(180deg);
      }

      .Autocomplete__indicator.clear-indicator > svg {
        transform: translateY(2px) scale(0.9);
      }

      .Autocomplete__listbox {
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        padding: 6px;
        margin: 12px 0;
        width: 100%;
        border-radius: 12px;
        overflow: auto;
        outline: 0;
        max-height: 300px;
        z-index: 1;
        position: absolute;
        background: ${isDarkMode ? grey[900] : '#fff'};
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        color: ${isDarkMode ? grey[300] : grey[900]};
        box-shadow: 0px 4px 6px ${
          isDarkMode ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
        };
      }

      .Autocomplete__option {
        list-style: none;
        padding: 8px;
        border-radius: 8px;
        cursor: default;

        &:last-of-type {
          border-bottom: none;
        }

        &:hover {
          cursor: pointer;
        }

        &[aria-selected=true] {
          background-color: ${isDarkMode ? cyan[900] : cyan[100]};
          color: ${isDarkMode ? cyan[100] : cyan[900]};
        }

        &.Mui-focused,
        &.Mui-focusVisible {
          background-color: ${isDarkMode ? grey[800] : grey[100]};
          color: ${isDarkMode ? grey[300] : grey[900]};
        }

        &.Mui-focusVisible {
          box-shadow: 0 0 0 3px ${isDarkMode ? cyan[500] : cyan[200]};
        }

        &[aria-selected=true].Mui-focused,
        &[aria-selected=true].Mui-focusVisible {
          background-color: ${isDarkMode ? cyan[900] : cyan[100]};
          color: ${isDarkMode ? cyan[100] : cyan[900]};
        }
      }

      .Autocomplete__no-options {
        list-style: none;
        padding: 8px;
        cursor: default;
      }
      `}
    </style>
  );
}

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];
