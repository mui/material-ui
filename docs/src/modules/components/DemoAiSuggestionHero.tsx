import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { SxProps, Theme } from '@mui/material/styles';
import { useTranslate } from '@mui/docs/i18n';

export interface DemoAiSuggestionHeroProps {
  suggestion: string;
  params: Record<string, any>;
  sx?: SxProps<Theme>;
  onSuccess?: (url: string) => void;
}

const baseUrl = process.env.NEXT_PUBLIC_MUI_CHAT_API_BASE_URL;

export default function DemoAiSuggestionHero({
  suggestion,
  params,
  sx,
  onSuccess,
}: DemoAiSuggestionHeroProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const t = useTranslate();

  const handleClick = async () => {
    if (!baseUrl) {
      return;
    }
    const setLoadingTimeout = setTimeout(() => setLoading(true), 200);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/v1/public/chat/open`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...params,
          type: 'mui-docs',
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to open in MUI Chat');
      }
      const data = await response.json();
      if (onSuccess) {
        onSuccess(data.nextUrl);
      }
      window.open(data.nextUrl, '_blank');
    } catch (err: any) {
      setError(err as Error);
    } finally {
      clearTimeout(setLoadingTimeout);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderTop: 'none',
        borderRadius: '0 0 12px 12px',
        p: 0,
        backgroundColor: 'background.paper',
        boxShadow: 0,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 2, pb: 1 }}>
        <AutoAwesomeIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {t('aiCustomizeDemo')}
        </Typography>
      </Box>
      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 400,
            py: 1,
            boxShadow: 'none',
          }}
          onClick={handleClick}
          disabled={loading}
          startIcon={loading ? <CircularProgress color="inherit" size={16} /> : null}
        >
          {suggestion}
        </Button>
      </Box>
      <Snackbar
        open={!!error}
        color="error"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setError(null)}
        autoHideDuration={6000}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          <AlertTitle>{t('aiChatFailed')}</AlertTitle>
          {error?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
