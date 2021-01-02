import * as React from 'react';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import Box, { BoxTypeMap } from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import t1 from 'docs/src/modules/branding/t1';

interface PersonaRootProps {
  styleProps?: { size?: 'large' | 'small' };
}

const PersonaRoot: OverridableComponent<BoxTypeMap<PersonaRootProps>> = styled(
  Box,
  {},
  { name: 'Persona', slot: 'Root' },
)<PersonaRootProps>(({ styleProps = { size: 'large' }, theme }) => ({
  '& [class*="MuiAvatar-root"]': {
    width: styleProps.size === 'large' ? 200 : 120,
    height: styleProps.size === 'large' ? 200 : 120,
    marginBottom: theme.spacing(1),
  },
  '& [class*="MuiIconButton-root"]': {
    width: 40,
    height: 40,
    background: 'white',
  },
  '& .MuiTypography-title': {
    color: theme.palette.grey5A,
  },
})) as OverridableComponent<BoxTypeMap<PersonaRootProps>>;

interface PersonaProps {
  name?: string;
  src?: string;
  title?: string;
  location?: string;
  twitter?: string;
  github?: string;
  size?: 'small' | 'large';
}

export default function Persona(props: PersonaProps) {
  const { name, src, title, location, twitter, github, size = 'large' } = props;
  return (
    <PersonaRoot component={Grid} styleProps={{ size }} container spacing={1}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Avatar src={src} alt={`Image of ${name}`} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" variant="h4">
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" className="MuiTypography-title" gutterBottom>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center">{location}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={1}>
          {twitter && (
            <Grid item>
              <IconButton component="a" href={twitter} aria-label={t1('twitter')}>
                <TwitterIcon />
              </IconButton>
            </Grid>
          )}
          {github && (
            <Grid item>
              <IconButton component="a" href={github} aria-label={t1('github')}>
                <GitHubIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>
    </PersonaRoot>
  );
}
