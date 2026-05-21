import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MDButton from '@mui/material/Button';
import MDToggleButton from '@mui/material/ToggleButton';
import MDToggleButtonGroup, { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import LibraryAddCheckRoundedIcon from '@mui/icons-material/LibraryAddCheckRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ResetFocusIcon from '@mui/icons-material/CenterFocusWeak';
import { alpha, styled, useTheme } from '@mui/material/styles';
import copy from 'clipboard-copy';
import { useTranslate } from '../i18n';
import { OpenInMUIChatButton } from './OpenInMUIChatButton';

// ---------------------------------------------------------------------------
// Toolbar control styling
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
// Toolbar keyboard navigation
// ---------------------------------------------------------------------------

/**
 * ARIA toolbar roving keyboard navigation: a single Tab stop enters the
 * toolbar, then arrow keys (RTL aware) and Home/End move focus between
 * visible, non-disabled buttons. Tabindex is managed on the buttons directly
 * via a `MutationObserver` so the hook stays decoupled from the toolbar's
 * JSX.
 */
function isFocusableToolbarButton(button: HTMLElement): boolean {
  if (button.hasAttribute('disabled') || button.getAttribute('aria-hidden') === 'true') {
    return false;
  }
  if (typeof button.checkVisibility === 'function') {
    return button.checkVisibility({ visibilityProperty: true });
  }
  if (typeof window === 'undefined') {
    return true;
  }
  const style = window.getComputedStyle(button);
  return style.visibility !== 'hidden' && style.display !== 'none';
}

export function useToolbarKeyboard() {
  const theme = useTheme();
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  // Index into the *focusable* buttons list. Stored in a ref so the sync
  // routine can run from a MutationObserver without re-rendering.
  const activeIndexRef = React.useRef(0);

  const getFocusableButtons = React.useCallback((): HTMLElement[] => {
    const container = toolbarRef.current;
    if (!container) {
      return [];
    }
    return Array.from(container.querySelectorAll<HTMLElement>('button')).filter(
      isFocusableToolbarButton,
    );
  }, []);

  const syncTabIndex = React.useCallback(() => {
    const buttons = getFocusableButtons();
    if (buttons.length === 0) {
      return;
    }
    if (activeIndexRef.current >= buttons.length) {
      activeIndexRef.current = 0;
    }
    buttons.forEach((button, index) => {
      button.tabIndex = index === activeIndexRef.current ? 0 : -1;
    });
  }, [getFocusableButtons]);

  React.useEffect(() => {
    const container = toolbarRef.current;
    if (!container) {
      return undefined;
    }
    syncTabIndex();
    const observer = new MutationObserver(syncTabIndex);
    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled', 'aria-hidden', 'style', 'hidden'],
    });
    return () => observer.disconnect();
  }, [syncTabIndex]);

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const buttons = getFocusableButtons();
      const focusedIndex = buttons.indexOf(event.target as HTMLElement);
      if (focusedIndex !== -1 && focusedIndex !== activeIndexRef.current) {
        activeIndexRef.current = focusedIndex;
        syncTabIndex();
      }
    },
    [getFocusableButtons, syncTabIndex],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const buttons = getFocusableButtons();
      if (buttons.length === 0) {
        return;
      }
      const activeElement = document.activeElement as HTMLElement | null;
      const currentIndex = activeElement ? buttons.indexOf(activeElement) : -1;
      if (currentIndex === -1) {
        return;
      }
      const prevKey = theme.direction === 'ltr' ? 'ArrowLeft' : 'ArrowRight';
      const nextKey = theme.direction === 'ltr' ? 'ArrowRight' : 'ArrowLeft';
      let nextIndex = -1;
      switch (event.key) {
        case prevKey:
          nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
          break;
        case nextKey:
          nextIndex = (currentIndex + 1) % buttons.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = buttons.length - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      buttons[nextIndex].focus();
    },
    [theme.direction, getFocusableButtons],
  );

  return { toolbarRef, handleKeyDown, handleFocus };
}

// ---------------------------------------------------------------------------
// Toolbar component
// ---------------------------------------------------------------------------

export interface DemoToolbarProps {
  gaLabel: string;
  /** ID of the source viewer for `aria-controls`. */
  demoSourceId: string | undefined;
  /** Whether the source viewer is currently expanded. */
  expanded: boolean;
  onToggleExpand: () => void;
  /** Ref for the show-source toggle button (used by `useCodeWindow`). */
  toggleRef: React.Ref<HTMLButtonElement>;
  showCodeLabel: React.ReactNode;
  /** Whether a JS transform is available for the current variant. */
  hasJsTransform: boolean;
  isJsSelected: boolean;
  onLanguageClick: (event: React.MouseEvent, value: string | null) => void;
  /** Variant cycling (styling solutions). */
  variants: readonly string[];
  selectedVariant: string;
  onSelectVariant: (variant: string) => void;
  openMuiChat?: () => Promise<void>;
  hideEditButton?: boolean;
  onOpenStackBlitz: () => void;
  onOpenCodeSandbox: () => void;
  onCopySource: (event: React.MouseEvent<HTMLElement>) => Promise<void>;
  onResetFocus: () => void;
  onReset?: () => void;
}

