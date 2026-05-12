import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function TextTransform() {
  // @focus-start @padding 1
  return (
    <Typography component="div">
      <Box sx={{ textTransform: 'capitalize', m: 1 }}>capitalized text.</Box>
      <Box sx={{ textTransform: 'lowercase', m: 1 }}>Lowercase Text.</Box>
      <Box sx={{ textTransform: 'uppercase', m: 1 }}>Uppercase Text.</Box>
    </Typography>
  );
  // @focus-end
}
