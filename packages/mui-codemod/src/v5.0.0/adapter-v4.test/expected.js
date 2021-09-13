import { createMuiTheme, createTheme, adaptV4Theme } from '@material-ui/core/styles';

const theme1 = createMuiTheme();
const theme2 = createTheme();

const theme3 = createMuiTheme(adaptV4Theme({ palette: { primary: { main: '#ff5252' } } }));
const theme4 = createTheme(adaptV4Theme({ palette: { primary: { main: '#ff5252' } } }));
