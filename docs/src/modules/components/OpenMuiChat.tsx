import * as React from 'react';
import { useRouter } from 'next/router';
import { styled, keyframes, alpha } from '@mui/material/styles';
import MDButton, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SvgMuiLogomark from 'docs/src/icons/SvgMuiLogomark';
import PageContext from './PageContext';
import getProductInfoFromUrl from '../utils/getProductInfoFromUrl';

interface OpenInMUIChatButtonProps extends ButtonProps {
  params: {
    name: string;
    description?: string;
    package?: {
      name: string;
      version: string;
    };
    files: {
      path: string;
      content: string;
      isEntry?: boolean;
    }[];
  };
}

const rainbow = keyframes`
  0% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 0% center;
  }
`;

export const RainbowButton = styled(MDButton)(({ theme }) => ({
  /* CSS Variables (embedded) */
  '--color-1': '0 100% 63%',
  '--color-2': '270 100% 63%',
  '--color-3': '210 100% 63%',
  '--color-4': '195 100% 63%',
  '--color-5': '90 100% 63%',
  '--text-color': '#fff',

  position: 'relative',
  display: 'inline-flex',
  height: 26,
  padding: '7px 8px 8px 8px', // 7px for optical alignment
  flexShrink: 0,
  borderRadius: 999,
  border: '1px solid transparent',
  borderColor: alpha(theme.palette.grey[200], 0.8),
  borderBottomColor: 'transparent',
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.primary[600],
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
  backgroundSize: '200%',
  backgroundClip: 'padding-box, border-box, border-box',
  backgroundOrigin: 'border-box',
  animation: `${rainbow} 3s linear infinite`,
  transition: 'background-color 0.2s, color 0.2s',
  cursor: 'pointer',
  '--bg-color-raw': '255, 255, 255',
  '--bg-color': 'rgb(var(--bg-color-raw))',
  backgroundImage: `linear-gradient(var(--bg-color), var(--bg-color)), linear-gradient(var(--bg-color) 50%, rgba(var(--bg-color-raw), 0.6) 80%, rgba(var(--bg-color-raw), 0)), linear-gradient(90deg, hsl(var(--color-1)), hsl(var(--color-5)), hsl(var(--color-3)), hsl(var(--color-4)), hsl(var(--color-2)))`,

  ...theme.applyDarkStyles({
    '--bg-color-raw': '0, 0, 0',
    color: theme.palette.primary[300],
    borderColor: alpha(theme.palette.primary[300], 0.2),
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary[300],
    },
  }),

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
    fill: 'currentColor',
  },
  '& .MuiCircularProgress-root': {
    color: 'var(--text-color)',
  },
}));

const productToPackage: Record<string, string> = {
  'material-ui': '@mui/material',
  'joy-ui': '@mui/joy',
  'x-data-grid': '@mui/x-data-grid',
  'x-date-pickers': '@mui/x-date-pickers',
  'x-tree-view': '@mui/x-tree-view',
  'x-charts': '@mui/x-charts',
};

export default function OpenInMUIChatButton(props: OpenInMUIChatButtonProps) {
  const { ...otherProps } = props;
  const { productIdentifier } = React.use(PageContext);
  const router = useRouter();
  const productId = getProductInfoFromUrl(router.asPath).productId;
  const packageName = productToPackage[productId];
  const packageVersion =
    (
      productIdentifier.versions.find((it) => it.current)?.text ??
      productIdentifier.versions?.[0]?.text
    ) // slice to remove the 'v' prefix
      ?.slice(1) ?? 'latest';

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_MUI_CHAT_API_BASE_URL;

  const handleClick = async () => {
    // Debounce the loading state to avoid flickering
    const setLoadingTimeout = setTimeout(() => setLoading(true), 200);
    setError(null);

    if (!baseUrl) {
      throw new Error(
        'Could not find the MUI Chat URL, please open a new issue on https://github.com/mui/material-ui/issues/new',
      );
    }

    try {
      const response = await fetch(`${baseUrl}/v1/public/chat/open`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: document.title,
          ...props.params,
          type: 'mui-docs',
          package: {
            name: packageName,
            version: packageVersion,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to open in MUI Chat');
      }

      const data = await response.json();
      window.open(data.nextUrl, '_blank');
    } catch (err: any) {
      setError(err as Error);
    } finally {
      clearTimeout(setLoadingTimeout);
      setLoading(false);
    }
  };

  // If the base URL is not set, we can't render the button
  if (!baseUrl) {
    return null;
  }

  return (
    <React.Fragment>
      <RainbowButton
        loading={loading}
        disabled={!!error}
        loadingIndicator={<CircularProgress color="inherit" size={12} />}
        onClick={handleClick}
        sx={{ mr: 0.5 }}
        {...otherProps}
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
}
