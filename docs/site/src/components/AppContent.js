import React, {PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('AppContent', (theme) => {
  return {
    content: theme.mixins.gutters({
      paddingTop: 80,
      flex: '1 1 100%',
      maxWidth: 900,
      margin: '0 auto',
      '@raw h1': {
        ...theme.typography.display2,
        color: theme.palette.text.secondary,
        margin: '1em 0 0.7em',
      },
      '@raw h2': {
        ...theme.typography.display1,
        color: theme.palette.text.secondary,
        margin: '1em 0 0.7em',
      },
      '@raw p, @raw ul': {
        lineHeight: '1.6',
      },
      '@raw p code, @raw ul code': {
        fontSize: 14,
      },
      '@raw table': {
        width: '100%',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        overflow: 'hidden',
      },
      '@raw thead': {
        fontSize: 12,
        fontWeight: 500,
        color: theme.palette.text.secondary,
      },
      '@raw tbody': {
        fontSize: 13,
        color: theme.palette.text.primary,
      },
      '@raw td, @raw th': {
        borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
        padding: '0 56px 0 24px',
        '&:last-child': {
          paddingRight: 24,
        },
        '& compact': {
          paddingRight: 24,
        },
        textAlign: 'left',
      },
      '@raw th': {
        whiteSpace: 'pre',
      },
      '@raw tr': {
        height: 48,
      },
      '@raw thead tr': {
        height: 64,
      },
    }),
  };
});

export default function AppContent(props, context) {
  const {className, children} = props;
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={ClassNames(classes.content, className)}>
      {children}
    </div>
  );
}

AppContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

AppContent.contextTypes = {
  styleManager: PropTypes.object.isRequired,
};
