const spacingAlone = ({spacing}) => ({
  spacing: spacing(1),
});

const spacingMultiply = ({spacing}) => ({
  spacing: spacing(5),
});

const spacingDivide = ({spacing}) => ({
  spacing: spacing(0.2),
});

const spacingAdd = ({spacing}) => ({
  spacing: spacing(1) + 5,
});

const spacingSubtract = ({spacing}) => ({
  spacing: spacing(1) - 5,
});

const variable = 3;

const spacingVariable = ({spacing}) => ({
  spacing: spacing(variable),
});

const spacingParamNameChange = muiTheme => ({
  spacing: muiTheme.spacing(1),
});

function styleFunction({spacing}) {
  return {
    spacing: spacing(1),
  };
}

const longChain = ({spacing}) => ({
  spacing: spacing(5) * 5,
});
