import * as React from 'react';
import copy from 'clipboard-copy';
import NextLink from 'next/link';
import Box, { BoxProps } from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import ContentCopyRounded from '@material-ui/icons/ContentCopyRounded';
import CheckRounded from '@material-ui/icons/CheckRounded';
import ROUTES from 'docs/src/route';

export default function GetStartedButtons(props: BoxProps) {
  const [copied, setCopied] = React.useState(false);
  const installation = 'npm install @mui/core-material';
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
        '&& > *': { minWidth: 'clamp(0px, (449px - 100%) * 999 ,100%)' },
        ...props.sx,
      }}
    >
      <NextLink href={ROUTES.documentation} passHref>
        <Button
          component="a"
          size="large"
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
        >
          Get Started
        </Button>
      </NextLink>
      <Box sx={{ width: 16, height: 16 }} />
      <Button
        size="large"
        // @ts-expect-error
        variant="code"
        startIcon="$"
        endIcon={copied ? <CheckRounded color="primary" /> : <ContentCopyRounded />}
        onClick={handleCopy}
      >
        {installation}
      </Button>
    </Box>
  );
}
