import Code from './Code';
import CodeIcon from '@material-ui/icons/Code';
import CopyIcon from '@material-ui/icons/FileCopy';
import React, { useState, useCallback } from 'react';
import GithubIcon from '_shared/svgIcons/GithubIcon';
import { copy } from 'utils/helpers';
import { GITHUB_EDIT_URL } from '_constants';
import { withUtilsService } from './UtilsServiceContext';
import { withSnackbar, InjectedNotistackProps } from 'notistack';
import {
  IconButton,
  withStyles,
  Collapse,
  WithStyles,
  createStyles,
  Theme,
  Tooltip,
} from '@material-ui/core';

interface Props extends WithStyles<typeof styles>, InjectedNotistackProps {
  source: { raw: string; relativePath: string; default: React.FC<any> };
}

function Example({ classes, source, enqueueSnackbar }: Props) {
  if (!source.default || !source.raw || !source.relativePath) {
    throw new Error(
      'Missing component or raw component code, you likely forgot to .example to your example extension'
    );
  }

  const [expanded, setExpanded] = useState(false);
  const copySource = useCallback(
    () =>
      copy(source.raw).then(() =>
        enqueueSnackbar('Source copied', { variant: 'success', autoHideDuration: 1000 })
      ),
    [source]
  );

  // make each component rerender on utils change
  const Component = withUtilsService(source.default);

  return (
    <>
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

        <div className={classes.codeContainer}>{source.raw && <Code children={source.raw} />}</div>
      </Collapse>

      <div className={classes.pickers}>
        <Tooltip title="Show/Hide the source">
          <IconButton className={classes.sourceBtn} onClick={() => setExpanded(!expanded)}>
            <CodeIcon />
          </IconButton>
        </Tooltip>

        <Component />
      </div>
    </>
  );
}

const styles = (theme: Theme) =>
  createStyles({
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
  });

export default withSnackbar(withStyles(styles)(Example));
