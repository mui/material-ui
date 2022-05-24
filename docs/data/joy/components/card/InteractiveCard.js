import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

export default function InteractiveCard() {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: '320px',
        flexDirection: 'row',
        gap: 2,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
    >
      <AspectRatio ratio="1" maxHeight={90} sx={{ width: 90 }}>
        <img
          src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387"
          alt=""
        />
      </AspectRatio>
      <Box>
        <Box sx={{ ml: 0.5 }}>
          <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
            Yosemite Park
          </Typography>
          <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
            <Link
              overlay
              underline="none"
              href="#interactive-card"
              sx={{ color: 'text.tertiary' }}
            >
              California, USA
            </Link>
          </Typography>
          <Chip
            variant="outlined"
            color="primary"
            size="sm"
            sx={{ pointerEvents: 'none' }}
          >
            Cool weather all day long
          </Chip>
        </Box>
      </Box>
    </Card>
  );
}
