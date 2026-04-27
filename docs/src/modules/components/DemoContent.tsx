import * as React from 'react';
import type { ContentProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { useDemo } from '@mui/internal-docs-infra/useDemo';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MDButton from '@mui/material/Button';
import MDToggleButton from '@mui/material/ToggleButton';
import MDToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { alpha, styled } from '@mui/material/styles';
import { useTranslate } from '@mui/docs/i18n';
import useScrollAnchor from './useScrollAnchor';

// Dark code-panel background used by the highlighted source viewer.
const CODE_BG = 'hsl(210, 25%, 9%)';

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
// Also hosts the styles required by the `enhanceCodeEmphasis` source enhancer:
// frame/line highlights, indent shifting, fade overlay, and collapsible frame
// transitions for `data-frame-type` / `data-collapsible` markup.
const CodeViewer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded?: boolean }>(({ theme }) => ({
  position: 'relative',

  // ---- Base <pre> styles (existing dark code panel) ----
  '& pre': {
    margin: 0,
    marginTop: -1,
    maxWidth: 'initial',
    borderRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'auto',
    backgroundColor: CODE_BG,
    border: '1px solid transparent',
    '-webkit-print-color-scheme': 'dark',
    colorScheme: 'dark',
    color: '#f8f8f2',
    padding: 'calc(2 * var(--muidocs-spacing))',
    fontFamily: 'Menlo, Consolas, "Droid Sans Mono", monospace',
    fontWeight: '400',
    fontSize: '0.8125rem',
    lineHeight: '1.5',
  },

  // Cap height only on non-collapsible blocks; collapsible blocks animate their
  // own height via frame transitions and need clean overflow handling.
  '& pre:not(:has(> code[data-collapsible]))': {
    maxHeight: 'min(68vh, 1000px)',
  },

  // Collapsible blocks: hide horizontal overflow so the fade overlay can clip
  // cleanly. Re-enabled when expanded (see `expanded` variant below).
  '& pre:has(> code[data-collapsible])': {
    overflowX: 'hidden',
  },

  '& pre:has(> code > .frame[data-frame-truncated="visible"])': {
    paddingBottom: 0,
  },

  // Code element inside pre — block so frames stretch to the widest line.
  '& pre > code': {
    display: 'block',
    minWidth: 'fit-content',
  },

  // ---- Frame & line layout ----
  // The HAST emitted by `enhanceCodeEmphasis` separates `.line` spans with
  // whitespace text nodes (spaces/newlines). With `display: block` on `.line`,
  // each of those whitespace nodes also forms an anonymous line box that
  // takes up a full `line-height` of vertical space, doubling the apparent
  // line spacing. Setting `line-height: 0` on the frame collapses those
  // anonymous boxes to zero height; the explicit `line-height` on `.line`
  // restores normal spacing for the actual lines of code.
  '& pre > code > .frame': {
    display: 'block',
  },
  '& pre > code > .frame[data-lined]': {
    lineHeight: 0,
  },
  '& pre > code > .frame[data-lined] .line': {
    display: 'block',
    lineHeight: 1.5,
    whiteSpace: 'pre',
  },

  // Highlighted frames get rounded corners and a subtle background.
  '& .frame[data-frame-type="highlighted"], & .frame[data-frame-type="highlighted-unfocused"]': {
    background: alpha(theme.palette.primary.main, 0.18),
    borderRadius: 8,
    margin: '0 6px',
    padding: '0 6px',
  },

  // Line-level highlight inside a frame (nested emphasis).
  '& .line[data-hl]': {
    background: alpha(theme.palette.primary.main, 0.18),
    margin: '0 -6px',
    padding: '0 6px',
  },
  '& :not(.line)[data-hl]': {
    background: alpha(theme.palette.primary.main, 0.32),
    borderRadius: 4,
  },
  '& .line[data-hl="strong"]': {
    background: alpha(theme.palette.primary.main, 0.32),
    margin: '0 -6px',
    padding: '0 6px',
  },
  // Strong lines bordering a regular highlight need to stack above it so the
  // regular line's extended background sits underneath the rounded corners.
  '& .line[data-hl="strong"][data-hl-position="single"], & .line[data-hl="strong"][data-hl-position="end"]':
    {
      position: 'relative',
      zIndex: 1,
    },
  // Visually merge a regular highlighted line into an adjacent strong block.
  '& .line[data-hl=""]:has(+ .line[data-hl="strong"])': {
    paddingBottom: 6,
    marginBottom: -6,
  },
  '& .line[data-hl="strong"] + .line[data-hl=""]': {
    paddingTop: 6,
    marginTop: -6,
  },
  '& .line[data-hl-position="single"]': { borderRadius: 8 },
  '& .line[data-hl-position="start"]': {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  '& .line[data-hl-position="end"]': {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  // Description badges (rendered via `data-hl-description` / `data-frame-description`).
  '& .line[data-hl-description]::after': {
    content: 'attr(data-hl-description)',
    float: 'right',
    background: theme.palette.primary.main,
    borderRadius: 8,
    color: theme.palette.primary.contrastText,
    padding: '2px 4px',
    marginRight: -6,
  },
  '& .frame[data-frame-description]::before': {
    content: 'attr(data-frame-description)',
    float: 'right',
    background: theme.palette.primary.main,
    borderRadius: 8,
    color: theme.palette.primary.contrastText,
    padding: '2px 4px',
  },

  // Truncated visible frame: only round top — bottom fades out via overlay.
  '& .frame[data-frame-truncated="visible"]': {
    borderRadius: '8px 8px 0 0',
  },
  // Truncated hidden frame is the bottom of the region.
  '& .frame[data-frame-truncated="hidden"]': {
    borderRadius: '0 0 8px 8px',
  },

  // ---- Collapsible frame behavior ----
  // Scoped to collapsible demos: in non-collapsible demos every frame lacks
  // `data-frame-type`, so an unscoped rule would hide all of them.
  '& pre:has(> code[data-collapsible]) .frame:not([data-frame-type]), & pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted-unfocused"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus-unfocused"]':
    {
      maxHeight: 0,
      overflow: 'hidden',
      overflowAnchor: 'none',
      opacity: 0,
      visibility: 'hidden',
      transition:
        'max-height 0.3s cubic-bezier(0.5, 0, 0, 1), opacity 0.2s ease 0.1s, visibility 0.3s',
      '@supports (interpolate-size: allow-keywords)': {
        interpolateSize: 'allow-keywords',
        maxHeight: 'unset',
        height: 0,
        overflow: 'clip',
        transition: 'height 0.3s ease, opacity 0.3s ease, visibility 0.3s',
      },
    } as any,
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted-unfocused"]': {
    opacity: 1,
  },

  // Indent shifting for the focused/highlighted region. Uses transform to
  // avoid layout reflow during height transitions.
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus"]':
    {
      transition: 'transform 0.3s ease',
    },
  ...Object.fromEntries(
    Array.from({ length: 8 }, (_unused, idx) => {
      const level = idx + 1;
      return [
        `& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"][data-frame-indent="${level}"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus"][data-frame-indent="${level}"]`,
        { transform: `translateX(-${level * 2}ch)` },
      ];
    }),
  ),

  variants: [
    {
      props: { expanded: true },
      style: {
        // Show all frames when expanded.
        '& pre:has(> code[data-collapsible]) .frame:not([data-frame-type]), & pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted-unfocused"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus-unfocused"]':
          {
            maxHeight: 2220,
            opacity: 1,
            visibility: 'visible',
            transition:
              'max-height 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.15s ease, visibility 0s',
            '@supports (interpolate-size: allow-keywords)': {
              maxHeight: 'unset',
              height: 'auto',
              overflow: 'clip',
              transition: 'height 0.3s ease, opacity 0.3s ease, visibility 0s',
            },
          } as any,
        // Reset indent shift when expanded. Must match the per-indent base
        // rules' specificity (which include `[data-frame-indent="N"]`) or the
        // base `translateX(-Nch)` would still win.
        ...Object.fromEntries(
          Array.from({ length: 8 }, (_unused, idx) => {
            const level = idx + 1;
            return [
              `& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"][data-frame-indent="${level}"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus"][data-frame-indent="${level}"]`,
              { transform: 'translateX(0)' },
            ];
          }),
        ),
        '& pre:has(> code[data-collapsible])': {
          overflowX: 'auto',
        },
        '& pre:has(> code > .frame[data-frame-truncated="visible"])': {
          paddingBottom: 'calc(2 * var(--muidocs-spacing))',
        },
      },
    },
  ],
}));

// Fade overlay shown at the bottom of truncated/collapsible code blocks.
// Anchored to a non-scrolling wrapper so the overlay stays pinned to the
// visible viewport edge instead of scrolling away with the pre's content.
const CodeWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded?: boolean }>(() => ({
  position: 'relative',

  '&:has(pre > code > .frame[data-frame-truncated="visible"])': {
    overflowY: 'clip',
  },
  '&:has(pre > code > .frame[data-frame-truncated="visible"])::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    background: `linear-gradient(to bottom, transparent, ${alpha(CODE_BG, 0.85)})`,
    transition: 'transform 0.3s ease',
    pointerEvents: 'none',
  },

  variants: [
    {
      props: { expanded: true },
      style: {
        '&:has(pre > code > .frame[data-frame-truncated="visible"])::after': {
          transform: 'translateY(100%)',
        },
      },
    },
  ],
}));

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
  // When the rendered code has collapsible frames (from `enhanceCodeEmphasis`),
  // this expands all hidden context lines. Demos without emphasis frames render
  // identically in both states.
  const { containerRef, anchorScroll } = useScrollAnchor();

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

  const showCodeLabel = demo.expanded ? t('hideSource') : t('showSource');

  const expandedRef = React.useRef(demo.expanded);
  expandedRef.current = demo.expanded;
  const handleToggleFrames = React.useCallback(() => {
    const next = !expandedRef.current;
    anchorScroll(next ? 'expand' : 'collapse');
    demo.setExpanded(next);
  }, [anchorScroll, demo]);

  return (
    <Root ref={demo.ref}>
      {demo.slug && <AnchorLink id={demo.slug} />}

      {/* Component Preview */}
      <DemoPreview>
        <InitialFocus tabIndex={-1} />
        {demo.component}
      </DemoPreview>

      {/* Toolbar — hidden on mobile, matches DemoToolbarRoot */}
      <ToolbarRoot codeOpen={demo.expanded}>
        {/* Left side: JS/TS toggle (only visible when code is open) */}
        {demo.expanded && hasJsTransform ? (
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

          {/* Expand / collapse emphasis frames */}
          <ToolbarButton onClick={handleToggleFrames}>{showCodeLabel}</ToolbarButton>

          {/* Copy */}
          <DemoTooltip title={t('copySource')} placement="bottom">
            <IconButton onClick={demo.copy} sx={{ borderRadius: 1 }}>
              <ContentCopyRoundedIcon />
            </IconButton>
          </DemoTooltip>
        </Box>
      </ToolbarRoot>

      {/* File tabs — only when multiple files and code is visible */}
      {demo.files.length > 1 && demo.expanded ? (
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

      {/* Code */}
      <CodeWrapper ref={containerRef} expanded={demo.expanded}>
        <CodeViewer expanded={demo.expanded}>{demo.selectedFile}</CodeViewer>
      </CodeWrapper>
    </Root>
  );
}
