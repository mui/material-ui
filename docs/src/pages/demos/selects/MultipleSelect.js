import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const tags = [
  'material-ui',
  'google-material',
  'react-components',
  'react',
  'javascript',
  'material-design',
  'material',
];

class MultipleSelect extends React.Component {
  state = {
    name: [],
    tag: new Set(), // immutableJS would be better in a real app
    nameWithClose: [],
    open: false, // managed state for the third select
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleTagChange = event => {
    this.setState({ tag: new Set(event.target.value) });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-multiple">Name</InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleNameChange}
            input={<Input id="name-multiple" />}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem
                key={name}
                value={name}
                style={{
                  fontWeight:
                    this.state.name.indexOf(name) === -1
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium,
                }}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="tag-multiple">Tag</InputLabel>
          <Select
            multiple
            value={[...this.state.tag]}
            onChange={this.handleTagChange}
            input={<Input id="tag-multiple" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {tags.map(tag => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={this.state.tag.has(tag)} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-close-multiple">Name</InputLabel>
          <Select
            multiple
            open={this.state.open}
            value={this.state.nameWithClose}
            onChange={e => this.setState({ nameWithClose: e.target.value })}
            onToggle={(e, open = !this.state.open) => this.setState({ open })}
            input={<Input id="name-close-multiple" />}
            renderValue={selected => selected.filter(x => x).join(', ')}
            MenuProps={MenuProps}
          >
            {[
              <MenuItem key="_x" style={{ background: 'transparent' }}>
                <Typography type="caption">controlled</Typography>
                <IconButton
                  aria-label="Close"
                  color="inherit"
                  style={{ marginLeft: 'auto' }}
                  onClick={() => this.setState({ open: false })}
                >
                  close
                </IconButton>
              </MenuItem>,
            ].concat(
              names.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              )),
            )}
          </Select>
        </FormControl>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);
