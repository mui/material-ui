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

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'var(--joy-palette-background-level1)',
        pt: '100px',
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
        <Box>
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
          <Typography
            level="h3"
            sx={{ mt: '1.5rem', mb: '0.375rem', fontWeight: 'bold', justifyContent: 'center' }}
          >
            Welcome back!
          </Typography>
          <Typography sx={{ color: 'text.tertiary', justifyContent: 'center' }}>
            Log in to your Strapi account
          </Typography>
        </Box>
        <TextField label="Email" id="email" placeholder="kaidoe@gmail.com" fullWidth />
        <TextField
          label="Password"
          id="password"
          type="password"
          fullWidth
          endAdornment={
            <IconButton variant="text" color="neutral" size="sm" sx={{ pointerEvents: 'visible' }}>
              <Visibility fontSize="lg" />
            </IconButton>
          }
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Checkbox id="remember-me" />
          <Box component="label" htmlFor="remember-me" sx={{ typography: 'body2' }}>
            Remember me
          </Box>
        </Box>
        <Button fullWidth size="lg">
          Login
        </Button>
      </Sheet>
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Link href="#login">Forgot password?</Link>
      </Box>
    </Box>
  );
}
