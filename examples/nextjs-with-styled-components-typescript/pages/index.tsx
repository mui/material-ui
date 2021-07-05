import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box display="flex">
        <Typography>Hello MUI!</Typography>
      </Box>
    </Container>
  );
}
