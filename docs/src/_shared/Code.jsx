import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import prism from 'utils/prism';

const anchorLinkStyle = (theme, size) => ({
  '& .anchor-link-style': {
    opacity: 0,
    // To prevent the link to get the focus.
    display: 'none',
  },
  '&:hover .anchor-link-style': {
    display: 'inline-block',
    opacity: 1,
    padding: `0 ${theme.spacing.unit}px`,
    color: theme.palette.text.hint,
    '&:hover': {
      color: theme.palette.text.secondary,
    },
    '& svg': {
      width: size,
      fill: 'currentColor',
    },
  },
});

const styles = theme => ({
  root: {
    margin: 0,
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.9em',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    padding: 10,

    '& .anchor-link': {
      marginTop: -theme.spacing.unit * 12, // Offset for the anchor.
      position: 'absolute',
    },
    '& pre': {
      borderRadius: 3,
      overflow: 'auto',
      margin: 0,
      backgroundColor: theme.palette.background.paper,
    },
    '& code': {
      display: 'inline-block',
      lineHeight: 1.6,
      fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
      padding: '3px 6px',
      color: theme.palette.text.primary,
      fontSize: '0.9em',
      backgroundColor: theme.palette.background.paper,
    },
    '& p code, & ul code, & pre code': {
      fontSize: '0.9em',
      lineHeight: 1.6,
    },
    '& h1 code, & h2 code, & h3 code, & h4 code': {
      fontSize: 'inherit',
      lineHeight: 'inherit',
    },
    '& h1': {
      ...theme.typography.display2,
      color: theme.palette.text.secondary,
      margin: '0.7em 0',
      ...anchorLinkStyle(theme, 20),
    },
    '& h2': {
      ...theme.typography.display1,
      color: theme.palette.text.secondary,
      margin: '1em 0 0.7em',
      ...anchorLinkStyle(theme, 18),
    },
    '& h3': {
      ...theme.typography.headline,
      color: theme.palette.text.secondary,
      margin: '1em 0 0.7em',
      ...anchorLinkStyle(theme, 16),
    },
    '& h4': {
      ...theme.typography.title,
      color: theme.palette.text.secondary,
      margin: '1em 0 0.7em',
      ...anchorLinkStyle(theme, 14),
    },
    '& p, & ul, & ol': {
      lineHeight: 1.6,
    },
    '& table': {
      width: '100%',
      display: 'block',
      overflowX: 'auto',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      overflow: 'hidden',
    },
    '& thead': {
      fontSize: 12,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
    },
    '& tbody': {
      fontSize: 13,
      lineHeight: 1.5,
      color: theme.palette.text.primary,
    },
    '& td': {
      borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 5}px ${theme.spacing.unit}px ${theme
        .spacing.unit * 3}px`,
      textAlign: 'left',
    },
    '& td:last-child': {
      paddingRight: theme.spacing.unit * 3,
    },
    '& td compact': {
      paddingRight: theme.spacing.unit * 3,
    },
    '& td code': {
      fontSize: 13,
      lineHeight: 1.6,
    },
    '& th': {
      whiteSpace: 'pre',
      borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
      padding: `0 ${theme.spacing.unit * 5}px 0 ${theme.spacing.unit * 3}px`,
      textAlign: 'left',
    },
    '& th:last-child': {
      paddingRight: theme.spacing.unit * 3,
    },
    '& tr': {
      height: 48,
    },
    '& thead tr': {
      height: 64,
    },
    '& strong': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& blockquote': {
      borderLeft: `5px solid ${theme.palette.text.hint}`,
      background: theme.palette.background.paper,
      padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 3}px`,
      margin: `${theme.spacing.unit * 3}px 0`,
    },
    '& a, & a code': {
      // Style taken from the Link component
      color: theme.palette.secondary.A400,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  margin: {
    margin: '10px 0 30px',
  },
});

const Code = (props) => {
  const {
    classes, language, text, withMargin,
  } = props;
  const hightlightedCode = prism.highlight(text, prism.languages[language]);
  return (
    <div className={classnames(classes.root, { [classes.margin]: withMargin })}>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: hightlightedCode }} />
      </pre>
    </div>
  );
};

Code.propTypes = {
  classes: PropTypes.object.isRequired,
  language: PropTypes.string,
  text: PropTypes.string.isRequired,
  withMargin: PropTypes.bool,
};

Code.defaultProps = {
  withMargin: false,
  language: 'jsx',
};

export default withStyles(styles)(Code);
