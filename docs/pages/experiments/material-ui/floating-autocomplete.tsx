import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FloatingPopup from '@mui/material/FloatingPopup';

const TOP_FILMS = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Dark Knight', year: 2008 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  { label: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  { label: 'Fight Club', year: 1999 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'Star Wars: Episode V', year: 1980 },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
];

function BasicDemo() {
  return (
    <section>
      <h3>Basic</h3>
      <div style={{ display: 'flex', gap: 32 }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 14 }}>Default (Popper.js)</p>
          <Autocomplete
            options={TOP_FILMS}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 14 }}>FloatingPopup</p>
          <Autocomplete
            options={TOP_FILMS}
            sx={{ width: 300 }}
            slots={{ popper: FloatingPopup }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </div>
      </div>
    </section>
  );
}

function DisablePortalDemo() {
  return (
    <section>
      <h3>disablePortal</h3>
      <div style={{ position: 'relative' }}>
        <Autocomplete
          options={TOP_FILMS}
          disablePortal
          sx={{ width: 300 }}
          slots={{ popper: FloatingPopup }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </div>
    </section>
  );
}

function ScrollContainerDemo() {
  return (
    <section>
      <h3>Inside scroll container</h3>
      <p style={{ margin: '0 0 8px', fontSize: 14, color: '#666' }}>
        Dropdown flips when there is not enough space below.
      </p>
      <div
        style={{
          height: 250,
          overflow: 'auto',
          border: '1px solid #ccc',
          position: 'relative',
        }}
      >
        <div style={{ padding: '200px 16px 200px' }}>
          <Autocomplete
            options={TOP_FILMS}
            sx={{ width: 300 }}
            slots={{ popper: FloatingPopup }}
            renderInput={(params) => <TextField {...params} label="Scroll then open" />}
          />
        </div>
      </div>
    </section>
  );
}

function MultipleDemo() {
  return (
    <section>
      <h3>Multiple values</h3>
      <Autocomplete
        multiple
        options={TOP_FILMS}
        defaultValue={[TOP_FILMS[0], TOP_FILMS[2]]}
        sx={{ width: 400 }}
        slots={{ popper: FloatingPopup }}
        renderInput={(params) => <TextField {...params} label="Favorites" />}
      />
    </section>
  );
}

function GroupedDemo() {
  const sorted = [...TOP_FILMS].sort((a, b) => {
    const decadeA = Math.floor(a.year / 10) * 10;
    const decadeB = Math.floor(b.year / 10) * 10;
    return decadeB - decadeA || a.label.localeCompare(b.label);
  });

  return (
    <section>
      <h3>Grouped</h3>
      <Autocomplete
        options={sorted}
        groupBy={(option) => `${Math.floor(option.year / 10) * 10}s`}
        sx={{ width: 300 }}
        slots={{ popper: FloatingPopup }}
        renderInput={(params) => <TextField {...params} label="Movie by decade" />}
      />
    </section>
  );
}

function FreeSoloDemo() {
  return (
    <section>
      <h3>Free solo</h3>
      <Autocomplete
        freeSolo
        options={TOP_FILMS.map((option) => option.label)}
        sx={{ width: 300 }}
        slots={{ popper: FloatingPopup }}
        renderInput={(params) => <TextField {...params} label="Type anything" />}
      />
    </section>
  );
}

function CSSVariablesDemo() {
  return (
    <section>
      <h3>CSS variables (--anchor-width)</h3>
      <p style={{ margin: '0 0 8px', fontSize: 14, color: '#666' }}>
        The dropdown uses <code>var(--anchor-width)</code> to match the input width. Autocomplete
        already passes <code>style.width</code> via <code>additionalProps</code>, but the CSS
        variable is also available.
      </p>
      <Autocomplete
        options={TOP_FILMS}
        sx={{ width: 400 }}
        slots={{ popper: FloatingPopup }}
        renderInput={(params) => <TextField {...params} label="400px wide input" />}
      />
    </section>
  );
}

function KeepMountedDemo() {
  return (
    <section>
      <h3>keepMounted (via slotProps)</h3>
      <p style={{ margin: '0 0 8px', fontSize: 14, color: '#666' }}>
        The dropdown stays in the DOM when closed (inspect to verify).
      </p>
      <Autocomplete
        options={TOP_FILMS}
        sx={{ width: 300 }}
        slots={{ popper: FloatingPopup }}
        slotProps={{
          popper: { keepMounted: true },
        }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </section>
  );
}

export default function MaterialUIFloatingAutocomplete() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{ padding: 32, maxWidth: 900 }}>
        <h1>FloatingPopup + Autocomplete</h1>
        <p>
          <code>{'<Autocomplete slots={{ popper: FloatingPopup }} />'}</code>
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <BasicDemo />
          <DisablePortalDemo />
          <ScrollContainerDemo />
          <MultipleDemo />
          <GroupedDemo />
          <FreeSoloDemo />
          <CSSVariablesDemo />
          <KeepMountedDemo />
        </div>
      </div>
    </React.Fragment>
  );
}
