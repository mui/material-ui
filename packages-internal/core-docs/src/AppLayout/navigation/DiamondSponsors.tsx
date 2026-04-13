import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/internal-core-docs/Link';
import { useTranslate } from '@mui/internal-core-docs/i18n';
import * as X from '@mui/docs-shared-assets/sponsors';

const NativeLink = styled('a')(({ theme }) => ({
  boxSizing: 'border-box', // TODO have CssBaseline in the Next.js layout
  width: '100%',
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: 0,
  padding: theme.spacing(1),
  borderColor: (theme.vars || theme).palette.divider,
  transition: theme.transitions.create(['background-color']),
  '&:first-of-type': {
    borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
  },
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.grey[50],
  },
  '&:focus-visible': {
    outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
    outlineOffset: '-3px',
  },
  '& img': {
    display: 'inline-block',
  },
  ...theme.applyDarkStyles({
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary[900], 0.1),
    },
  }),
}));

export function DiamondSponsors() {
  const t = useTranslate();

  return (
    <Stack direction="column">
      <Stack
        direction="column"
        sx={(theme) => ({
          borderLeft: '1px solid',
          borderRight: '1px solid',
          borderBottom: 0,
          borderTop: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
          borderRadius: '12px 12px 0 0',
        })}
      >
        {X.DIAMOND_SPONSORS.map((sponsor) => (
          <NativeLink
            data-ga-event-category="sponsor"
            data-ga-event-action="docs-premium"
            data-ga-event-label="doit.com"
            href={sponsor.href}
            rel="noopener sponsored"
            target="_blank"
          >
            <Box
              component="img"
              src={sponsor.src}
              alt={sponsor.description}
              title={sponsor.description}
              loading="lazy"
              sx={[
                {
                  height: sponsor.logoHeight,
                  width: sponsor.logoWidth,
                },
                sponsor.srcDark
                  ? (theme) =>
                      theme.applyDarkStyles({
                        content: `url(${sponsor.srcDark})`,
                      })
                  : {},
              ]}
            />
          </NativeLink>
        ))}
      </Stack>
      {X.DIAMOND_SPONSORS.length < 3 ? (
        <Link
          href="/material-ui/discover-more/backers/#diamond-sponsors"
          sx={(theme) => ({
            height: 45,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed',
            borderColor: (theme.vars || theme).palette.grey[300],
            borderRadius: '0 0 12px 12px',
            backgroundColor: alpha(theme.palette.primary[50], 0.4),
            transition: theme.transitions.create(['color', 'background-color']),
            '&:hover': {
              backgroundColor: (theme.vars || theme).palette.primary[50],
              borderColor: (theme.vars || theme).palette.primary[200],
            },
            '&:focus-visible': {
              outlineOffset: '-3px',
            },
            ...theme.applyDarkStyles({
              backgroundColor: alpha(theme.palette.primaryDark[700], 0.3),
              borderColor: alpha(theme.palette.primaryDark[600], 0.5),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary[700], 0.1),
                borderColor: alpha(theme.palette.primary[600], 0.4),
              },
            }),
          })}
        >
          <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
            {t('becomeADiamondSponsor')}
          </Typography>
        </Link>
      ) : null}
    </Stack>
  );
}
