import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';

interface Props {
  name: string;
  link: string;
  srcLight: string;
  srcDark: string;
}

export default function ComponentShowcaseCard({ link, srcLight, srcDark, name }: Props) {
  return (
    <Card
      component={Link}
      noLinkStyle
      variant="outlined"
      href={link}
      sx={(theme) => ({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        borderColor: 'divider',
        ...theme.applyDarkStyles({
          backgroundColor: `${alpha(theme.palette.primaryDark[700], 0.3)}`,
          borderColor: 'divider',
        }),
      })}
    >
      <CardMedia
        component="img"
        alt=""
        image={srcLight}
        sx={(theme) => ({
          aspectRatio: '16 / 9',
          background: `linear-gradient(180deg, ${alpha(
            theme.palette.grey[50],
            0.5,
          )} 20%, #FFF 100%)`,
          borderBottom: '1px solid',
          borderColor: 'divider',
          ...theme.applyDarkStyles({
            content: `url(${srcDark})`,
            background: `linear-gradient(180deg, ${alpha(
              theme.palette.primaryDark[800],
              0.5,
            )} 20%, ${theme.palette.primaryDark[900]} 100%)`,
            borderColor: 'divider',
          }),
        })}
      />
      <Typography component="h2" variant="body2" fontWeight="semiBold" sx={{ px: 2, py: 1.5 }}>
        {name}
      </Typography>
    </Card>
  );
}
