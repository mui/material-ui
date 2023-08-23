import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import Link from '@mui/joy/Link';
import FormControl, { formControlClasses } from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';

export default function Playground() {
  const [flags, setFlags] = React.useState([]);

  const getCheckboxProps = (flag) => ({
    checked: flags.includes(flag),
    onChange: (event) => {
      setFlags(
        event.target.checked ? [...flags, flag] : flags.filter((f) => f !== flag),
      );
    },
  });

  return (
    <div>
      <Box
        sx={{
          mt: 3,
          pt: 4,
          position: 'sticky',
          top: 'var(--MuiDocs-header-height)',
          zIndex: 2,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 'xs',
          bgcolor: 'background.surface',
        }}
      >
        <FormControl sx={{ width: 300, mx: 'auto' }}>
          <FormLabel>Playground</FormLabel>
          <Autocomplete
            options={top100Films}
            placeholder="Type to search"
            {...flags.reduce((prev, current) => ({ ...prev, [current]: true }), {})}
          />
        </FormControl>
        <Divider sx={{ mt: 4, mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
          <Typography
            id="flags-playground"
            level="body-xs"
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'lg',
              letterSpacing: 'md',
              px: 2,
            }}
          >
            Flags {flags.length ? `(${flags.length})` : ''}
          </Typography>
          {flags.length > 0 && (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <Link
              component="button"
              level="body-sm"
              onClick={() => setFlags([])}
              sx={{ ml: 'auto', mr: 2 }}
            >
              Clear all
            </Link>
          )}
        </Box>
      </Box>
      <Box sx={{ minWidth: 0, flexBasis: 300, flexGrow: 1 }}>
        <List
          aria-labelledby="flags-playground"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            overflow: 'auto',
            px: 0.5,
            '--List-gap': '8px',
            '& > li:first-child': {
              mt: 'var(--List-gap)',
            },
            [`& .${formControlClasses.root}`]: { position: 'initial', gap: 1.5 },
            '& > li': {
              alignItems: 'flex-start',
            },
          }}
        >
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('autoComplete')} />
              <div>
                <FormLabel>autoComplete</FormLabel>
                <FormHelperText>
                  The completion string, appears inline after the input cursor in the
                  textbox. The inline completion string is visually highlighted and
                  has a selected state.
                </FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('autoHighlight')} />
              <div>
                <FormLabel>autoHighlight</FormLabel>
                <FormHelperText>
                  The first option is automatically highlighted.
                </FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('autoSelect')} />
              <div>
                <FormLabel>autoSelect</FormLabel>
                <FormHelperText>
                  The selected option becomes the value of the input when the
                  Autocomplete loses focus unless the user chooses a different option
                  or changes the character string in the input.
                </FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('blurOnSelect')} />
              <div>
                <FormLabel>blurOnSelect</FormLabel>
                <FormHelperText>The input is always blurred.</FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('clearOnBlur')} />
              <div>
                <FormLabel>clearOnBlur</FormLabel>
                <FormHelperText>
                  The input&apos;s text is cleared on blur if no value is selected.
                </FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('clearOnEscape')} />
              <div>
                <FormLabel>clearOnEscape</FormLabel>
                <FormHelperText>
                  Clear all values when the user presses escape and the popup is
                  closed.
                </FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('disabled')} />
              <div>
                <FormLabel>disabled</FormLabel>
                <FormHelperText>The component is disabled.</FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('disableClearable')} />
              <div>
                <FormLabel>disableClearable</FormLabel>
                <FormHelperText>The input can&apos;t be cleared</FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('disableCloseOnSelect')} />
              <div>
                <FormLabel>disableCloseOnSelect</FormLabel>
                <FormHelperText>
                  The popup won&apos;t close when a value is selected.
                </FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('disableListWrap')} />
              <div>
                <FormLabel>disableListWrap</FormLabel>
                <FormHelperText>
                  The list box in the popup will not wrap focus.
                </FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('filterSelectedOptions')} />
              <div>
                <FormLabel>filterSelectedOptions</FormLabel>
                <FormHelperText>
                  Hide the selected option from the list box.
                </FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('freeSolo')} />
              <div>
                <FormLabel>freeSolo</FormLabel>
                <FormHelperText>
                  The user input is not bound to the provided options.
                </FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('includeInputInList')} />
              <div>
                <FormLabel>includeInputInList</FormLabel>
                <FormHelperText>The highlight can move to the input.</FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('openOnFocus')} />
              <div>
                <FormLabel>openOnFocus</FormLabel>
                <FormHelperText>The popup will open on input focus.</FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('disablePortal')} />
              <div>
                <FormLabel>disablePortal</FormLabel>
                <FormHelperText>
                  The popup will be under the DOM hierarchy of the parent component.
                </FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('readOnly')} />
              <div>
                <FormLabel>readOnly</FormLabel>
                <FormHelperText>
                  The component becomes read-only. It is also supported in multiple
                  tags where the tag cannot be deleted.
                </FormHelperText>
              </div>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl orientation="horizontal">
              <Checkbox overlay {...getCheckboxProps('selectOnFocus')} />
              <div>
                <FormLabel>selectOnFocus</FormLabel>
                <FormHelperText>
                  The input&apos;s text is selected on focus. It helps the user clear
                  the selected value.
                </FormHelperText>
              </div>
            </FormControl>
          </ListItem>
        </List>
      </Box>
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
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
