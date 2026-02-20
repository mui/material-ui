import * as React from 'react';
import type { ContentProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { useDemo } from '@mui/internal-docs-infra/useDemo';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import MDButton from '@mui/material/Button';
import MDToggleButton from '@mui/material/ToggleButton';
import MDToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { alpha, styled } from '@mui/material/styles';
import { useTranslate } from '@mui/docs/i18n';

import '@wooorm/starry-night/style/light';

// ---------------------------------------------------------------------------
// Styled components — ported from Demo.js, DemoToolbarRoot.ts, DemoToolbar.js
// ---------------------------------------------------------------------------

const Root = styled('div')(({ theme }) => ({
  marginBottom: 24,
  marginLeft: theme.spacing(-2),
  marginRight: theme.spacing(-2),
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
    marginRight: 0,
  },
}));

const DemoPreview = styled('div')(({ theme }) => ({
  position: 'relative',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(3),
  backgroundColor: (theme.vars || theme).palette.background.paper,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  [theme.breakpoints.up('sm')]: {
    borderRadius: '12px 12px 0 0',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  ...theme.applyDarkStyles({
    backgroundColor: alpha(theme.palette.primaryDark[700], 0.1),
  }),
}));

// Matches DemoToolbarRoot.ts — the action-button bar between preview and code.
const ToolbarRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'codeOpen',
})<{ codeOpen?: boolean }>(({ theme }) => [
  {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxHeight: 50,
      marginTop: -1,
      padding: theme.spacing('2px', 1),
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      borderTopWidth: 0,
      backgroundColor: alpha(theme.palette.grey[50], 0.2),
      borderRadius: '0 0 12px 12px',
      transition: theme.transitions.create('border-radius'),
    },
    // Icon buttons inside the toolbar
    '& .MuiIconButton-root': {
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.grey[100],
      },
    },
    '& .MuiSvgIcon-root': {
      fontSize: 16,
      color: (theme.vars || theme).palette.grey[900],
    },
    variants: [
      {
        props: { codeOpen: true },
        style: {
          [theme.breakpoints.up('sm')]: {
            borderRadius: 0,
          },
        },
      },
    ],
  },
  theme.applyDarkStyles({
    [theme.breakpoints.up('sm')]: {
      backgroundColor: alpha(theme.palette.primaryDark[800], 0.2),
    },
    '& .MuiIconButton-root': {
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.primaryDark[700],
      },
    },
    '& .MuiSvgIcon-root': {
      color: (theme.vars || theme).palette.grey[400],
    },
  }),
]);

// File tab bar — shown between toolbar and code when there are multiple files.
const FileTabBar = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  overflow: 'auto',
  marginTop: -1,
  padding: theme.spacing(0.5, 1),
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
  borderTopWidth: 0,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  ...theme.applyDarkStyles({
    backgroundColor: alpha(theme.palette.primaryDark[700], 0.2),
  }),
}));

const FileTab = styled('button')<{ selected?: boolean }>(({ theme }) => ({
  ...theme.typography.body2,
  fontFamily: theme.typography.fontFamilyCode,
  fontSize: theme.typography.pxToRem(13),
  padding: theme.spacing(0.5, 1),
  border: '1px solid transparent',
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: (theme.vars || theme).palette.text.secondary,
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.action.hover,
  },
  variants: [
    {
      props: { selected: true },
      style: {
        color: (theme.vars || theme).palette.primary[700],
        backgroundColor: (theme.vars || theme).palette.primary[50],
        borderColor: (theme.vars || theme).palette.primary[200],
        ...theme.applyDarkStyles({
          color: (theme.vars || theme).palette.primary[200],
          backgroundColor: alpha(theme.palette.primary[900], 0.4),
          borderColor: (theme.vars || theme).palette.primary[800],
        }),
      },
    },
  ],
}));

// Wraps the already-highlighted code from useDemo — mirrors DemoCodeViewer in Demo.js.
const CodeViewer = styled('div')({
  '& pre': {
    margin: 0,
    marginTop: -1,
    maxHeight: 'min(68vh, 1000px)',
    maxWidth: 'initial',
    borderRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

const AnchorLink = styled('div')({
  marginTop: -64, // height of toolbar
  position: 'absolute',
});

const InitialFocus = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: theme.spacing(4),
  height: theme.spacing(4),
  pointerEvents: 'none',
}));

// ---------------------------------------------------------------------------
// Toolbar control styling — ported from DemoToolbar.js
// ---------------------------------------------------------------------------

const ToggleButtonGroup = styled(MDToggleButtonGroup)(({ theme }) => [
  theme.unstable_sx({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      '&:not(:first-of-type)': { pr: '2px' },
      '&:not(:last-of-type)': { pl: '2px' },
    },
  }),
]);

