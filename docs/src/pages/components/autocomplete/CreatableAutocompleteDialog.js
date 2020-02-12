/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CreatableAutocomplete from '@material-ui/lab/CreatableAutocomplete';

export default function CreatableAutocompleteExample() {
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => toggleOpen(false);

  return (
    <>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a new film</DialogTitle>
        <DialogContent>
          <DialogContentText>
            missing a film, please insert it in.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="title"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="year"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    <CreatableAutocomplete
      id="creatable-dialog-demo"
      options={top100Films}
      getOptionLabel={option => option.label}
      style={{ width: 300 }}
      onCreateNewOption={() => toggleOpen(true)}
      renderInput={params => (
        <TextField {...params} label="Creatable" variant="outlined" fullWidth />
      )}
    />
    </>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'The Shawshank Redemption', value: 1994 },
  { label: 'The Godfather', value: 1972 },
  { label: 'The Godfather: Part II', value: 1974 },
  { label: 'The Dark Knight', value: 2008 },
  { label: '12 Angry Men', value: 1957 },
  { label: "Schindler's List", value: 1993 },
  { label: 'Pulp Fiction', value: 1994 },
  { label: 'The Lord of the Rings: The Return of the King', value: 2003 },
  { label: 'The Good, the Bad and the Ugly', value: 1966 },
  { label: 'Fight Club', value: 1999 },
  { label: 'The Lord of the Rings: The Fellowship of the Ring', value: 2001 },
  { label: 'Star Wars: Episode V - The Empire Strikes Back', value: 1980 },
  { label: 'Forrest Gump', value: 1994 },
  { label: 'Inception', value: 2010 },
  { label: 'The Lord of the Rings: The Two Towers', value: 2002 },
  { label: "One Flew Over the Cuckoo's Nest", value: 1975 },
  { label: 'Goodfellas', value: 1990 },
  { label: 'The Matrix', value: 1999 },
  { label: 'Seven Samurai', value: 1954 },
  { label: 'Star Wars: Episode IV - A New Hope', value: 1977 },
  { label: 'City of God', value: 2002 },
  { label: 'Se7en', value: 1995 },
  { label: 'The Silence of the Lambs', value: 1991 },
  { label: "It's a Wonderful Life", value: 1946 },
  { label: 'Life Is Beautiful', value: 1997 },
  { label: 'The Usual Suspects', value: 1995 },
  { label: 'Léon: The Professional', value: 1994 },
  { label: 'Spirited Away', value: 2001 },
  { label: 'Saving Private Ryan', value: 1998 },
  { label: 'Once Upon a Time in the West', value: 1968 },
  { label: 'American History X', value: 1998 },
  { label: 'Interstellar', value: 2014 },
  { label: 'Casablanca', value: 1942 },
  { label: 'City Lights', value: 1931 },
  { label: 'Psycho', value: 1960 },
  { label: 'The Green Mile', value: 1999 },
  { label: 'The Intouchables', value: 2011 },
  { label: 'Modern Times', value: 1936 },
  { label: 'Raiders of the Lost Ark', value: 1981 },
  { label: 'Rear Window', value: 1954 },
  { label: 'The Pianist', value: 2002 },
  { label: 'The Departed', value: 2006 },
  { label: 'Terminator 2: Judgment Day', value: 1991 },
  { label: 'Back to the Future', value: 1985 },
  { label: 'Whiplash', value: 2014 },
  { label: 'Gladiator', value: 2000 },
  { label: 'Memento', value: 2000 },
  { label: 'The Prestige', value: 2006 },
  { label: 'The Lion King', value: 1994 },
  { label: 'Apocalypse Now', value: 1979 },
  { label: 'Alien', value: 1979 },
  { label: 'Sunset Boulevard', value: 1950 },
  { label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', value: 1964 },
  { label: 'The Great Dictator', value: 1940 },
  { label: 'Cinema Paradiso', value: 1988 },
  { label: 'The Lives of Others', value: 2006 },
  { label: 'Grave of the Fireflies', value: 1988 },
  { label: 'Paths of Glory', value: 1957 },
  { label: 'Django Unchained', value: 2012 },
  { label: 'The Shining', value: 1980 },
  { label: 'WALL·E', value: 2008 },
  { label: 'American Beauty', value: 1999 },
  { label: 'The Dark Knight Rises', value: 2012 },
  { label: 'Princess Mononoke', value: 1997 },
  { label: 'Aliens', value: 1986 },
  { label: 'Oldboy', value: 2003 },
  { label: 'Once Upon a Time in America', value: 1984 },
  { label: 'Witness for the Prosecution', value: 1957 },
  { label: 'Das Boot', value: 1981 },
  { label: 'Citizen Kane', value: 1941 },
  { label: 'North by Northwest', value: 1959 },
  { label: 'Vertigo', value: 1958 },
  { label: 'Star Wars: Episode VI - Return of the Jedi', value: 1983 },
  { label: 'Reservoir Dogs', value: 1992 },
  { label: 'Braveheart', value: 1995 },
  { label: 'M', value: 1931 },
  { label: 'Requiem for a Dream', value: 2000 },
  { label: 'Amélie', value: 2001 },
  { label: 'A Clockwork Orange', value: 1971 },
  { label: 'Like Stars on Earth', value: 2007 },
  { label: 'Taxi Driver', value: 1976 },
  { label: 'Lawrence of Arabia', value: 1962 },
  { label: 'Double Indemnity', value: 1944 },
  { label: 'Eternal Sunshine of the Spotless Mind', value: 2004 },
  { label: 'Amadeus', value: 1984 },
  { label: 'To Kill a Mockingbird', value: 1962 },
  { label: 'Toy Story 3', value: 2010 },
  { label: 'Logan', value: 2017 },
  { label: 'Full Metal Jacket', value: 1987 },
  { label: 'Dangal', value: 2016 },
  { label: 'The Sting', value: 1973 },
  { label: '2001: A Space Odyssey', value: 1968 },
  { label: "Singin' in the Rain", value: 1952 },
  { label: 'Toy Story', value: 1995 },
  { label: 'Bicycle Thieves', value: 1948 },
  { label: 'The Kid', value: 1921 },
  { label: 'Inglourious Basterds', value: 2009 },
  { label: 'Snatch', value: 2000 },
  { label: '3 Idiots', value: 2009 },
  { label: 'Monty Python and the Holy Grail', value: 1975 },
];
