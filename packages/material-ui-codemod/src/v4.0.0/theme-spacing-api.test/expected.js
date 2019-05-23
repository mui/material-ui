const spacingAlone = theme => ({
  spacing: theme.spacing(1),
});

const spacingMultiply = theme => ({
  spacing: theme.spacing(5),
});

const spacingDivide = theme => ({
  spacing: theme.spacing(0.2),
});

const spacingAdd = theme => ({
  spacing: theme.spacing(1) + 5,
});

const spacingSubtract = theme => ({
  spacing: theme.spacing(1) - 5,
});

const variable = 3;

const spacingVariable = theme => ({
  spacing: theme.spacing(variable),
});

const spacingParamNameChange = muiTheme => ({
  spacing: muiTheme.spacing(1),
});

function styleFunction(theme) {
  return {
    spacing: theme.spacing(1),
  };
}

const theme = {};
const shouldntTouch = theme.spacing.unit;

const styles = muiTheme => ({ root: { spacing: muiTheme.spacing(1) } });

const longChain = theme => ({
  spacing: theme.spacing(5) * 5,
});
