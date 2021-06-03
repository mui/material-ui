import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiButton from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import BrandingBulletItem from 'docs/src/modules/branding/BrandingBulletItem';
import Link from 'docs/src/modules/components/Link';
import { styled } from '@material-ui/core/styles';
import WatchIcon from 'docs/src/modules/branding/icons/Watch';

// PriorityButton start
interface IsPriorityButtonProps {
  title: string;
  premiumOn?: number;
  priorityOn?: number;
  clickPriorityOn?: any;
  clickPremiumOn?: any;
}

const Button1 = styled(MuiButton)(({ theme }) => ({
  '&.MuiButton-root': {
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
  '&.MuiButton-label': {
    textTransform: 'capitalize',
  },
}));

function IsPriorityButton(props: IsPriorityButtonProps) {
  const { title = 'Premium', priorityOn, premiumOn = 1, clickPriorityOn, clickPremiumOn } = props;

  return (
    <Button1
      color="inherit"
      variant="contained"
      size="small"
      sx={
        (premiumOn === 1 && title === 'Premium') || (priorityOn === 1 && title === 'Priority')
          ? { background: 'white', color: 'text.primary' }
          : {
              background: 'transparent',
              color: 'greyAA',
            }
      }
      onClick={() => {
        if (title === 'Priority') {
          clickPriorityOn();
        } else {
          clickPremiumOn();
        }
      }}
    >
      {title}
    </Button1>
  );
}
// PriorityButton end

interface StartMaterialCardProps {
  actualPrice: number;
  buttonTitle: string;
  content: string;
  features: any;
  featureTitle: string;
  href: string;
  id: number;
  imgProps: React.ImgHTMLAttributes<HTMLImageElement>;
  isPriorityButton: boolean;
  price: number;
  priceDescription: string;
  priceFor: string;
  src: string;
  title: string;
  variant: 'dark' | 'light';
}

export default function StartMaterialCard(props: StartMaterialCardProps) {
  const {
    id,
    variant,
    actualPrice,
    price,
    priceFor,
    priceDescription,
    src,
    href,
    imgProps,
    title,
    content,
    buttonTitle,
    featureTitle,
    isPriorityButton = false,
    features,
  } = props;

  const [premiumOn, setPremiumOn] = React.useState(1);
  const [priorityOn, setPriorityOn] = React.useState(0);

  return (
    <Box
      sx={{
        p: 5,
        pt: 8,
        pb: { xs: 2.5, md: 8 },
        position: 'relative',
        color: variant === 'dark' ? 'secondary.contrastText' : null,
        bgcolor: variant === 'dark' ? 'secondary.main' : 'greyF3',
        minHeight: { xs: 420, md: 460, lg: 685 },
        mb: { xs: 8, md: 8, lg: 0 },
        px: { xs: 2.5, md: 5 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <Box
        component="img"
        src={src}
        alt=""
        {...imgProps}
        sx={{ position: 'absolute', left: 40, top: -30, zIndex: 1 }}
      />
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <Typography sx={{ mt: 2, mb: 4, maxWidth: 700, minHeight: { lg: 88 } }} variant="body2">
        {content}
      </Typography>
      <Typography variant="h3" component="h3" sx={{ minHeight: { lg: 43 } }}>
        {actualPrice !== 0 && (
          <Box
            component="span"
            sx={{
              mr: 1,
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
        <Typography
          variant="body1"
          component="span"
          sx={{
            ml: 1,
            mt: 2,
            mb: 4,
            mr: 0,
          }}
        >
          / {priceFor}
        </Typography>
      </Typography>
      <Typography
        sx={{
          mt: 0,
          mb: 0,
          maxWidth: 700,
          color: variant === 'dark' ? 'greyAA' : 'grey5A',
          minHeight: { lg: 21 },
        }}
        variant="body3"
      >
        {priceDescription}
      </Typography>
      <MuiButton
        href={href}
        component={Link}
        size="large"
        variant="contained"
        sx={{
          mt: 3,
          mb: 4,
          my: { xs: 4 },
          maxWidth: 310,
          '& .MuiButton-endIcon': {
            marginLeft: 'auto',
          },
        }}
        endIcon={<NavigateNextIcon />}
      >
        {buttonTitle}
      </MuiButton>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        {featureTitle}:
      </Typography>
      {isPriorityButton && (
        <Box
          sx={{
            bgcolor: 'rgba(255, 255, 255, .2)',
            mixBlendMode: 'normal',
            borderRadius: 1,
            mt: 2,
            p: '2px',
            maxWidth: 310,
          }}
        >
          <IsPriorityButton
            title="Premium"
            premiumOn={premiumOn}
            clickPremiumOn={() => {
              setPremiumOn(1);
              setPriorityOn(0);
            }}
          />
          <IsPriorityButton
            title="Priority"
            priorityOn={priorityOn}
            clickPriorityOn={() => {
              setPriorityOn(1);
              setPremiumOn(0);
            }}
          />
        </Box>
      )}
      <Box component="ul" sx={{ m: 0, p: 0 }}>
        {features.map((feature: any, index: number) => (
          <BrandingBulletItem variant={variant} key={index} spanVariant="body2">
            {feature.underline ? (
              <Box
                component="span"
                sx={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '0.1em',
                  color: variant === 'light' ? 'text.primary' : 'white',
                }}
              >
                {feature.detail}
              </Box>
            ) : (
              feature.detail
            )}
          </BrandingBulletItem>
        ))}
      </Box>
      {id === 2 && (
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'rgb(19 47 76 / 60%)',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: 3,
            flexWrap: 'wrap',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 300,
              right: 0,
              background: 'linear-gradient(359deg, rgb(19 47 76), transparent)',
            }}
          />
          <Box sx={{ zIndex: 1 }}>
            <WatchIcon />
            <Typography sx={{ mt: 1.5 }}>Available later this year</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
