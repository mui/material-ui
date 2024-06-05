import * as React from 'react';
import copy from 'clipboard-copy';
import { Link } from '@mui/docs/Link';
import { Portal } from '@mui/base/Portal';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { RootSvgProps } from 'docs/src/icons/RootSvg';
import SvgMuiLogomark, {
  muiSvgLogoString,
  muiSvgWordmarkString,
} from 'docs/src/icons/SvgMuiLogomark';

interface LogoWithCopyMenuProps {
  logo?: React.ComponentType<RootSvgProps>;
  logoSvgString?: string;
  wordmarkSvgString?: string;
  marginLeft?: boolean;
}

export default function LogoWithCopyMenu({
  logo: LogoSvg = SvgMuiLogomark,
  logoSvgString = muiSvgLogoString,
  wordmarkSvgString = muiSvgWordmarkString,
  marginLeft,
}: LogoWithCopyMenuProps) {
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 8,
            mouseY: event.clientY - 8,
          }
        : null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const [copied, setCopied] = React.useState(false);
  const handleCopy = (svgSnippet: string) => {
    setCopied(true);
    copy(svgSnippet).then(() => {
      setTimeout(() => setCopied(false), 3500);
      handleClose();
    });
  };

  return (
    <React.Fragment>
      <Box
        component={Link}
        href="/"
        aria-label="Go to homepage"
        onContextMenu={handleContextMenu}
        sx={{
          cursor: 'default',
          mr: 1,
          ml: marginLeft ? 1.5 : undefined,
          '& > svg': { m: '0 !important' }, // override the 2px margin-left coming from the Link component
        }}
      >
        <LogoSvg height={28} width={28} />
      </Box>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
        sx={(theme) => ({
          '& .MuiMenuItem-root': {
            gap: 1,
            '& path': {
              fill: (theme.vars || theme).palette.text.tertiary,
              color: (theme.vars || theme).palette.text.tertiary,
            },
            '&:hover, &:focus-visible': {
              '& path': {
                fill: (theme.vars || theme).palette.text.primary,
                color: (theme.vars || theme).palette.text.primary,
              },
            },
          },
        })}
      >
        <MenuItem onClick={() => handleCopy(logoSvgString)}>
          <LogoSvg height={16} width={18} />
          Copy logo as SVG
        </MenuItem>
        <MenuItem onClick={() => handleCopy(wordmarkSvgString)}>
          <TextFieldsRoundedIcon sx={{ fontSize: '18px' }} />
          Copy wordmark as SVG
        </MenuItem>
      </Menu>
      <Portal container={() => document.body}>
        <Snackbar
          open={copied}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          TransitionComponent={Slide}
          message={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircleRoundedIcon sx={{ fontSize: '18px', color: 'success.main' }} />
              Logo SVG copied to clipboard!
            </Box>
          }
        />
      </Portal>
    </React.Fragment>
  );
}
