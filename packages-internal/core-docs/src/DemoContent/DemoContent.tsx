import * as React from 'react';
import type { ContentProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { useDemo } from '@mui/internal-docs-infra/useDemo';
import type { ExportConfig } from '@mui/internal-docs-infra/useDemo';
import { useCodeWindow } from '@mui/internal-docs-infra/useCodeWindow';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MDButton from '@mui/material/Button';
import MDToggleButton from '@mui/material/ToggleButton';
import MDToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ResetFocusIcon from '@mui/icons-material/CenterFocusWeak';
import { alpha, styled } from '@mui/material/styles';
import { blueDark } from '../branding';
import { useTranslate } from '../i18n';
import DemoContext, { type SandboxConfig } from '../DemoContext';

// Dark code-panel background used by the highlighted source viewer.
const CODE_BG = 'hsl(210, 25%, 9%)';

// ---------------------------------------------------------------------------
// Sandbox export configuration — mirrors docs/src/modules/sandbox/Dependencies
// so StackBlitz / CodeSandbox previews resolve packages the same way as the
// existing Demo.js path.
// ---------------------------------------------------------------------------

// See docs/src/modules/sandbox/Dependencies.ts
const PACKAGES_WITH_BUNDLED_TYPES = [
  'date-fns',
  '@emotion/react',
  '@emotion/styled',
  'dayjs',
  'clsx',
  '@react-spring/web',
];
const MUI_NPM_ORGS = ['@mui', '@base-ui', '@pigment-css', '@toolpad'];

function isMuiPackage(name: string): boolean {
  return MUI_NPM_ORGS.some((org) => name === org || name.startsWith(`${org}/`));
}

function getTypesPackageName(name: string): string {
  // https://github.com/DefinitelyTyped/DefinitelyTyped#what-about-scoped-packages
  const resolved = name.startsWith('@') ? name.slice(1).replace('/', '__') : name;
  return `@types/${resolved}`;
}

/**
 * Build the MUI version map, mirroring `getMuiPackageVersion` in
 * docs/src/modules/sandbox/Dependencies.ts (including pkg.pr.new pinning when
 * a commit ref is available for material-ui PR previews).
 */
function buildMuiVersions(commitRef?: string): Record<string, string> {
  const muiPackageNames = [
    'material',
    'icons-material',
    'lab',
    'styled-engine',
    'system',
    'theming',
    'classnames',
    'base',
    'utils',
    'material-nextjs',
    'joy',
  ];

  const useCommitRef =
    commitRef !== undefined &&
    process.env.SOURCE_CODE_REPO === 'https://github.com/mui/material-ui';

  const versions: Record<string, string> = {};
  for (const shortName of muiPackageNames) {
    let fullName = `@mui/${shortName}`;
    if (shortName === 'theming') {
      fullName = '@mui/private-theming';
    } else if (shortName === 'classnames') {
      fullName = '@mui/private-classnames';
    }

    if (useCommitRef) {
      versions[fullName] = `https://pkg.pr.new/mui/material-ui/@mui/${shortName}@${commitRef}`;
    } else if (shortName === 'joy' || shortName === 'base') {
      versions[fullName] = 'latest';
    } else {
      // #npm-tag-reference
      versions[fullName] = 'next';
    }
  }
  return versions;
}

interface SandboxResolvers {
  versions: Record<string, string>;
  resolveDependencies: NonNullable<ExportConfig['resolveDependencies']>;
}

/**
 * Build dependency resolvers that mirror docs/src/modules/sandbox/Dependencies.ts
 * for use with `useDemo`'s ExportConfig. The returned `resolveDependencies` is
 * called per-imported-package by exportVariant; it injects MUI peer deps and
 * `@types/*` packages the same way the existing demo system does.
 *
 * Note: @types/* are added to dependencies (rather than devDependencies) because
 * ExportConfig has no per-package devDep resolver. This is functionally
 * equivalent for StackBlitz/CodeSandbox install resolution.
 */
function buildSandboxResolvers(options: {
  csbConfig?: SandboxConfig;
  useTypescriptRef: React.RefObject<boolean>;
  commitRef?: string;
}): SandboxResolvers {
  const { csbConfig, useTypescriptRef, commitRef } = options;

  let versions: Record<string, string> = {
    react: 'latest',
    'react-dom': 'latest',
    '@emotion/react': 'latest',
    '@emotion/styled': 'latest',
    ...buildMuiVersions(commitRef),
  };

  if (csbConfig?.getVersions) {
    versions = csbConfig.getVersions(versions, { muiCommitRef: commitRef });
  }

  const resolveDependencies: NonNullable<ExportConfig['resolveDependencies']> = (packageName) => {
    const result: Record<string, string> = {};
    result[packageName] = versions[packageName] ?? 'latest';

    // Peer dep auto-injection — see `includePeerDependencies` in
    // docs/src/modules/sandbox/Dependencies.ts.
    if (
      packageName === '@mui/lab' ||
      packageName === '@mui/icons-material' ||
      packageName === '@mui/x-data-grid'
    ) {
      result['@mui/material'] = versions['@mui/material'] ?? 'latest';
    }

    // TS variant: pull in @types/* for non-bundled, non-MUI deps. Replicates
    // `addTypeDeps` from docs/src/modules/sandbox/Dependencies.ts.
    if (
      useTypescriptRef.current &&
      !PACKAGES_WITH_BUNDLED_TYPES.includes(packageName) &&
      !isMuiPackage(packageName)
    ) {
      result[getTypesPackageName(packageName)] = 'latest';
    }

    if (csbConfig?.postProcessImport) {
      const extra = csbConfig.postProcessImport(packageName);
      if (extra) {
        Object.assign(result, extra);
      }
    }

    return result;
  };

  return { versions, resolveDependencies };
}

/**
 * Build a rootIndexTemplate that mirrors `getRootIndex` from
 * docs/src/modules/sandbox/CreateReactApp.ts. Substitutes the dynamic
 * import string from exportVariant for the legacy `import Demo from './Demo'`.
 */
function buildRootIndexTemplate(
  csbConfig: SandboxConfig | undefined,
): ExportConfig['rootIndexTemplate'] | undefined {
  if (!csbConfig?.getRootIndex) {
    return undefined;
  }
  const { getRootIndex } = csbConfig;
  return ({ importString, useTypescript }) => {
    const codeVariant = useTypescript ? 'TS' : 'JS';
    const legacy = getRootIndex(codeVariant);
    // Replace the legacy `import Demo from './Demo';` line with the dynamic
    // entrypoint import emitted by exportVariant, then rename the rendered
    // `<Demo />` element to `<App />` (the exportVariant default).
    return legacy
      .replace(/^import\s+Demo\s+from\s+['"]\.\/Demo['"];?\s*$/m, importString)
      .replace(/<Demo\s*\/>/g, '<App />');
  };
}

/**
 * HTML template matching `getHtml` in docs/src/modules/sandbox/CreateReactApp.ts.
 * Injects the Inter + Roboto + Material Icons fonts the existing demo system
 * ships with, so sandboxes look identical to the legacy ones.
 */
const buildHtmlTemplate: ExportConfig['htmlTemplate'] = ({
  language,
  title,
  entrypoint,
  variant,
}) => {
  const raw = typeof variant?.source === 'string' ? variant.source : '';
  const useTwoTone = raw.includes('material-icons-two-tone');
  return `<!DOCTYPE html>
<html lang="${language}">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <!-- Fonts to support Material Design -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    />
    <!-- Icons to support Material Design -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons${useTwoTone ? '+Two+Tone' : ''}"
    />
  </head>
  <body>
    <div id="root"></div>
    ${entrypoint ? `<script type="module" src="${entrypoint}"></script>` : ''}
  </body>
</html>`;
};

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
  // Hover ring on the editable `<pre>` — mirrors the legacy DemoEditor
  // `.scrollContainer:hover` treatment.
  '& .editable-code-wrapper pre:hover': {
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary[500], 0.5)}`,
  },
  // When the editable `<pre>` is focused (after pressing Enter), use the
  // brand-blue focus ring instead of the browser default (which is white in
  // dark color schemes).
  '& .editable-code-wrapper pre:focus, & .editable-code-wrapper pre:focus-visible': {
    outline: `3px solid ${alpha(theme.palette.primary[500], 0.8)}`,
    outlineOffset: 0,
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

  // Hide the selection highlight on the inter-line gap text nodes (the
  // literal `\n` between `.line` spans). Those characters are real text
  // positions in contentEditable, so when a user drags a selection across
  // multiple lines the browser paints a `line-height: 0` highlight strip
  // for each gap — visible as a thin horizontal bar between lines. Making
  // the frame's `::selection` transparent removes the strip; the explicit
  // `.line ::selection` rule re-enables the standard system highlight
  // inside actual code lines.
  '& pre > code > .frame[data-lined]::selection, & pre > code > .frame[data-lined] *::selection': {
    background: 'transparent',
  },
  '& pre > code > .frame[data-lined] .line::selection, & pre > code > .frame[data-lined] .line *::selection':
    {
      background: 'Highlight',
      color: 'HighlightText',
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

  // ---- Editable code wrapper ----
  // Focus-trap wrapper added by `<Pre>` when `setSource` is provided. The
  // wrapper is the keyboard-only tab stop; pressing Enter focuses the inner
  // `<pre>` and engages contentEditable Tab-indents-line behavior. Escape
  // returns focus to the wrapper. The overlay is hidden via the [hidden]
  // attribute when the wrapper isn't armed; only shown after keyboard focus
  // arrives on the wrapper.
  '& .editable-code-wrapper': {
    position: 'relative',
    display: 'block',
    borderRadius: 8,
  },
  '& .editable-code-wrapper:focus-visible': {
    outline: 0,
  },
  // Overlay matches the legacy DemoEditor "Press Enter to start editing" hint.
  // `<Pre>` ships the overlay with the `[hidden]` attribute by default and
  // toggles `data-editable-prompt` on the wrapper while the prompt is shown.
  // Override `[hidden]` so the overlay stays in layout, then animate the
  // slide/fade + focus ring via `data-editable-prompt`.
  '& .editable-code-wrapper .editable-code-overlay[hidden]': {
    display: 'block',
  },
  '& .editable-code-wrapper .editable-code-overlay': {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: theme.spacing(0.2, 1, 0.5, 1),
    border: '1px solid',
    borderColor: blueDark[600],
    backgroundColor: blueDark[700],
    color: '#FFF',
    borderRadius: 6,
    fontSize: theme.typography.pxToRem(13),
    // Animate the popup slide/fade together with its focus ring. `outline`
    // (rather than `box-shadow`) is used so the ring paints purely outside
    // the popup and never stacks under the popup's own background/border.
    transition: 'top 0.3s, opacity 0.3s, visibility 0.3s, outline-color 0.3s, outline-width 0.3s',
    outlineStyle: 'solid',
    outlineColor: alpha(theme.palette.primary[500], 0),
    outlineWidth: 0,
    outlineOffset: 0,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    visibility: 'hidden',
    opacity: 0,
    pointerEvents: 'none',
    zIndex: 1,
  },
  '& .editable-code-wrapper[data-editable-prompt] .editable-code-overlay': {
    top: theme.spacing(1),
    visibility: 'visible',
    opacity: 1,
    outlineColor: alpha(theme.palette.primary[500], 0.8),
    outlineWidth: 3,
  },
  '& .editable-code-wrapper .editable-code-overlay kbd': {
    padding: theme.spacing(0.2, 0.4),
    backgroundColor: blueDark[500],
    fontSize: theme.typography.pxToRem(11),
    borderRadius: 6,
    border: '1px solid',
    borderColor: blueDark[400],
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
  const csbContext = React.useContext(DemoContext);
  const csbConfig = csbContext?.csb;

  // resolveDependencies needs to know whether we're exporting TS or JS, but
  // selectedTransform is only known after useDemo(). A ref bridges this — it's
  // read at click time (when openStackBlitz/openCodeSandbox fire), not at
  // render time, so the circular dependency is harmless.
  const useTypescriptRef = React.useRef(true);

  const exportConfig = React.useMemo<ExportConfig>(() => {
    const commitRef = process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined;
    const { versions, resolveDependencies } = buildSandboxResolvers({
      csbConfig,
      useTypescriptRef,
      commitRef,
    });
    const config: ExportConfig = {
      versions,
      resolveDependencies,
      htmlTemplate: buildHtmlTemplate,
      // Emotion is a peer dep always shipped with MUI demos (see
      // `includePeerDependencies` in docs/src/modules/sandbox/Dependencies.ts).
      // exportVariant only auto-seeds react/react-dom from `versions`, so add
      // emotion explicitly here.
      dependencies: {
        '@emotion/react': versions['@emotion/react'] ?? 'latest',
        '@emotion/styled': versions['@emotion/styled'] ?? 'latest',
      },
    };

    // fallbackDependency: ensure the product's primary package is always
    // present even when the demo doesn't import it directly. Match the version
    // produced by buildSandboxResolvers so we don't override pinning.
    if (csbConfig?.fallbackDependency) {
      const { name } = csbConfig.fallbackDependency;
      config.dependencies = {
        ...config.dependencies,
        [name]: versions[name] ?? csbConfig.fallbackDependency.version,
      };
    }

    const rootIndexTemplate = buildRootIndexTemplate(csbConfig);
    if (rootIndexTemplate) {
      config.rootIndexTemplate = rootIndexTemplate;
    }

    return config;
  }, [csbConfig]);

  const demo = useDemo(props, {
    export: exportConfig,
    // CodeSandbox uses CRA, which needs a node-style tsconfig (not Vite's
    // `moduleResolution: 'bundler'`). Mirror docs/src/modules/sandbox/
    // CreateReactApp.ts `getTsconfig`.
    exportCodeSandbox: {
      tsconfigOptions: {
        target: 'es5',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        forceConsistentCasingInFileNames: true,
        module: 'esnext',
        moduleResolution: 'node',
        jsx: 'react-jsx',
        // Drop Vite-only options merged in by exportVariant defaults.
        allowImportingTsExtensions: undefined,
        useDefineForClassFields: undefined,
        noUnusedLocals: undefined,
        noUnusedParameters: undefined,
      },
    },
  });
  useTypescriptRef.current = demo.selectedTransform !== 'js';

  const t = useTranslate();
  // When the rendered code has collapsible frames (from `enhanceCodeEmphasis`),
  // this expands all hidden context lines. Demos without emphasis frames render
  // identically in both states.
  const { containerRef, toggleRef, anchorScroll } = useCodeWindow<HTMLButtonElement>();

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

  const showCodeLabel = demo.expanded ? t('hideFullSource') : t('showFullSource');

  const expandedRef = React.useRef(demo.expanded);
  expandedRef.current = demo.expanded;
  const handleToggleFrames = React.useCallback(() => {
    const next = !expandedRef.current;
    anchorScroll(next ? 'expand' : 'collapse');
    demo.setExpanded(next);
  }, [anchorScroll, demo]);

  return (
    <Root>
      {demo.slug && <AnchorLink id={demo.slug} />}

      {/* Component Preview */}
      <DemoPreview className="demo-preview">
        <InitialFocus ref={demo.focusRef} tabIndex={-1} />
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
          <ToolbarButton ref={toggleRef} onClick={handleToggleFrames}>
            {showCodeLabel}
          </ToolbarButton>

          {/* StackBlitz */}
          <DemoTooltip title={t('stackblitz')} placement="bottom">
            <IconButton onClick={demo.openStackBlitz} sx={{ borderRadius: 1 }}>
              <SvgIcon viewBox="0 0 19 28">
                <path d="M8.13378 16.1087H0L14.8696 0L10.8662 11.1522L19 11.1522L4.13043 27.2609L8.13378 16.1087Z" />
              </SvgIcon>
            </IconButton>
          </DemoTooltip>

          {/* CodeSandbox */}
          <DemoTooltip title={t('codesandbox')} placement="bottom">
            <IconButton onClick={demo.openCodeSandbox} sx={{ borderRadius: 1 }}>
              <SvgIcon viewBox="0 0 1024 1024">
                <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
              </SvgIcon>
            </IconButton>
          </DemoTooltip>

          {/* Copy */}
          <DemoTooltip title={t('copySource')} placement="bottom">
            <IconButton onClick={demo.copy} sx={{ borderRadius: 1 }}>
              <ContentCopyRoundedIcon />
            </IconButton>
          </DemoTooltip>

          {/* Reset focus */}
          <DemoTooltip title={t('resetFocus')} placement="bottom">
            <IconButton onClick={demo.resetFocus} sx={{ borderRadius: 1 }}>
              <ResetFocusIcon />
            </IconButton>
          </DemoTooltip>

          {/* Reset demo */}
          <DemoTooltip title={t('resetDemo')} placement="bottom">
            <IconButton onClick={demo.reset} sx={{ borderRadius: 1 }}>
              <RefreshRoundedIcon />
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
