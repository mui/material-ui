import React from "react";
import clsx from "clsx";
import MuiPaper, { PaperProps } from "@material-ui/core/Paper";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
  [backgroundStyleMapping["light"]]: {
    backgroundColor: theme.palette.secondary.light,
  },
  [backgroundStyleMapping["main"]]: {
    backgroundColor: theme.palette.secondary.main,
  },
  [backgroundStyleMapping["dark"]]: {
    backgroundColor: theme.palette.secondary.dark,
  },
  padding: {
    padding: theme.spacing(1),
  },
});

interface ExtraPaperProps {
  background: "light" | "main" | "dark";
  padding?: boolean;
}

const backgroundStyleMapping = {
  light: "backgroundLight",
  main: "backgroundMain",
  dark: "backgroundDark",
};

function Paper(
  props: PaperProps & ExtraPaperProps & WithStyles<typeof styles>
) {
  const { background, classes, className, padding = false, ...other } = props;

  return (
    <MuiPaper
      elevation={0}
      square
      className={clsx(
        classes[backgroundStyleMapping[background]],
        {
          [classes.padding]: padding,
        },
        className
      )}
      {...other}
    />
  );
}

Paper.defaultProps = {
  padding: false,
};

export default withStyles(styles)(Paper);
