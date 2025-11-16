import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

export default function BoxSx() {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#007FFF',
            dark: '#0066CC',
          },
        },
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          },
        }}
      />
    </ThemeProvider>
  );
}
// ... (The existing BoxSx demo component function)

// ----------------------------------------------------
// 🎯 YOUR NEW COMPONENT GOES HERE 🎯
// ----------------------------------------------------
export function ResponsiveBoxSx() {
  return (
    <Paper elevation={3} sx={{ p: 2, textAlign: 'center', mb: 2 }}>
      <Box
        sx={{
          // Define responsive width using the object syntax
          width: {
            xs: 150, // 150px on extra-small screens (default)
            sm: 300, // 300px on small screens (600px+)
            md: 500, // 500px on medium screens (900px+)
          },
          height: 100,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto', // Center the box horizontally
        }}
      >
        Responsive Width
      </Box>
    </Paper>
  );
}
// ----------------------------------------------------

// ... (Other demo components)

// Final export: Add your new component to this object
const demos = {
  // ... existing demo names
  ResponsiveBoxSx, // ⬅️ Must be included here
};

export default demos;
