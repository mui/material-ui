const spacingAlone = ({spacing}) => ({
  spacing: spacing.unit,
});

const spacingMultiply = ({spacing}) => ({
  spacing: spacing.unit * 5,
});

const spacingDivide = ({spacing}) => ({
  spacing: spacing.unit / 5,
});

const spacingAdd = ({spacing}) => ({
  spacing: spacing.unit + 5,
});

const spacingSubtract = ({spacing}) => ({
  spacing: spacing.unit - 5,
});

const variable = 3;

const spacingVariable = ({spacing}) => ({
  spacing: spacing.unit * variable,
});

const spacingParamNameChange = muiTheme => ({
  spacing: muiTheme.spacing.unit,
});

function styleFunction({spacing}) {
  return {
    spacing: spacing.unit,
  };
}

const longChain = ({spacing}) => ({
  spacing: spacing.unit * 5 * 5,
});
