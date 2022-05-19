import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Info from '@mui/icons-material/Info';

export default function InteractiveCard() {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: '300px',
        flexDirection: 'row',
        gap: 2,
        '&:hover': { boxShadow: 'md', borderColor: 'primary.outlinedHoverBorder' },
      }}
    >
      <AspectRatio ratio="1" max={100} sx={{ width: 100 }}>
        <img src="/static/images/cards/real-estate.png" alt="" />
      </AspectRatio>
      <Box>
        <Box sx={{ ml: 0.5, mb: 1 }}>
          <Typography
            level="h2"
            fontSize="sm"
            aria-describedby="card-description"
            mt={0.5}
            mb={1}
          >
            <Link
              overlay
              underline="none"
              href="#interactive-card"
              sx={{ color: 'text.tertiary' }}
            >
              123 Main St, Phoenix, AZ
            </Link>
          </Typography>
          <Typography fontSize="md" fontWeight="lg" id="card-description">
            $280k - $310k
          </Typography>
        </Box>
        <Chip
          variant="soft"
          startDecorator={<Info fontSize="md" />}
          size="sm"
          sx={{ pointerEvents: 'none' }}
        >
          Confidence score of 85%
        </Chip>
      </Box>
    </Card>
  );
}
