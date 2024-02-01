import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';

function NotFoundIllustration() {
  return (
    <Box
      sx={(theme) => ({
        mx: 'auto',
        mb: 4,
        height: 150,
        width: 200,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'clip',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
        ...theme.applyDarkStyles({
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }),
      })}
    >
      <Box
        sx={{
          p: 1.5,
          display: 'flex',
          gap: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box
          sx={{ width: 10, height: 10, borderRadius: 2, bgcolor: 'error.500', opacity: '80%' }}
        />
        <Box
          sx={{ width: 10, height: 10, borderRadius: 2, bgcolor: 'warning.500', opacity: '80%' }}
        />
        <Box
          sx={{ width: 10, height: 10, borderRadius: 2, bgcolor: 'success.500', opacity: '80%' }}
        />
      </Box>
      <Box sx={{ height: '75%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SearchOffRoundedIcon sx={{ fontSize: 50, color: 'primary.500', opacity: '40%' }} />
      </Box>
    </Box>
  );
}

export default function NotFoundHero() {
  return (
    <Section
      bg="gradient"
      sx={{
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <NotFoundIllustration />
      <SectionHeadline
        alwaysCenter
        title={
          <Typography component="h1" variant="h4" fontWeight="semiBold">
            Page not found
          </Typography>
        }
        description="Apologies, but the page you were looking for wasn't found."
      />
    </Section>
  );
}
