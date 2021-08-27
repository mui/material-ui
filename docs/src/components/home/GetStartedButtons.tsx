import * as React from 'react';
import copy from 'clipboard-copy';
import Box, { BoxProps } from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import ContentCopyRounded from '@material-ui/icons/ContentCopyRounded';
import CheckRounded from '@material-ui/icons/CheckRounded';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';

export default function GetStartedButtons({
  installation = 'npm install @material-ui/core',
  ...props
}: { installation?: string } & BoxProps) {
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
        href={ROUTES.documentation}
        component={Link}
        noLinkStyle
        size="large"
        variant="contained"
        endIcon={<KeyboardArrowRightRounded />}
      >
        Get started
      </Button>
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
