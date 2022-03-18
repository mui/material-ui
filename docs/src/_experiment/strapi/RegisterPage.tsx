/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import TextField from '@mui/joy/TextField';
import Visibility from '@mui/icons-material/Visibility';

export default function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'var(--joy-palette-background-level1)',
        py: '32px',
        my: '5rem',
      }}
    >
      <Sheet
        sx={{
          width: 552,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'xs',
          boxShadow: 'sm',
          gap: '1.5rem',
          px: '3.5rem',
          py: '3rem',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box
            component="img"
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--XsZRGi5O--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/763/988af53b-5d7e-435a-98eb-dd4aff5299d2.png"
            sx={{
              borderRadius: '1rem',
              width: 72,
              height: 72,
              mx: 'auto',
              display: 'block',
            }}
          />
          <Typography level="h3" fontWeight="bold" sx={{ mt: '1.5rem', mb: '0.375rem' }}>
            Welcome back!
          </Typography>
          <Typography color="text.tertiary" sx={{ mx: -2 }}>
            Your credentials are only used to authenticate yourself on the admin panel. All saved
            data will be stored in your own database.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, '& > *': { flexGrow: 1 } }}>
          <TextField label="First name" id="first-name" placeholder="Kai" fullWidth />
          <TextField label="Last name" id="last-name" placeholder="Doe" fullWidth />
        </Box>
        <TextField label="Email" id="email" placeholder="kaidoe@gmail.com" fullWidth />
        <TextField
          label="Password"
          id="password"
          fullWidth
          endAdornment={
            <IconButton variant="text" size="sm" color="neutral">
              <Visibility fontSize="lg" />
            </IconButton>
          }
        />
        <TextField
          label="Password"
          id="password"
          fullWidth
          endAdornment={
            <IconButton variant="text" size="sm" color="neutral">
              <Visibility fontSize="lg" />
            </IconButton>
          }
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Checkbox id="terms" sx={{ flexShrink: 0 }} />
          <Box component="label" htmlFor="terms" sx={{ typography: 'body2' }}>
            Keep me updated about the new features and upcoming improvements (by doing this you
            accept the <Link level="inherit">terms</Link> and the{' '}
            <Link level="inherit">privacy policy</Link>).
          </Box>
        </Box>
        <Button fullWidth size="lg">
          Let&apos;s start
        </Button>
      </Sheet>
    </Box>
  );
}
