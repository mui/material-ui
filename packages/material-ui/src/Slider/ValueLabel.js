import * as React from 'react';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

const styles = (theme) => ({
  thumb: {
    '&$open': {
      '& $offset': {
        transform: 'scale(1) translateY(-10px)',
      },
    },
  },
  open: {},
  offset: {
    zIndex: 1,
    ...theme.typography.body2,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1.2,
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    top: -34,
    transformOrigin: 'bottom center',
    transform: 'scale(0)',
    position: 'absolute',
  },
  circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: 'currentColor',
    transform: 'rotate(-45deg)',
  },
  label: {
    color: theme.palette.primary.contrastText,
    transform: 'rotate(45deg)',
  },
});

/**
 * @ignore - internal component.
 */
function ValueLabel(props) {
  const { children, classes, className, open, value, valueLabelDisplay } = props;

  if (valueLabelDisplay === 'off') {
    return children;
  }

  return React.cloneElement(
    children,
    {
      className: clsx(
        children.props.className,
        {
          [classes.open]: open || valueLabelDisplay === 'on',
        },
        classes.thumb,
      ),
    },
    <span className={clsx(classes.offset, className)}>
      <span className={classes.circle}>
        <span className={classes.label}>{value}</span>
      </span>
    </span>,
  );
}

export default withStyles(styles, { name: 'PrivateValueLabel' })(ValueLabel);
