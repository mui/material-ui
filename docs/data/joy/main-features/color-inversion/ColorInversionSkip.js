import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import SvgIcon from '@mui/joy/SvgIcon';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';

export default function ColorInversionSkip() {
  return (
    <Card
      size="lg"
      variant="solid"
      color="neutral"
      invertedColors
      sx={{ maxWidth: 300, boxShadow: 'lg', borderRadius: 'xl' }}
    >
      <AspectRatio
        data-skip-inverted-colors
        variant="soft"
        color="success"
        ratio="1"
        sx={{ width: 48 }}
      >
        <div>
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13" />
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
            </svg>
          </SvgIcon>
        </div>
      </AspectRatio>

      <Typography level="h3">Design Thinking</Typography>
      <Typography level="body-sm">
        How to apply design thinking to your problem in order to generate innovative
        and user-centric solutions.
      </Typography>

      <IconButton
        variant="plain"
        size="lg"
        sx={{ alignSelf: 'flex-end', borderRadius: '50%', mr: -1, my: -1 }}
      >
        <ArrowForward />
      </IconButton>
    </Card>
  );
}
