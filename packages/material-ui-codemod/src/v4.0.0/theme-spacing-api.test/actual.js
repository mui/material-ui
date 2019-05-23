const spacingAlone = theme => ({
  spacing: theme.spacing.unit,
});

const spacingMultiply = theme => ({
  spacing: theme.spacing.unit * 5,
});

const spacingDivide = theme => ({
  spacing: theme.spacing.unit / 5,
});

const spacingAdd = theme => ({
  spacing: theme.spacing.unit + 5,
});

const spacingSubtract = theme => ({
  spacing: theme.spacing.unit - 5,
});

const variable = 3;

const spacingVariable = theme => ({
  spacing: theme.spacing.unit * variable,
});

const spacingParamNameChange = muiTheme => ({
  spacing: muiTheme.spacing.unit,
});

function styleFunction(theme) {
  return {
    spacing: theme.spacing.unit,
  };
}

const theme = {};
const shouldntTouch = theme.spacing.unit;

const styles = muiTheme => ({ root: { spacing: muiTheme.spacing.unit } });

const longChain = theme => ({
  spacing: theme.spacing.unit * 5 * 5,
});
