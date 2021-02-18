import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MaterialLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import BrandingBulletItem from 'docs/src/modules/branding/BrandingBulletItem';
import Link from 'docs/src/modules/components/Link';
import { makeStyles } from '@material-ui/core/styles';
import PriorityButton from './PriorityButton';

interface StartMaterialCardProps {
  id: number;
  src: string;
  title: string;
  content: string;
  actualPrice: number;
  price: number;
  priceFor: string;
  priceDescription: string;
  buttonTitle: string;
  featureTitle: string;
  isPriorityButton: boolean;
  features: array;
  variant: string;
}
const useStyles = makeStyles((theme) => ({
  endIcon: {
    marginLeft: 'auto',
  },
}));

export default function StartMaterialCard(props: StartMaterialCardProps) {
  const {
    id,
    variant,
    actualPrice,
    price,
    priceFor,
    priceDescription = '',
    src,
    title,
    content,
    buttonTitle,
    featureTitle,
    isPriorityButton = false,
    features,
  } = props;
  const classes = useStyles();

  return (
    <Box
      sx={{
        p: 5,
        pt: 8,
        pb: { xs: 2.5, md: 8},
        position: 'relative',
        color: variant === 'dark' ? 'secondary.contrastText' : 'info',
        borderRadius: 1,
        overflow: 'visible',
        minHeight: { xs: 420, md: 460, lg: 660 },
        mb: { xs: 8, md: 8, lg: 0 },
        px: { xs: 2.5, md: 5 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        bgcolor: variant === 'dark' ? 'secondary.main' : 'greyF3',
      }}
    >
      <Box
        component="img"
        src={src}
        loading="lazy"
        alt=""
        sx={{ height: 60, position: 'absolute', left: 40, top: -30 }}
      />
      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <Typography sx={{ mt: 2, mb: 4, maxWidth: 700, minHeight: { lg: 88 } }} variant="body2">
        {content}
      </Typography>
      <Typography variant="h3" component="h3" sx={{ minHeight: { lg: 43 } }}>
        {actualPrice != 0 && (
          <Box
            component="span"
            sx={{
              mr: 2,
              color: 'sizzlingRed',
              fontSize: '16px',
              lineHeight: '24px',
              textDecorationLine: 'line-through',
              background: 'rgb(255 80 95 / 20%)',
              fontWeight: '600',
              minWidth: '47px',
              display: 'inline-block',
              textAlign: 'center',
              borderRadius: '2px',
            }}
          >
            ${actualPrice}
          </Box>
        )}
        ${price}
        <Box
          component="span"
          sx={{
            ml: 1,
            mt: 2,
            mb: 4,
            mr: 0,
            maxWidth: 700,
            fontSize: '18px',
            lineHeight: '24px',
            fontWeight: 'normal',
          }}
        >
          / {priceFor}
        </Box>
      </Typography>
      <Typography
        sx={{ mt: 0, mb:0 , maxWidth: 700, color: 'grey5A', minHeight: { lg: 21 } }}
        variant="body3"
      >
        {priceDescription}
      </Typography>
      <Button
        href="/getting-started/usage/"
        component={MaterialLink}
        size="large"
        variant="contained"
        sx={{ mt: 3, mb: 4, my:{xs:4}, maxWidth: 310 }}
        endIcon={<NavigateNextIcon />}
        classes={{
          endIcon: classes.endIcon,
        }}
      >
        {buttonTitle}
      </Button>
      <Typography variant="h4" sx={{ fontSize: '16px', lineHeight: '24px',  mb: id === 3 ? 2 : 0 }}>
        {featureTitle}:
      </Typography>
      {isPriorityButton && <PriorityButton priority="Priority" premium="Premium" />}
      <Box component="ul" sx={{ m: 0, p: 0 }}>
        {features.map((feature) => (
          <BrandingBulletItem
            variant={variant}
            key={feature.id}
            BoxSx={{ mt: 2, mb: 0 }}
            spanSx={{ fontSize: '16px', fontWeight: 'normal', lineHeight: '24px' }}
            spanVariant="h4"
          >
            {feature.isLink ? (
              <Box
                component={Link}
                sx={{
                  textDecoration: 'underline',
                  color: variant === 'light' ? 'text.primary' : 'white',
                }}
                href={feature.href}
              >
                {feature.detail}
              </Box>
            ) : (
              feature.detail
            )}
          </BrandingBulletItem>
        ))}
      </Box>
    </Box>
  );
}
