import createTheme from './createTheme';

const defaultTheme = createTheme();

export const defaultLightTheme = defaultTheme;

export const defaultDarkTheme = createTheme({ palette: { mode: 'dark' } });

export default defaultTheme;
