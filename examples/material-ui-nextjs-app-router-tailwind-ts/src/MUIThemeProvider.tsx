'use client'
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: () => `
            * {
              margin: 0;
              padding: 0;
            }
        `,
      },
    }
  })
type Props = {
    children: React.ReactNode
}
function MUIThemeProvider({children}: Props) {
  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )
}

export default MUIThemeProvider