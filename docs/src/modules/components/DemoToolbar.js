import * as React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useTheme, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import Fade from '@mui/material/Fade';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { JavaScript as JavaScriptIcon, TypeScript as TypeScriptIcon } from '@mui/docs';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import SvgIcon from '@mui/material/SvgIcon';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import Snackbar from '@mui/material/Snackbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ResetFocusIcon from '@mui/icons-material/CenterFocusWeak';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { CODE_VARIANTS } from 'docs/src/modules/constants';
import { useSetCodeVariant } from 'docs/src/modules/utils/codeVariant';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import { useRouter } from 'next/router';
import codeSandbox from '../sandbox/CodeSandbox';
import stackBlitz from '../sandbox/StackBlitz';

const Root = styled('div')(({ theme }) => [
  {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      top: 0,
      height: theme.spacing(8),
      ...(theme.direction === 'rtl' && {
        left: theme.spacing(1),
      }),
      ...(theme.direction !== 'rtl' && {
        right: theme.spacing(1),
      }),
    },
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      fontSize: 17,
      color: (theme.vars || theme).palette.grey[800],
    },
  },
  theme.applyDarkStyles({
    '& .MuiSvgIcon-root': {
      color: (theme.vars || theme).palette.grey[400],
    },
  }),
]);

function DemoTooltip(props) {
  return (
    <Tooltip
      componentsProps={{
        popper: {
          sx: {
            zIndex: (theme) => theme.zIndex.appBar - 1,
          },
        },
      }}
      {...props}
    />
  );
}

function ToggleCodeTooltip(props) {
  const { showSourceHint, ...other } = props;
  const atLeastSmallViewport = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [open, setOpen] = React.useState(false);

  return (
    <DemoTooltip
      {...other}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={showSourceHint && atLeastSmallViewport ? true : open}
    />
  );
}
ToggleCodeTooltip.propTypes = {
  showSourceHint: PropTypes.bool,
};

export function DemoToolbarFallback() {
  const t = useTranslate();

  return <Root aria-busy aria-label={t('demoToolbarLabel')} role="toolbar" />;
}

const alwaysTrue = () => true;

/**
 * @param {React.Ref<HTMLElement>[]} controlRefs
 * @param {object} [options]
 * @param {(index: number) => boolean} [options.isFocusableControl] In case certain controls become unfocusable
 * @param {number} [options.defaultActiveIndex]
 */
function useToolbar(controlRefs, options = {}) {
  const { defaultActiveIndex = 0, isFocusableControl = alwaysTrue } = options;
  const [activeControlIndex, setActiveControlIndex] = React.useState(defaultActiveIndex);

  // TODO: do we need to do this during layout practically? It's technically
  // a bit too late since we allow user interaction between layout and passive effects
  React.useEffect(() => {
    setActiveControlIndex((currentActiveControlIndex) => {
      if (!isFocusableControl(currentActiveControlIndex)) {
        return defaultActiveIndex;
      }
      return currentActiveControlIndex;
    });
  }, [defaultActiveIndex, isFocusableControl]);

  // controlRefs.findIndex(controlRef => controlRef.current = element)
  function findControlIndex(element) {
    let controlIndex = -1;
    controlRefs.forEach((controlRef, index) => {
      if (controlRef.current === element) {
        controlIndex = index;
      }
    });
    return controlIndex;
  }

  function handleControlFocus(event) {
    const nextActiveControlIndex = findControlIndex(event.target);
    if (nextActiveControlIndex !== -1) {
      setActiveControlIndex(nextActiveControlIndex);
    } else {
      // make sure DCE works
      // eslint-disable-next-line no-lonely-if
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'MUI: The toolbar contains a focusable element that is not controlled by the toolbar. ' +
            'Make sure you have attached `getControlProps(index)` to every focusable element within this toolbar.',
        );
      }
    }
  }

  let handleToolbarFocus;
  if (process.env.NODE_ENV !== 'production') {
    handleToolbarFocus = (event) => {
      if (findControlIndex(event.target) === -1) {
        console.error(
          'MUI: The toolbar contains a focusable element that is not controlled by the toolbar. ' +
            'Make sure you have attached `getControlProps(index)` to every focusable element within this toolbar.',
        );
      }
    };
  }

  const { direction } = useTheme();

  function handleToolbarKeyDown(event) {
    // We handle toolbars where controls can be hidden temporarily.
    // When a control is hidden we can't move focus to it and have to exclude
    // it from the order.
    let currentFocusableControlIndex = -1;
    const focusableControls = [];
    controlRefs.forEach((controlRef, index) => {
      const { current: control } = controlRef;
      if (index === activeControlIndex) {
        currentFocusableControlIndex = focusableControls.length;
      }
      if (control !== null && isFocusableControl(index)) {
        focusableControls.push(control);
      }
    });

    const prevControlKey = direction === 'ltr' ? 'ArrowLeft' : 'ArrowRight';
    const nextControlKey = direction === 'ltr' ? 'ArrowRight' : 'ArrowLeft';

    let nextFocusableIndex = -1;
    switch (event.key) {
      case prevControlKey:
        nextFocusableIndex =
          (currentFocusableControlIndex - 1 + focusableControls.length) % focusableControls.length;
        break;
      case nextControlKey:
        nextFocusableIndex = (currentFocusableControlIndex + 1) % focusableControls.length;
        break;
      case 'Home':
        nextFocusableIndex = 0;
        break;
      case 'End':
        nextFocusableIndex = focusableControls.length - 1;
        break;
      default:
        break;
    }

    if (nextFocusableIndex !== -1) {
      event.preventDefault();
      focusableControls[nextFocusableIndex].focus();
    }
  }

  function getControlProps(index) {
    return {
      onFocus: handleControlFocus,
      ref: controlRefs[index],
      tabIndex: index === activeControlIndex ? 0 : -1,
    };
  }

  return {
    getControlProps,
    toolbarProps: {
      // TODO: good opportunity to warn on missing `aria-label`
      onFocus: handleToolbarFocus,
      onKeyDown: handleToolbarKeyDown,
      role: 'toolbar',
    },
  };
}

