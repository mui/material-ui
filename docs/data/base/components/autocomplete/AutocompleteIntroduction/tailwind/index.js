import * as React from 'react';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { Button } from '@mui/base/Button';
import { Popper } from '@mui/base/Popper';
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
    isOptionEqualToValue,
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
        className={clsx(
          'flex gap-[5px] pr-[5px] overflow-hidden w-80 rounded-lg bg-white dark:bg-gray-800 border border-solid border-gray-200 dark:border-gray-700 hover:border-violet-400 dark:hover:border-violet-400 focus-visible:outline-0 shadow-[0_2px_4px_rgb(0_0_0_/_0.05)] dark:shadow-[0_2px_4px_rgb(0_0_0_/_0.5)]',
          !focused &&
            'shadow-[0_2px_2px_transparent] shadow-gray-50 dark:shadow-gray-900',
          focused &&
            'border-violet-400 dark:border-violet-400 shadow-[0_0_0_3px_transparent] shadow-violet-200 dark:shadow-violet-500',
        )}
      >
        <input
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          {...getInputProps()}
          className="text-sm leading-[1.5] text-gray-900 dark:text-gray-300 bg-inherit border-0 rounded-[inherit] px-3 py-2 outline-0 grow shrink-0 basis-auto"
        />
        {hasClearIcon && (
          <Button
            {...getClearProps()}
            className="self-center outline-0 shadow-none border-0 py-0 px-0.5 rounded-[4px] bg-transparent hover:bg-violet-100 dark:hover:bg-gray-700 hover:cursor-pointer"
          >
            <ClearIcon className="translate-y-[2px] scale-90" />
          </Button>
        )}

        <Button
          {...getPopupIndicatorProps()}
          className="self-center outline-0 shadow-none border-0 py-0 px-0.5 rounded-[4px] bg-transparent hover:bg-violet-100 dark:hover:bg-gray-700 hover:cursor-pointer"
        >
          <ArrowDropDownIcon
            className={clsx('translate-y-[2px]', popupOpen && 'rotate-180')}
          />
        </Button>
      </div>
      {anchorEl && (
        <Popper
          open={popupOpen}
          anchorEl={anchorEl}
          slotProps={{
            root: {
              className: 'relative z-[1001] w-80', // z-index: 1001 is needed to override ComponentPageTabs with z-index: 1000
            },
          }}
          modifiers={[
            { name: 'flip', enabled: false },
            { name: 'preventOverflow', enabled: false },
          ]}
        >
          <ul
            {...getListboxProps()}
            className="text-sm box-border p-1.5 my-3 mx-0 min-w-[320px] rounded-xl overflow-auto outline-0 max-h-[300px] z-[1] bg-white dark:bg-gray-800 border border-solid border-gray-200 dark:border-gray-900 text-gray-900 dark:text-gray-200 shadow-[0_4px_30px_transparent] shadow-gray-200 dark:shadow-gray-900"
          >
            {groupedOptions.map((option, index) => {
              const optionProps = getOptionProps({ option, index });

              return (
                <li
                  {...optionProps}
                  className="list-none p-2 rounded-lg cursor-default last-of-type:border-b-0 hover:cursor-pointer aria-selected:bg-violet-100 dark:aria-selected:bg-violet-900 aria-selected:text-violet-900 dark:aria-selected:text-violet-100 ui-focused:bg-gray-100 dark:ui-focused:bg-gray-700 ui-focus-visible:bg-gray-100 dark:ui-focus-visible:bg-gray-800 ui-focused:text-gray-900 dark:ui-focused:text-gray-300 ui-focus-visible:text-gray-900 dark:ui-focus-visible:text-gray-300 ui-focus-visible:shadow-[0_0_0_3px_transparent] ui-focus-visible:shadow-violet-200 dark:ui-focus-visible:shadow-violet-500 ui-focused:aria-selected:bg-violet-100 dark:ui-focused:aria-selected:bg-violet-900 ui-focus-visible:aria-selected:bg-violet-100 dark:ui-focus-visible:aria-selected:bg-violet-900 ui-focused:aria-selected:text-violet-900 dark:ui-focused:aria-selected:text-violet-100 ui-focus-visible:aria-selected:text-violet-900 dark:ui-focus-visible:aria-selected:text-violet-100"
                >
                  {option.label}
                </li>
              );
            })}

            {groupedOptions.length === 0 && (
              <li className="list-none p-2 cursor-default">No results</li>
            )}
          </ul>
        </Popper>
      )}
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
   * Used to determine if the option represents the given value.
   * Uses strict equality by default.
   * ⚠️ Both arguments need to be handled, an option can only match with one value.
   *
   * @param {Value} option The option to test.
   * @param {Value} value The value to test against.
   * @returns {boolean}
   */
  isOptionEqualToValue: PropTypes.func,
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
  return (
    <Autocomplete
      options={top100Films}
      isOptionEqualToValue={(option, value) => option.label === value.label}
    />
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
