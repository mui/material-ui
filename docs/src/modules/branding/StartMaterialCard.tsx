import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MaterialLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import BrandingBulletItem from 'docs/src/modules/branding/BrandingBulletItem';
import Link from 'docs/src/modules/components/Link';
import { makeStyles } from '@material-ui/core/styles';

import WatchIcon from 'docs/src/modules/branding/icons/Watch';

//PriorityButton start
interface IsPriorityButtonProps {
  title: string;
  premiumOn: number;
  priorityOn: number;
  clickPriorityOn: any;
  clickPremiumOn: any;
}
function IsPriorityButton(props: IsPriorityButtonProps) {
  const { title ="Premium", priorityOn, premiumOn = 1, clickPremiumOn, clickPriorityOn } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: 'center',
      width: '50%',
      fontSize: '14px',
      lineHeight: '20px',
      border: '0',
      borderRadius: '4px',
      padding: '8px 0',
      '&:hover': {
        backgroundColor: 'white',
        color: theme.palette.text.primary,
      },
    },
    label: {
      textTransform: 'capitalize',
    },
  }));
  const classes = useStyles();

  return (
    <Button
      color="inherit"
      variant="contained"
      size="small"
      sx={
        (premiumOn === 1 && title === "Premium") || (priorityOn === 1 && title === "Priority")
          ? { background: 'white', color: 'text.primary' }
          : {
              background: 'transparent',
              color: 'greyAA',
            }
      }
      onClick={() => { title === "Priority" ? clickPriorityOn() : clickPremiumOn()}}
      classes={{ root: classes.root, label: classes.label }}
    >
      {title}
    </Button>
  );
}
//PriorityButton end

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

  const [premiumOn, setPremiumOn] = React.useState(1);
  const [priorityOn, setPriorityOn] = React.useState(0);

  const useStyles = makeStyles((theme) => ({
    endIcon: {
      marginLeft: 'auto',
    },
  }));
  const classes = useStyles();

  return (
    <Box
      sx={{
        p: 5,
        pt: 8,
        pb: { xs: 2.5, md: 8 },
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
        sx={{ height: 60, position: 'absolute', left: 40, top: -30, zIndex: 1 }}
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
              bgcolor: 'rgb(255 80 95 / 20%)',
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
        sx={{ mt: 0, mb: 0, maxWidth: 700, color: 'grey5A', minHeight: { lg: 21 } }}
        variant="body3"
      >
        {priceDescription}
      </Typography>
      <Button
        href="/getting-started/usage/"
        component={MaterialLink}
        size="large"
        variant="contained"
        sx={{ mt: 3, mb: 4, my: { xs: 4 }, maxWidth: 310 }}
        endIcon={<NavigateNextIcon />}
        classes={{ endIcon: classes.endIcon }}
      >
        {buttonTitle}
      </Button>
      <Typography variant="h4" sx={{ fontSize: '16px', lineHeight: '24px', mb: id === 3 ? 2 : 0 }}>
        {featureTitle}:
      </Typography>
      {isPriorityButton && (
        <Box
          sx={{
            background: 'rgba(255, 255, 255, .2)',
            mixBlendMode: 'normal',
            borderRadius: '4px',
            padding: '2px',
            maxWidth: '310px',
          }}
        >
          <IsPriorityButton title="Premium" premiumOn={premiumOn}
            clickPremiumOn={() => { setPremiumOn(1); setPriorityOn(0) }} />
          <IsPriorityButton title="Priority" priorityOn={priorityOn} clickPriorityOn={() => {setPriorityOn(1);setPremiumOn(0)}}/>
          </Box>
      )}
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
      {id === 3 && (
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            bgcolor: 'rgb(19 47 76 / 60%)',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '30px',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <WatchIcon />
            <Typography sx={{ mt: 1.5 }}>Available later this year</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
