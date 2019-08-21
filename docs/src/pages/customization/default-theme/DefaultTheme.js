import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import url from 'url';
import Inspector from 'react-inspector';
import { withStyles, createMuiTheme, useTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
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

function DefaultTheme(props) {
  const { classes } = props;
  const docsTheme = useTheme();
  const [checked, setChecked] = React.useState(false);
  const [expandPaths, setExpandPaths] = React.useState(null);
  const { t } = useSelector(state => ({ t: state.options.t }));

  React.useEffect(() => {
    const URL = url.parse(document.location.href, true);
    const expandPath = URL.query['expend-path'];

    if (!expandPath) {
      return;
    }

    setExpandPaths(
      expandPath.split('.').reduce((acc, path) => {
        const last = acc.length > 0 ? `${acc[acc.length - 1]}.` : '';
        acc.push(last + path);
        return acc;
      }, []),
    );
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

DefaultTheme.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DefaultTheme);
