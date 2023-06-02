import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

export default function ContainerResponsive() {
  return (
    <Box sx={{ minHeight: 350 }}>
      <Card
        variant="outlined"
        orientation="horizontal"
        stackWidth={360}
        sx={(theme) => ({
          width: 300,
          resize: 'horizontal',
          overflow: 'hidden',
          transition: 'transform 0.3s, border 0.3s',
          '&:hover': {
            borderColor: theme.vars.palette.primary.outlinedHoverBorder,
            transform: 'translateY(-2px)',
          },
        })}
      >
        <AspectRatio
          variant="soft"
          sx={{
            flexGrow: 1,
            display: 'contents',
            '--AspectRatio-paddingBottom':
              'clamp(0px, (100% - var(--unstable_Card-stackPoint)) * 999, min(calc(100% / (16 / 9)), 300px))',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent sx={{ gap: 2, maxWidth: 200, mt: 0 }}>
          <Box sx={{ display: 'flex' }}>
            <div>
              <Typography level="h2" fontSize="md" mb={0.5}>
                <Link
                  href="#container-responsive"
                  overlay
                  underline="none"
                  sx={{
                    color: 'text.primary',
                    '--focus-outline-offset': '-3px',
                  }}
                >
                  Yosemite National Park
                </Link>
              </Typography>
              <Typography level="body2">California, USA</Typography>
            </div>
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              sx={{ ml: 'auto', alignSelf: 'flex-start' }}
            >
              <FavoriteBorderRoundedIcon color="danger" />
            </IconButton>
          </Box>
          <AspectRatio
            variant="soft"
            sx={{
              '--AspectRatio-paddingBottom':
                'clamp(0px, (100% - 200px) * 999, 200px)',
              pointerEvents: 'none',
            }}
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2262"
            />
          </AspectRatio>
          <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
            <Avatar variant="soft" color="neutral">
              Y
            </Avatar>
            <div>
              <Typography level="body2">Designed by</Typography>
              <Typography fontWeight="lg" level="body2">
                Nature itself
              </Typography>
            </div>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
