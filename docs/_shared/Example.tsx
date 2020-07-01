import * as React from 'react';
import clsx from 'clsx';
import Code from './Code';
import CodeIcon from '@material-ui/icons/Code';
import CopyIcon from '@material-ui/icons/FileCopy';
import GithubIcon from '_shared/svgIcons/GithubIcon';
import { copy } from 'utils/helpers';
import { useSnackbar } from 'notistack';
import { GITHUB_EDIT_URL } from '_constants';
import { replaceGetFormatStrings } from 'utils/utilsService';
import { withUtilsService, UtilsContext } from './UtilsServiceContext';
import { makeStyles, IconButton, Collapse, Tooltip } from '@material-ui/core';

interface ExampleProps {
  testId: string;
  paddingBottom?: boolean;
  source: { raw: string; relativePath: string; default: React.FC<any> };
}

const useStyles = makeStyles(theme => ({
  exampleTitle: {
    marginBottom: 8,
    '@media(max-width: 600px)': {
      marginLeft: 5,
    },
  },
  pickers: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    minHeight: 160,
    paddingTop: 40,
    width: '100%',
    margin: '0 auto 50px',
    position: 'relative',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',

      '& > div': {
        marginBottom: 32,
      },
    },
  },
  paddingBottom: {
    paddingBottom: 40,
  },
  sourceToolbar: {
    display: 'flex',
  },
  toolbarSourceBtn: {
    marginLeft: 'auto',
  },
  codeContainer: {
    position: 'relative',
  },
  sourceBtn: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
}));

function Example({ source, testId, paddingBottom }: ExampleProps) {
  if (!source.default || !source.raw || !source.relativePath) {
    throw new Error(
      'Missing component or raw component code, you likely forgot to .example to your example extension'
    );
  }

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const currentLib = React.useContext(UtilsContext).lib;
  const [expanded, setExpanded] = React.useState(false);

  const replacedSource = replaceGetFormatStrings(currentLib, source.raw);
  const copySource = React.useCallback(
    () =>
      copy(replacedSource).then(() =>
        enqueueSnackbar('Source copied', { variant: 'success', autoHideDuration: 1000 })
      ),
    [enqueueSnackbar, replacedSource]
  );

  // remount component only if utils change
  const ExampleComponent = React.useMemo(
    () => withUtilsService(source.default),
    [currentLib, source.default] // eslint-disable-line
  );

  return (
    <React.Fragment>
      <Collapse key="code" in={expanded}>
        <div className={classes.sourceToolbar}>
          <Tooltip title="Propose file change">
            <a
              target="_blank"
              rel="noopenner noreferrer"
              href={GITHUB_EDIT_URL + source.relativePath}
            >
              <IconButton>
                <GithubIcon />
              </IconButton>
            </a>
          </Tooltip>

          <Tooltip title="Copy source">
            <IconButton onClick={copySource}>
              <CopyIcon />
            </IconButton>
          </Tooltip>

          <IconButton className={classes.toolbarSourceBtn} onClick={() => setExpanded(!expanded)}>
            <CodeIcon />
          </IconButton>
        </div>

        <div className={classes.codeContainer}>
          {replacedSource && <Code children={replacedSource} />}
        </div>
      </Collapse>

      <div
        data-mui-test={testId}
        className={clsx(classes.pickers, { [classes.paddingBottom]: paddingBottom })}
      >
        <Tooltip title="Show/Hide the source">
          <IconButton className={classes.sourceBtn} onClick={() => setExpanded(!expanded)}>
            <CodeIcon />
          </IconButton>
        </Tooltip>

        <ExampleComponent key={currentLib} />
      </div>
    </React.Fragment>
  );
}

export default Example;
