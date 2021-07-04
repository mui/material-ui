import * as React from 'react';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import Box, { BoxTypeMap } from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Stack from '@material-ui/core/Stack';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import t1 from 'docs/src/modules/branding/t1';

interface PersonaRootProps {
  styleProps: { size: 'large' | 'small' };
}

const PersonaRoot: OverridableComponent<BoxTypeMap<PersonaRootProps>> = styled(Box, {
  name: 'Persona',
  slot: 'Root',
})<PersonaRootProps>(({ styleProps, theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  flexDirection: 'column',
  alignItems: 'center',
  '& [class*="MuiAvatar-root"]': {
    width: styleProps.size === 'large' ? 200 : 120,
    height: styleProps.size === 'large' ? 200 : 120,
    marginBottom: theme.spacing(1),
  },
  '& [class*="MuiIconButton-root"]': {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    color: theme.palette.greyAA,
    boxShadow: `0 2px 3px rgba(9, 10, 12, .08)`,
  },
})) as OverridableComponent<BoxTypeMap<PersonaRootProps>>;

interface BrandingPersonaProps {
  github: string;
  location?: string;
  name?: string;
  size?: 'small' | 'large';
  src?: string;
  srcSet?: string;
  title?: string;
  twitter?: string;
}

export default function BrandingPersona(props: BrandingPersonaProps) {
  const { name, src, srcSet, title, location, twitter, github, size = 'large' } = props;
  return (
    <PersonaRoot
      styleProps={{ size }}
      sx={{
        '& img': {
          borderRadius: '50%',
          display: 'block',
          bgcolor: 'greyD7',
          mb: 1,
        },
      }}
    >
      <img
        loading="lazy"
        src={src}
        width={size === 'small' ? 120 : 200}
        height={size === 'small' ? 120 : 200}
        srcSet={srcSet}
        alt=""
      />
      <Typography variant="h4" component="div">
        {name}
      </Typography>
      <Typography sx={{ color: 'grey5A' }} variant="body2">
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
        {location}
      </Typography>
      <Stack direction="row" spacing={1}>
        {twitter && (
          <IconButton
            component="a"
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener"
            aria-label={t1('twitter')}
          >
            <TwitterIcon />
          </IconButton>
        )}
        <IconButton
          component="a"
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener"
          aria-label={t1('github')}
        >
          <GitHubIcon />
        </IconButton>
      </Stack>
    </PersonaRoot>
  );
}