const ToggleButton = styled(MDToggleButton)(({ theme }) => [
  theme.unstable_sx({
    height: 26,
    width: 38,
    p: 0,
    fontSize: theme.typography.pxToRem(13),
    borderRadius: '999px',
    '&.Mui-disabled': {
      opacity: 0.8,
      cursor: 'not-allowed',
    },
  }),
]);

const ToolbarButton = styled(MDButton)(({ theme }) => ({
  height: 26,
  padding: '7px 8px 8px 8px',
  flexShrink: 0,
  borderRadius: 999,
  border: '1px solid',
  borderColor: alpha(theme.palette.grey[200], 0.8),
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.primary[600],
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    backgroundColor: theme.palette.primary[50],
    borderColor: theme.palette.primary[200],
    '@media (hover: none)': { backgroundColor: 'transparent' },
  },
  ...theme.applyDarkStyles({
    color: theme.palette.primary[300],
    borderColor: alpha(theme.palette.primary[300], 0.2),
    '& .MuiSvgIcon-root': { color: theme.palette.primary[300] },
    '&:hover': {
      borderColor: alpha(theme.palette.primary[300], 0.5),
      backgroundColor: alpha(theme.palette.primary[500], 0.2),
      '@media (hover: none)': { backgroundColor: 'transparent' },
    },
  }),
}));

function DemoTooltip(props: React.ComponentProps<typeof Tooltip>) {
  return (
    <Tooltip
      slotProps={{
        popper: {
          sx: { zIndex: (theme) => theme.zIndex.appBar - 1 },
        },
      }}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DemoContent(props: ContentProps<object>) {
  const demo = useDemo(props);
  const t = useTranslate();
  const [codeOpen, setCodeOpen] = React.useState(Boolean(demo.expanded));

  const hasJsTransform = demo.availableTransforms.includes('js');
  const isJsSelected = demo.selectedTransform === 'js';

  const handleLanguageClick = React.useCallback(
    (_event: React.MouseEvent, value: string | null) => {
      if (value !== null) {
        demo.selectTransform(value === 'js' ? 'js' : null);
      }
    },
    [demo],
  );

  const showCodeLabel = codeOpen ? t('hideSource') : t('showSource');

  return (
    <Root ref={demo.ref}>
      {demo.slug && <AnchorLink id={demo.slug} />}

      {/* Component Preview */}
      <DemoPreview>
        <InitialFocus tabIndex={-1} />
        {demo.component}
      </DemoPreview>

      {/* Toolbar — hidden on mobile, matches DemoToolbarRoot */}
      <ToolbarRoot codeOpen={codeOpen}>
        {/* Left side: JS/TS toggle (only visible when code is open) */}
        {codeOpen && hasJsTransform ? (
          <ToggleButtonGroup
            sx={{ margin: '8px 0' }}
            exclusive
            value={isJsSelected ? 'js' : 'ts'}
            onChange={handleLanguageClick}
          >
            <ToggleButton value="js" aria-label={t('showJSSource')}>
              JS
            </ToggleButton>
            <ToggleButton value="ts" aria-label={t('showTSSource')}>
              TS
            </ToggleButton>
          </ToggleButtonGroup>
        ) : (
          <div />
        )}

        {/* Right side: action buttons */}
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* Variant selector */}
          {demo.variants.length > 1 && (
            <ToolbarButton
              size="small"
              onClick={() => {
                const idx = demo.variants.indexOf(demo.selectedVariant);
                demo.selectVariant(demo.variants[(idx + 1) % demo.variants.length]);
              }}
            >
              {demo.selectedVariant}
            </ToolbarButton>
          )}

          {/* Show / hide code */}
          <ToolbarButton onClick={() => setCodeOpen((prev) => !prev)}>
            {showCodeLabel}
          </ToolbarButton>

          {/* Copy */}
          <DemoTooltip title={t('copySource')} placement="bottom">
            <IconButton onClick={demo.copy} sx={{ borderRadius: 1 }}>
              <ContentCopyRoundedIcon />
            </IconButton>
          </DemoTooltip>
        </Box>
      </ToolbarRoot>

      {/* File tabs — only when multiple files and code is visible */}
      {demo.files.length > 1 && codeOpen ? (
        <FileTabBar>
          {demo.files.map((file) => (
            <FileTab
              key={file.name}
              selected={demo.selectedFileName === file.name}
              onClick={() => demo.selectFileName(file.name)}
            >
              {file.name}
            </FileTab>
          ))}
        </FileTabBar>
      ) : null}

      {/* Code — animated open/close */}
      <Collapse in={codeOpen} timeout={150}>
        <CodeViewer>{demo.selectedFile}</CodeViewer>
      </Collapse>
    </Root>
  );
}
