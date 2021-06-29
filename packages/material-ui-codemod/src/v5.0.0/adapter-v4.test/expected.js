import { createMuiTheme, createTheme, adapterV4Theme } from '@material-ui/core/styles';

const theme1 = createMuiTheme();
const theme2 = createTheme();

const theme3 = createMuiTheme(adapterV4Theme({ palette: { primary: { main: '#ff5252' } } }));
const theme4 = createTheme(adapterV4Theme({ palette: { primary: { main: '#ff5252' } } }));
