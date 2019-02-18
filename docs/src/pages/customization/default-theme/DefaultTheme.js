import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import url from 'url';
import Inspector from 'react-inspector';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import compose from 'docs/src/modules/utils/compose';

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

class DefaultTheme extends React.Component {
  state = {
    checked: false,
    expandPaths: null,
  };

  componentDidMount() {
    const URL = url.parse(document.location.href, true);
    const expandPath = URL.query['expend-path'];

    if (!expandPath) {
      return;
    }

    this.setState({
      expandPaths: expandPath.split('.').reduce((acc, path) => {
        const last = acc.length > 0 ? `${acc[acc.length - 1]}.` : '';
        acc.push(last + path);
        return acc;
      }, []),
    });
  }

  render() {
    const { classes, t, theme: docsTheme } = this.props;
    const { checked, expandPaths } = this.state;

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
              onChange={(event, value) => this.setState({ checked: value })}
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
}

DefaultTheme.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(state => ({ t: state.options.t })),
)(DefaultTheme);