export default function DemoToolbar(props) {
  const {
    codeOpen,
    codeVariant,
    demo,
    demoData,
    demoId,
    demoHovered,
    demoName,
    demoOptions,
    demoSourceId,
    initialFocusRef,
    onCodeOpenChange,
    onResetDemoClick,
    openDemoSource,
    showPreview,
  } = props;

  const setCodeVariant = useSetCodeVariant();
  const t = useTranslate();

  const hasTSVariant = demo.rawTS;
  const renderedCodeVariant = () => {
    if (codeVariant === CODE_VARIANTS.TS && hasTSVariant) {
      return CODE_VARIANTS.TS;
    }
    return CODE_VARIANTS.JS;
  };

  const handleCodeLanguageClick = (event, clickedCodeVariant) => {
    if (clickedCodeVariant !== null && codeVariant !== clickedCodeVariant) {
      setCodeVariant(clickedCodeVariant);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(undefined);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleCopyClick = async () => {
    try {
      await copy(demoData.raw);
      setSnackbarMessage(t('copiedSource'));
      setSnackbarOpen(true);
    } finally {
      handleMoreClose();
    }
  };

  const createHandleCodeSourceLink = (anchor) => async () => {
    try {
      await copy(`${window.location.href.split('#')[0]}#${anchor}`);
      setSnackbarMessage(t('copiedSourceLink'));
      setSnackbarOpen(true);
    } finally {
      handleMoreClose();
    }
  };

  const [sourceHintSeen, setSourceHintSeen] = React.useState(false);
  React.useEffect(() => {
    setSourceHintSeen(getCookie('sourceHintSeen'));
  }, []);
  const handleCodeOpenClick = () => {
    document.cookie = `sourceHintSeen=true;path=/;max-age=31536000`;
    onCodeOpenChange();
    setSourceHintSeen(true);
  };

  const handleResetFocusClick = () => {
    initialFocusRef.current.focusVisible();
  };

  const showSourceHint = demoHovered && !sourceHintSeen;

  let showCodeLabel;
  if (codeOpen) {
    showCodeLabel = showPreview ? t('hideFullSource') : t('hideSource');
  } else {
    showCodeLabel = showPreview ? t('showFullSource') : t('showSource');
  }

  const controlRefs = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
  ];
  // if the code is not open we hide the first two language controls
  const isFocusableControl = React.useCallback(
    (index) => (codeOpen ? true : index >= 2),
    [codeOpen],
  );
  const { getControlProps, toolbarProps } = useToolbar(controlRefs, {
    defaultActiveIndex: 2,
    isFocusableControl,
  });

  const devMenuItems = [];
  if (process.env.DEPLOY_ENV === 'staging' || process.env.DEPLOY_ENV === 'pull-request') {
    /* eslint-disable material-ui/no-hardcoded-labels -- staging only */
    // eslint-disable-next-line react-hooks/rules-of-hooks -- process.env never changes
    const router = useRouter();

    if (process.env.PULL_REQUEST_ID) {
      devMenuItems.push(
        <MenuItem
          key="link-deploy-preview"
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="link-deploy-preview"
          component="a"
          href={`https://deploy-preview-${process.env.PULL_REQUEST_ID}--${process.env.NETLIFY_SITE_NAME}.netlify.app${router.route}/#${demoName}`}
          target="_blank"
          rel="noopener nofollow"
          onClick={handleMoreClose}
        >
          demo on PR #{process.env.PULL_REQUEST_ID}
        </MenuItem>,
      );
    }

    devMenuItems.push(
      <MenuItem
        key="link-next"
        data-ga-event-category="demo"
        data-ga-event-label={demo.gaLabel}
        data-ga-event-action="link-next"
        component="a"
        href={`https://next--${process.env.NETLIFY_SITE_NAME}.netlify.app${router.route}/#${demoName}`}
        target="_blank"
        rel="noopener nofollow"
        onClick={handleMoreClose}
      >
        demo on&#160;<code>next</code>
      </MenuItem>,
      <MenuItem
        key="permalink"
        data-ga-event-category="demo"
        data-ga-event-label={demo.gaLabel}
        data-ga-event-action="permalink"
        component="a"
        href={`${process.env.NETLIFY_DEPLOY_URL}${router.route}#${demoName}`}
        target="_blank"
        rel="noopener nofollow"
        onClick={handleMoreClose}
      >
        demo permalink
      </MenuItem>,
      <MenuItem
        key="link-master"
        data-ga-event-category="demo"
        data-ga-event-label={demo.gaLabel}
        data-ga-event-action="link-master"
        component="a"
        href={`https://master--${process.env.NETLIFY_SITE_NAME}.netlify.app${router.route}/#${demoName}`}
        target="_blank"
        rel="noopener nofollow"
        onClick={handleMoreClose}
      >
        demo on&#160;<code>master</code>
      </MenuItem>,
    );
    /* eslint-enable material-ui/no-hardcoded-labels */
  }

  return (
    <React.Fragment>
      <Root aria-label={t('demoToolbarLabel')} {...toolbarProps}>
        <Fade in={codeOpen}>
          <ToggleButtonGroup
            sx={{ margin: '8px 0' }}
            exclusive
            value={renderedCodeVariant()}
            onChange={handleCodeLanguageClick}
          >
            <ToggleButton
              sx={(theme) => ({
                padding: '5px 10px',
                borderRadius: 0.5,
                borderColor: 'grey.200',
                ...theme.applyDarkStyles({
                  borderColor: 'primaryDark.700',
                }),
              })}
              value={CODE_VARIANTS.JS}
              aria-label={t('showJSSource')}
              data-ga-event-category="demo"
              data-ga-event-action="source-js"
              data-ga-event-label={demo.gaLabel}
              {...getControlProps(0)}
            >
              <JavaScriptIcon sx={{ fontSize: 20 }} />
            </ToggleButton>
            <ToggleButton
              sx={(theme) => ({
                padding: '5px 10px',
                borderRadius: 0.5,
                borderColor: 'grey.200',
                '&.Mui-disabled': {
                  opacity: 0.5,
                },
                ...theme.applyDarkStyles({
                  borderColor: 'primaryDark.700',
                }),
              })}
              value={CODE_VARIANTS.TS}
              disabled={!hasTSVariant}
              aria-label={t('showTSSource')}
              data-ga-event-category="demo"
              data-ga-event-action="source-ts"
              data-ga-event-label={demo.gaLabel}
              {...getControlProps(1)}
            >
              <TypeScriptIcon sx={{ fontSize: 20 }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Fade>
        <div>
          <ToggleCodeTooltip
            showSourceHint={showSourceHint}
            PopperProps={{ disablePortal: true }}
            title={showCodeLabel}
            placement="bottom"
          >
            <IconButton
              size="large"
              aria-controls={openDemoSource ? demoSourceId : null}
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="expand"
              onClick={handleCodeOpenClick}
              color="default"
              {...getControlProps(2)}
            >
              <CodeRoundedIcon />
            </IconButton>
          </ToggleCodeTooltip>
          {demoOptions.hideEditButton ? null : (
            <React.Fragment>
              <DemoTooltip title={t('codesandbox')} placement="bottom">
                <IconButton
                  size="large"
                  data-ga-event-category="demo"
                  data-ga-event-label={demo.gaLabel}
                  data-ga-event-action="codesandbox"
                  onClick={() => codeSandbox.createReactApp(demoData).openSandbox('/demo')}
                  {...getControlProps(3)}
                >
                  <SvgIcon viewBox="0 0 1024 1024">
                    <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                  </SvgIcon>
                </IconButton>
              </DemoTooltip>
              <DemoTooltip title={t('stackblitz')} placement="bottom">
                <IconButton
                  size="large"
                  data-ga-event-category="demo"
                  data-ga-event-label={demo.gaLabel}
                  data-ga-event-action="stackblitz"
                  onClick={() => stackBlitz.createReactApp(demoData).openSandbox('demo')}
                  {...getControlProps(4)}
                >
                  <SvgIcon viewBox="0 0 19 28">
                    <path d="M8.13378 16.1087H0L14.8696 0L10.8662 11.1522L19 11.1522L4.13043 27.2609L8.13378 16.1087Z" />
                  </SvgIcon>
                </IconButton>
              </DemoTooltip>
            </React.Fragment>
          )}
          <DemoTooltip title={t('copySource')} placement="bottom">
            <IconButton
              size="large"
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="copy"
              onClick={handleCopyClick}
              {...getControlProps(5)}
            >
              <ContentCopyRoundedIcon />
            </IconButton>
          </DemoTooltip>
          <DemoTooltip title={t('resetFocus')} placement="bottom">
            <IconButton
              size="large"
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="reset-focus"
              onClick={handleResetFocusClick}
              {...getControlProps(6)}
            >
              <ResetFocusIcon />
            </IconButton>
          </DemoTooltip>
          <DemoTooltip title={t('resetDemo')} placement="bottom">
            <IconButton
              size="large"
              aria-controls={demoId}
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="reset"
              onClick={onResetDemoClick}
              {...getControlProps(7)}
            >
              <RefreshRoundedIcon />
            </IconButton>
          </DemoTooltip>
          <IconButton
            size="large"
            onClick={handleMoreClick}
            aria-label={t('seeMore')}
            aria-owns={anchorEl ? 'demo-menu-more' : undefined}
            aria-haspopup="true"
            {...getControlProps(8)}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      </Root>
      <Menu
        id="demo-menu-more"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMoreClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="github"
          component="a"
          href={demoData.githubLocation}
          target="_blank"
          rel="noopener nofollow"
          onClick={handleMoreClose}
        >
          {t('viewGitHub')}
        </MenuItem>
        <MenuItem
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="copy-js-source-link"
          onClick={createHandleCodeSourceLink(`${demoName}.js`)}
        >
          {t('copySourceLinkJS')}
        </MenuItem>
        <MenuItem
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="copy-ts-source-link"
          onClick={createHandleCodeSourceLink(`${demoName}.tsx`)}
        >
          {t('copySourceLinkTS')}
        </MenuItem>
        {devMenuItems}
      </Menu>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </React.Fragment>
  );
}

DemoToolbar.propTypes = {
  codeOpen: PropTypes.bool.isRequired,
  codeVariant: PropTypes.string.isRequired,
  demo: PropTypes.object.isRequired,
  demoData: PropTypes.object.isRequired,
  demoHovered: PropTypes.bool.isRequired,
  demoId: PropTypes.string,
  demoName: PropTypes.string.isRequired,
  demoOptions: PropTypes.object.isRequired,
  demoSourceId: PropTypes.string,
  initialFocusRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
  onCodeOpenChange: PropTypes.func.isRequired,
  onResetDemoClick: PropTypes.func.isRequired,
  openDemoSource: PropTypes.bool.isRequired,
  showPreview: PropTypes.bool.isRequired,
};
