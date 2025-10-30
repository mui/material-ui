import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function TypographyHeadline() {
  return (
    <Stack spacing={1.5}>
      <Typography level="h1">h1: Lorem ipsum</Typography>
      <Typography level="h2">h2: What is Lorem Ipsum?</Typography>
      <Typography level="h3">h3: The standard Lorem Ipsum passage.</Typography>
      <Typography level="h4">h4: The smallest headline of the page</Typography>
    </Stack>
  );
}
