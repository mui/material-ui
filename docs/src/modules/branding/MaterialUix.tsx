import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface MaterialUixCardProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
  title?: string;
  variant?: 'dark' | 'light';
  BoxPlaceAt?: number | undefined | false;
}

export function MaterialUixCard(props: MaterialUixCardProps) {
  const { icon, image, title, variant, children, BoxPlaceAt } = props;

  return (
    <Box
      sx={{
        bgcolor: variant === 'light' ? 'greyF3' : '#132F4C',
        minHeight: { xs: 563, sm: 680 },
        px: { xs: 3.5, sm: 7.5 },
        py: { xs: 5, sm: 6 },
        position: 'relative',
      }}
    >
      <Box sx={{ width: 178 }}>
        {image ? <img loading="lazy" width="100%" src={image} alt="" /> : icon}
      </Box>
      <Typography
        variant="h3"
        sx={{
          mt: { xs: 4, sm: 6 },
          color: variant === 'light' ? 'secondary.main' : 'white',
        }}
      >
        {title}
      </Typography>
      <Typography
        component="div"
        variant="body2"
        sx={{ color: variant === 'light' ? 'grey5A' : 'greyAA' }}
      >
        {children}
      </Typography>
      {variant === 'dark' && BoxPlaceAt && (
        <Box
          component="img"
          src="/static/branding/block13.svg"
          loading="lazy"
          alt=""
          sx={{
            position: 'absolute',
            right: 0,
            bottom: '-80px',
            display: { xs: 'none', sm: 'block' },
          }}
        />
      )}
    </Box>
  );
}

const CustomGrid = styled(Grid)(({ theme }) => ({
  '&:nth-child(even)': {
    position: 'relative',
    top: theme.spacing(7.5),
    [theme.breakpoints.down('lg')]: {
      top: 0,
    },
  },
}));

interface MaterialUixProps {
  data: Array<object>;
  variant?: 'dark' | 'light';
}

export default function MaterialUix(props: MaterialUixProps) {
  const { data, variant = 'light' } = props;
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <Grid container spacing={3}>
      {data.map((material: any, i: number) => (
        <CustomGrid item xs={12} md={6} key={material.title}>
          <MaterialUixCard
            image={material.src}
            title={material.title}
            variant={variant}
            BoxPlaceAt={isSmUp ? i === data.length - 1 && i : i === data.length - 2 && i}
          >
            <Box sx={{ mt: 2 }}>{material.description}</Box>
          </MaterialUixCard>
        </CustomGrid>
      ))}
    </Grid>
  );
}
