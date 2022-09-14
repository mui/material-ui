import PageContext from './modules/components/PageContext';
import { ThemeProvider } from './modules/components/ThemeContext';

export { default as Alert } from '../pages/material-ui/react-alert';
export { default as Accordion } from '../pages/material-ui/react-accordion';
export { default as Button } from '../pages/material-ui/react-button';

export const Providers = ({ children, theme }) => (
  <ThemeProvider theme={theme}>
    <PageContext.Provider value={{ activePage: null, pages: [] }}>
      {children}
    </PageContext.Provider>
  </ThemeProvider>
)
