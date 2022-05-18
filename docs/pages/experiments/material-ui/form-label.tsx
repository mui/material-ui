import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default function CssVarsTemplate() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Container sx={{ my: 5 }}>
        <Box sx={{ pb: 2 }}>
          <ColorSchemePicker />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                label="Gilad Gray"
              />
              <FormControlLabel
                control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                label="Jason Killian"
              />
              <FormControlLabel
                control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                label="Antoine Llorca"
              />
            </FormGroup>
            <FormHelperText>Be careful</FormHelperText>
          </FormControl>
          <FormControl required error={error} component="fieldset" sx={{ m: 3 }} variant="standard">
            <FormLabel component="legend">Pick two</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                label="Gilad Gray"
              />
              <FormControlLabel
                control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                label="Jason Killian"
              />
              <FormControlLabel
                control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                label="Antoine Llorca"
              />
            </FormGroup>
            <FormHelperText>You can display an error</FormHelperText>
          </FormControl>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}
