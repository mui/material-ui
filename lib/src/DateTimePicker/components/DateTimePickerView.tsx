import * as React from 'react';
import * as PropTypes from 'prop-types';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';

export interface DateTimePickerViewProps extends WithStyles<typeof styles> {
  selected: boolean;
  children: React.ReactChild;
}

export const DateTimePickerView: React.SFC<DateTimePickerViewProps>= ({
  selected, children, classes,
}) => {
  if (!selected) {
    return null;
  }

  return (
    <div className={classes.view}>
      {children}
    </div>
  );
};

(DateTimePickerView as any).propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = createStyles({
  view: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
  },
})

export default withStyles(styles, { name: 'MuiPickerDTPickerView ' })(DateTimePickerView);
