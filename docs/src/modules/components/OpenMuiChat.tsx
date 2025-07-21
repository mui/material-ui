import * as React from 'react';
import { styled, keyframes, alpha } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PageContext from 'docs/src/modules/components/PageContext';
import SvgMuiLogomark from 'docs/src/icons/SvgMuiLogomark';
import { createMuiChat } from '../sandbox/MuiChat';
import { DemoData } from '../sandbox/types';

interface OpenInMUIChatButtonProps extends ButtonProps {
  demoData: DemoData;
}

const rainbow = keyframes`
  0% {
    background-position: -100% center;
  }
  100% {
    background-position: 100% center;
  }
`;

const RainbowButton = styled(Button)(({ theme }) => ({
  '--color-1': '0 100% 63%',
  '--color-2': '270 100% 63%',
  '--color-3': '210 100% 63%',
  '--color-4': '195 100% 63%',
  '--color-5': '90 100% 63%',
  position: 'relative',
  display: 'inline-flex',
  height: 26,
  padding: '7px 8px 8px 8px', // 7px for optical alignment
  flexShrink: 0,
  borderRadius: '6px',
  border: '1px solid transparent',
  borderBottomWidth: '3px',
  borderBottomColor: 'transparent',
  boxShadow: '0 -1px 4px 0px rgba(255, 255, 255, 0.32)',
  '&.MuiButton-loading': {
    boxShadow: '0 -1px 4px 0px rgba(255, 255, 255, 0.32)',
  },
  color: '#fff',
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
  backgroundSize: '200%',
  backgroundClip: 'padding-box, border-box, border-box',
  backgroundOrigin: 'border-box',
  animation: `${rainbow} 2s linear infinite`,
  '--bg-color-raw': '16, 18, 20',
  '--bg-color': 'rgb(var(--bg-color-raw))',
  backgroundImage: `linear-gradient(var(--bg-color), var(--bg-color)), linear-gradient(var(--bg-color) 50%, rgba(var(--bg-color-raw), 0.6) 80%, rgba(var(--bg-color-raw), 0)), linear-gradient(90deg, hsl(var(--color-1)), hsl(var(--color-5)), hsl(var(--color-3)), hsl(var(--color-4)), hsl(var(--color-2)))`,
  ...theme.applyDarkStyles({
    borderColor: alpha(theme.palette.primary[300], 0.2),
  }),
  '&:hover': {
    boxShadow: '0 -1px 4px 0px rgba(255, 255, 255, 0.56)',
    animationPlayState: 'paused',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: '-20%',
    left: '50%',
    zIndex: 0,
    height: '20%',
    width: '60%',
    transform: 'translateX(-50%)',
    animation: `${rainbow} 3s linear infinite`,
    background:
      'linear-gradient(90deg, hsl(var(--color-1)), hsl(var(--color-5)), hsl(var(--color-3)), hsl(var(--color-4)), hsl(var(--color-2)))',
    filter: 'blur(0.8rem)',
  },
  '& > svg': {
    height: 12,
    width: 12,
    margin: '1px 4px 0 4px',
  },
  '& > svg > path': {
    fill: (theme.vars || theme).palette.primary.main,
  },
}));

const OpenInMUIChatButton = React.forwardRef<HTMLButtonElement, OpenInMUIChatButtonProps>(
  function OpenInMUIChatButton({ demoData, ...props }, ref) {
    const { productId } = React.useContext(PageContext);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);
    const baseUrl = process.env.MUI_CHAT_API_BASE_URL;
    const scopes = process.env.MUI_CHAT_SCOPES;

    const handleClick = async () => {
      setLoading(true);
      setError(null);

      try {
        await createMuiChat(demoData).openSandbox();
      } catch (err: any) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    // If the base URL is not set, we can't render the button
    if (!baseUrl || !scopes || !scopes.split(',').includes(productId)) {
      return null;
    }

    return (
      <React.Fragment>
        <RainbowButton
          data-mui-color-scheme="dark"
          ref={ref}
          loading={loading}
          disabled={!!error}
          loadingIndicator={<CircularProgress color="inherit" size={12} />}
          onClick={handleClick}
          {...props}
        >
          Edit in <SvgMuiLogomark /> Chat
        </RainbowButton>
        <Snackbar
          open={!!error}
          color="error"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => setError(null)}
          autoHideDuration={6000}
        >
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
            {error?.message || 'Failed to open in MUI Chat'}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  },
);

export default OpenInMUIChatButton;
