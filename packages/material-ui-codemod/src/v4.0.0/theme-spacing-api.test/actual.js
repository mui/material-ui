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
