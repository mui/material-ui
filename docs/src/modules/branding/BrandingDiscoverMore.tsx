import * as React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ArrowCirleIcon from 'docs/src/modules/branding/icons/ArrowCircle';
import Link from 'docs/src/modules/components/Link';

interface DiscoverMoreCardProps {
  children: string;
  href: string;
  imagePosition: 'flex-start' | 'center' | 'flex-end';
  src: string;
  title: string;
}

function DiscoverMoreCard(props: DiscoverMoreCardProps) {
  const { imagePosition, src, title, href, children } = props;
  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'white',
        borderRadius: 1,
        overflow: 'hidden',
        minHeight: { xs: 420, md: 460, lg: 420 },
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ p: 5, pt: 6, pb: 3 }}>
        <Box
          component={Link}
          sx={{
            textDecoration: 'none',
            color: 'white',
            display: 'flex',
            '& svg': {
              mt: '2px',
            },
          }}
          href={href}
        >
          <Typography variant="h4" component="h3" sx={{ mr: 1 }}>
            {title}
          </Typography>
          <ArrowCirleIcon />
        </Box>
        <Typography sx={{ mt: 1, color: 'greyAA' }} variant="body2">
          {children}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: imagePosition }}>
        <img
          alt=""
          src={src}
          height={243}
          width={imagePosition === 'center' ? 290 : 330}
          loading="lazy"
        />
      </Box>
    </Box>
  );
}

export default function BrandingDiscoverMore() {
  return (
    <Container sx={{ mt: [10, 18], mb: [12, 20] }}>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Discover more
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <DiscoverMoreCard
            title="Roadmap"
            src="/static/branding/about/roadmap.png"
            href="/discover-more/roadmap/"
            imagePosition="flex-end"
          >
            Living document, laying out future plans and updates.
          </DiscoverMoreCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <DiscoverMoreCard
            title="Sponsors and Backers"
            src="/static/branding/about/sponsors.png"
            href="/discover-more/backers/"
            imagePosition="center"
          >
            Support Material-UI core development through crowdfunding.
          </DiscoverMoreCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <DiscoverMoreCard
            title="Contact Us"
            src="/static/branding/about/contact.png"
            href="/company/contact/"
            imagePosition="flex-start"
          >
            Send us a message, we’re all ears!
          </DiscoverMoreCard>
        </Grid>
      </Grid>
    </Container>
  );
}
