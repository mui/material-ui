import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

export class Year extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    value: PropTypes.any.isRequired,
  }

  static defaultProps = {
    selected: false,
    disabled: false,
  }

  handleClick = () => {
    this.props.onSelect(this.props.value);
  }

  render() {
    const {
      classes, selected, disabled, value, children, ...other
    } = this.props;

    return (
      <Typography
        role="button"
        component="div"
        className={classnames(classes.root, {
          [classes.selected]: selected,
          [classes.disabled]: disabled,
        })}
        tabIndex={disabled ? -1 : 0}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        color={selected ? 'primary' : 'default'}
        variant={selected ? 'headline' : 'subheading'}
        {...other}
      >
        {children}
      </Typography>
    );
  }
}

const styles = theme => ({
  root: {
    height: theme.spacing.unit * 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    outline: 'none',
    '&:focus': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  selected: {
    margin: '10px 0',
    fontWeight: theme.typography.fontWeightMedium,
  },
  disabled: {
    pointerEvents: 'none',
    color: theme.palette.text.hint,
  },
});

export default withStyles(styles, { name: 'MuiPickersYear' })(Year);