/**
 * Live demo toolbar. Renders the JS/TS toggle (when the source viewer is
 * expanded), the show/hide source button, sandbox launchers, copy/reset
 * actions, and the "more" overflow menu. All handlers are passed in from
 * `DemoContent`; this component owns only the local UI state (open/snackbar/
 * copy feedback) so it can be tested in isolation.
 */
export function DemoToolbar(props: DemoToolbarProps) {
  const {
    gaLabel,
    demoSourceId,
    expanded,
    onToggleExpand,
    toggleRef,
    showCodeLabel,
    hasJsTransform,
    isJsSelected,
    onLanguageClick,
    variants,
    selectedVariant,
    onSelectVariant,
    openMuiChat,
    hideEditButton,
    onOpenStackBlitz,
    onOpenCodeSandbox,
    onCopySource,
    onResetFocus,
    onReset,
  } = props;
  const t = useTranslate();

  // "More" menu state.
  const [moreAnchorEl, setMoreAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleMoreClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchorEl(event.currentTarget);
  }, []);
  const handleMoreClose = React.useCallback(() => {
    setMoreAnchorEl(null);
  }, []);
  const moreMenuOpen = Boolean(moreAnchorEl);

  // Snackbar shown after copying a source link to the clipboard.
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string | undefined>(undefined);
  const handleSnackbarClose = React.useCallback((_event: unknown, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  }, []);

  // Copy-source button feedback — swap the icon to a checkmark briefly after
  // a successful copy.
  const [sourceCopied, setSourceCopied] = React.useState(false);
  const copyTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  React.useEffect(
    () => () => {
      if (copyTimeoutRef.current !== null) {
        clearTimeout(copyTimeoutRef.current);
      }
    },
    [],
  );
  const handleCopySource = React.useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      await onCopySource(event);
      setSourceCopied(true);
      if (copyTimeoutRef.current !== null) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => {
        setSourceCopied(false);
      }, 1000);
    },
    [onCopySource],
  );

  // Source-link copy handlers. The actual link targets are intentionally left
  // undefined for now — this wires the menu structure so the URLs can be
  // implemented in a follow-up without touching call sites.
  const createHandleCodeSourceLink = React.useCallback(
    (_target: 'js' | 'tsx') => async () => {
      // TODO: build the canonical source link for the current demo + transform.
      const link: string | undefined = undefined;
      handleMoreClose();
      if (!link) {
        return;
      }
      try {
        await copy(link);
        setSnackbarMessage(t('copiedSourceLink'));
        setSnackbarOpen(true);
      } catch {
        // Swallow — clipboard access may be denied by the user agent.
      }
    },
    [t, handleMoreClose],
  );

  // Dev/staging-only debug links surfaced in the More menu (PR previews and
  // permalinks). URLs left undefined until the deploy plumbing is reconnected.
  const showDevLinks =
    process.env.DEPLOY_ENV === 'staging' || process.env.DEPLOY_ENV === 'pull-request';

  // Placeholder for the GitHub "view source" link target. Leaving undefined
  // disables the menu item until the link source is wired up.
  const githubLocation: string | undefined = undefined;

  const hasNonSystemDemos = variants.length > 1;

  return (
    <React.Fragment>
      {/* Left-most: Open in MUI Chat */}
      <OpenInMUIChatButton
        openMuiChat={openMuiChat}
        data-ga-event-category="demo"
        data-ga-event-label={gaLabel}
        data-ga-event-action="open-in-mui-chat"
      />

      {/* Left side: JS/TS toggle (only relevant when code is open). Uses a
          CSS-only opacity transition rather than MUI's `<Fade>` because Fade
          calls `reflow(node)` (reading `node.scrollTop`) on every transition,
          forcing a synchronous layout flush that thrashes with
          `useScrollAnchor`'s `ResizeObserver` during expand/collapse. */}
      <ToggleButtonGroup
        sx={{
          margin: '8px 0',
          transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: expanded && hasJsTransform ? 1 : 0,
          visibility: expanded && hasJsTransform ? 'visible' : 'hidden',
          pointerEvents: expanded && hasJsTransform ? 'auto' : 'none',
        }}
        exclusive
        value={isJsSelected ? 'js' : 'ts'}
        onChange={onLanguageClick}
      >
        <ToggleButton
          value="js"
          aria-label={t('showJSSource')}
          data-ga-event-category="demo"
          data-ga-event-label={gaLabel}
          data-ga-event-action="source-js"
        >
          JS
        </ToggleButton>
        <ToggleButton
          value="ts"
          aria-label={t('showTSSource')}
          data-ga-event-category="demo"
          data-ga-event-label={gaLabel}
          data-ga-event-action="source-ts"
        >
          TS
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Right side: action buttons */}
      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {hasNonSystemDemos && (
          <ToolbarButton
            size="small"
            onClick={() => {
              const idx = variants.indexOf(selectedVariant);
              onSelectVariant(variants[(idx + 1) % variants.length]);
            }}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="styling"
          >
            {selectedVariant}
          </ToolbarButton>
        )}

        {hasNonSystemDemos ? (
          <Divider orientation="vertical" variant="middle" sx={{ mx: 1, height: 24 }} />
        ) : null}

        <ToolbarButton
          ref={toggleRef}
          onClick={onToggleExpand}
          aria-controls={expanded && demoSourceId ? demoSourceId : undefined}
          aria-expanded={expanded}
          data-ga-event-category="demo"
          data-ga-event-label={gaLabel}
          data-ga-event-action={expanded ? 'collapse' : 'expand'}
        >
          {showCodeLabel}
        </ToolbarButton>

        {!hideEditButton ? (
          <React.Fragment>
            <DemoTooltip title={t('stackblitz')} placement="bottom">
              <IconButton
                onClick={onOpenStackBlitz}
                sx={{ borderRadius: 1 }}
                data-ga-event-category="demo"
                data-ga-event-label={gaLabel}
                data-ga-event-action="stackblitz"
              >
                <SvgIcon viewBox="0 0 19 28">
                  <path d="M8.13378 16.1087H0L14.8696 0L10.8662 11.1522L19 11.1522L4.13043 27.2609L8.13378 16.1087Z" />
                </SvgIcon>
              </IconButton>
            </DemoTooltip>

            <DemoTooltip title={t('codesandbox')} placement="bottom">
              <IconButton
                onClick={onOpenCodeSandbox}
                sx={{ borderRadius: 1 }}
                data-ga-event-category="demo"
                data-ga-event-label={gaLabel}
                data-ga-event-action="codesandbox"
              >
                <SvgIcon viewBox="0 0 1024 1024">
                  <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                </SvgIcon>
              </IconButton>
            </DemoTooltip>
          </React.Fragment>
        ) : null}

        <DemoTooltip title={t('copySource')} placement="bottom">
          <IconButton
            onClick={handleCopySource}
            sx={{ borderRadius: 1 }}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="copy"
          >
            {sourceCopied ? <LibraryAddCheckRoundedIcon /> : <ContentCopyRoundedIcon />}
          </IconButton>
        </DemoTooltip>

        <DemoTooltip title={t('resetFocus')} placement="bottom">
          <IconButton
            onClick={onResetFocus}
            sx={{ borderRadius: 1 }}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="reset-focus"
          >
            <ResetFocusIcon />
          </IconButton>
        </DemoTooltip>

        <DemoTooltip title={t('resetDemo')} placement="bottom">
          <IconButton
            onClick={onReset}
            sx={{ borderRadius: 1 }}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="reset"
          >
            <RefreshRoundedIcon />
          </IconButton>
        </DemoTooltip>

        <IconButton
          onClick={handleMoreClick}
          aria-label={t('seeMore')}
          aria-owns={moreMenuOpen ? 'demo-menu-more' : undefined}
          aria-haspopup="true"
          sx={{ borderRadius: 1 }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="demo-menu-more"
          anchorEl={moreAnchorEl}
          open={moreMenuOpen}
          onClose={handleMoreClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem
            component="a"
            href={githubLocation}
            target="_blank"
            rel="noopener nofollow"
            onClick={handleMoreClose}
            disabled={!githubLocation}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="github"
          >
            {t('viewGitHub')}
          </MenuItem>
          <MenuItem
            onClick={createHandleCodeSourceLink('js')}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="copy-js-source-link"
          >
            {t('copySourceLinkJS')}
          </MenuItem>
          <MenuItem
            onClick={createHandleCodeSourceLink('tsx')}
            data-ga-event-category="demo"
            data-ga-event-label={gaLabel}
            data-ga-event-action="copy-ts-source-link"
          >
            {t('copySourceLinkTS')}
          </MenuItem>
          {showDevLinks
            ? [
                <MenuItem
                  key="pr-preview"
                  component="a"
                  href={undefined}
                  target="_blank"
                  rel="noopener nofollow"
                  onClick={handleMoreClose}
                  disabled
                >
                  demo on PR
                </MenuItem>,
                <MenuItem
                  key="next"
                  component="a"
                  href={undefined}
                  target="_blank"
                  rel="noopener nofollow"
                  onClick={handleMoreClose}
                  disabled
                >
                  demo on next
                </MenuItem>,
                <MenuItem
                  key="permalink"
                  component="a"
                  href={undefined}
                  target="_blank"
                  rel="noopener nofollow"
                  onClick={handleMoreClose}
                  disabled
                >
                  demo permalink
                </MenuItem>,
                <MenuItem
                  key="master"
                  component="a"
                  href={undefined}
                  target="_blank"
                  rel="noopener nofollow"
                  onClick={handleMoreClose}
                  disabled
                >
                  demo on master
                </MenuItem>,
              ]
            : null}
        </Menu>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </React.Fragment>
  );
}
