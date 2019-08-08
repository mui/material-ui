import React from 'react';
import { useSelector } from 'react-redux';
import url from 'url';
import Inspector from 'react-inspector';
import {
  withStyles,
  createMuiTheme,
  Theme,
  WithStyles,
  createStyles,
} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { OptionsState } from 'docs/src/modules/redux/optionsReducer';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      paddingTop: 0,
      // Match <Inspector /> default theme.
      backgroundColor: theme.palette.type === 'light' ? theme.palette.common.white : '#242424',
      minHeight: theme.spacing(40),
      width: '100%',
    },
    switch: {
      paddingBottom: theme.spacing(1),
    },
  });

interface Props extends WithStyles<typeof styles, true> {}

function DefaultTheme(props: Props) {
  const { classes, theme: docsTheme } = props;
  const [checked, setChecked] = React.useState(false);
  const [expandPaths, setExpandPaths] = React.useState<string[]>();
  const { t } = useSelector((state: OptionsState) => ({ t: state.options.t }));

  React.useEffect(() => {
    const URL = url.parse(document.location.href, true);
    const expandPath = URL.query['expend-path'];

    if (!expandPath) {
      return;
    }

    const newPaths =
      typeof expandPath === 'string'
        ? expandPath.split('.').reduce((acc: string[], path) => {
            const last = acc.length > 0 ? `${acc[acc.length - 1]}.` : '';
            acc.push(last + path);
            return acc;
          }, [])
        : expandPath;

    setExpandPaths(newPaths);
  }, []);

  const theme = createMuiTheme({
    palette: {
      type: docsTheme.palette.type,
    },
    direction: docsTheme.direction,
  });

  return (
    <div className={classes.root}>
      <FormControlLabel
        className={classes.switch}
        control={
          <Switch
            checked={checked}
            onChange={(event, value) => {
              setChecked(value);
            }}
          />
        }
        label={t('expandAll')}
      />
      <Inspector
        theme={theme.palette.type === 'light' ? 'chromeLight' : 'chromeDark'}
        data={theme}
        expandPaths={expandPaths}
        expandLevel={checked ? 100 : 1}
        key={`${checked}-${theme.palette.type}`} // Remount
      />
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(DefaultTheme);
