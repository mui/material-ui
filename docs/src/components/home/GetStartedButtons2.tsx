import * as React from 'react';
import copy from 'clipboard-copy';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';

interface GetStartedButtons2Props extends BoxProps {
  getStartedUrl?: string;
  learnUrl?: string;
  learnLabel?: string;
  installation?: string;
}

export default function GetStartedButtons2(props: GetStartedButtons2Props) {
  const [copied, setCopied] = React.useState(false);
  const {
    installation = 'npm install @mui/material @emotion/react @emotion/styled',
    getStartedUrl = ROUTES.documentation,
    learnUrl,
    learnLabel,
    ...other
  } = props;
  const handleCopy = () => {
    setCopied(true);
    copy(installation).then(() => {
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <React.Fragment>
      <Box
        {...other}
        sx={{
          display: 'flex',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          '&& > *': {
            minWidth: { xs: '100%', md: '0%' },
          },
          ...other.sx,
        }}
      >
        <Button
          href={getStartedUrl}
          component={Link}
          noLinkStyle
          size="large"
          variant="contained"
          endIcon={<KeyboardArrowRightRounded />}
          sx={{
            flexShrink: 0,
            mr: { xs: 0, md: 1.5 },
            mb: { xs: 2, md: 0 },
          }}
        >
          Get started
        </Button>
        <Button
          href={learnUrl}
          component={Link}
          noLinkStyle
          variant="outlined"
          size="large"
          endIcon={<KeyboardArrowRightRounded />}
          sx={(theme) => ({
            color: 'text.primary',
            bgcolor: 'grey.50',
            borderColor: 'grey.300',
            boxShadow:
              '0px 2px 2px rgba(205, 210, 215, 0.2), inset 0px 4px 4px rgba(205, 210, 215, 0.2)',
            ...theme.applyDarkStyles({
              color: 'gray.100',
              borderColor: 'primaryDark.400',
              bgcolor: 'primaryDark.700',
              boxShadow: '0px 2px 2px #0B0D0E, inset 0px 4px 4px rgba(20, 25, 31, 0.3)',
            }),
          })}
        >
          {learnLabel}
        </Button>
      </Box>
      <Button
        // @ts-ignore
        variant="code"
        onClick={handleCopy}
        endIcon={
          copied ? (
            <CheckRounded color="primary" fontSize="small" />
          ) : (
            <ContentCopyRounded fontSize="small" />
          )
        }
        sx={(theme) => ({
          width: 'max-content',
          bgcolor: 'transparent',
          border: 'none',
          mt: 2,
          ml: -2,
          cursor: 'copy',
          '& .MuiButton-endIcon': { mr: 0, color: 'primary.main', position: 'relative' },
          ...theme.applyDarkStyles({
            bgcolor: 'transparent',
          }),
        })}
      >
        $ {installation}
      </Button>
    </React.Fragment>
  );
}
