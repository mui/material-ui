import Box from '@pigment-css/react/Box';

export function App() {
  return (
    <Box
      as="ul"
      sx={{
        margin: 0,
        marginBlock: '1rem',
        padding: 0,
        paddingLeft: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      Hello Box
    </Box>
  );
}
