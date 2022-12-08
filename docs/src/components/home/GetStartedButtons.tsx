import * as React from 'react';
import copy from 'clipboard-copy';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';

export default function GetStartedButtons({
  installation = 'npm install @mui/material @emotion/react @emotion/styled',
  to = ROUTES.documentation,
  ...props
}: { installation?: string; to?: string } & BoxProps) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    setCopied(true);
    copy(installation).then(() => {
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '&& > *': { minWidth: 'clamp(0px, (492px - 100%) * 999 ,100%)' },
        ...props.sx,
      }}
    >
      <Button
        href={to}
        component={Link}
        noLinkStyle
        size="large"
        variant="contained"
        endIcon={<KeyboardArrowRightRounded />}
        sx={{ mr: { xs: 0, sm: 2 } }}
      >
        Get started
      </Button>
      <Box sx={{ py: 1, display: { xs: 'block', sm: 'hidden' } }} />
      <Button
        size="large"
        // @ts-expect-error
        variant="code"
        endIcon={copied ? <CheckRounded color="primary" /> : <ContentCopyRounded />}
        onClick={handleCopy}
        sx={{
          maxWidth: '324px',
          display: 'inline-block',
          justifyContent: 'start',
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          position: 'relative',
          pr: 5,
        }}
      >
        {installation}
      </Button>
    </Box>
  );
}
