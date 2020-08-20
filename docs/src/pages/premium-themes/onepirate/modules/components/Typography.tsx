import React from "react";
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import MuiTypography, { TypographyProps } from "@material-ui/core/Typography";

export enum TypographyMarkType {
  Center = "center",
  Left = "left",
  None = "none",
}

const styles = (theme: Theme) =>
  createStyles({
    [markSyleMapping[TypographyMarkType.Center]["h2"]]: {
      height: 4,
      width: 73,
      display: "block",
      margin: `${theme.spacing(1)}px auto 0`,
      backgroundColor: theme.palette.secondary.main,
    },
    [markSyleMapping[TypographyMarkType.Center]["h3"]]: {
      height: 4,
      width: 55,
      display: "block",
      margin: `${theme.spacing(1)}px auto 0`,
      backgroundColor: theme.palette.secondary.main,
    },
    [markSyleMapping[TypographyMarkType.Center]["h4"]]: {
      height: 4,
      width: 55,
      display: "block",
      margin: `${theme.spacing(1)}px auto 0`,
      backgroundColor: theme.palette.secondary.main,
    },
    [markSyleMapping[TypographyMarkType.Left]["h6"]]: {
      height: 2,
      width: 28,
      display: "block",
      marginTop: theme.spacing(0.5),
      background: "currentColor",
    },
  });

interface ExtraTypographyProps {
  marked?: TypographyMarkType;
}

const variantMapping = {
  h1: "h1",
  h2: "h1",
  h3: "h1",
  h4: "h1",
  h5: "h3",
  h6: "h2",
  subtitle1: "h3",
};

const markSyleMapping: {
  [index: string]: { [subindex: string]: string };
} = {
  [TypographyMarkType.Center]: {
    h1: "",
    h2: "markedH2Center",
    h3: "markedH3Center",
    h4: "markedH4Center",
    h5: "",
    h6: "",
  },
  [TypographyMarkType.Left]: {
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "markedH6Left",
  },
  [TypographyMarkType.None]: {
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    h6: "",
  },
};

function Typography<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }> &
    WithStyles<typeof styles> &
    ExtraTypographyProps
) {
  const { children, variant, classes, marked, ...other } = props;

  let className = "";
  if (marked && variant && variant in markSyleMapping[marked]) {
    className = classes[markSyleMapping[marked][variant]];
  }

  return (
    <MuiTypography variantMapping={variantMapping} variant={variant} {...other}>
      {children}
      {marked ? <span className={className} /> : null}
    </MuiTypography>
  );
}

Typography.defaultProps = {
  marked: TypographyMarkType.None,
};

export default withStyles(styles)(Typography);
