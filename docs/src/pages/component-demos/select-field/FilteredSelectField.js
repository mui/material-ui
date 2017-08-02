// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import SelectField from 'material-ui/SelectField';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { ListItem } from 'material-ui/List';
import Card, { CardHeader, CardContent } from 'material-ui/Card';

const US_PRESIDENTS = [
  'Abraham Lincoln',
  'Andrew Jackson',
  'Andrew Johnson',
  'Barack Obama',
  'Benjamin Harrison',
  'Bill Clinton',
  'Calvin Coolidge',
  'Chester A. Arthur',
  'Donald Trump',
  'Dwight D. Eisenhower',
  'Franklin D. Roosevelt',
  'Franklin Pierce',
  'George H. W. Bush',
  'George W. Bush',
  'George Washington',
  'Gerald Ford',
  'Grover Cleveland',
  'Harry S. Truman',
  'Herbert Hoover',
  'James A. Garfield',
  'James Buchanan',
  'James K. Polk',
  'James Madison',
  'James Monroe',
  'Jimmy Carter',
  'John Adams',
  'John F. Kennedy',
  'John Quincy Adams',
  'John Tyler',
  'Lyndon B. Johnson',
  'Martin Van Buren',
  'Millard Fillmore',
  'Richard Nixon',
  'Ronald Reagan',
  'Rutherford B. Hayes',
  'Theodore Roosevelt',
  'Thomas Jefferson',
  'Ulysses S. Grant',
  'Warren G. Harding',
  'William Henry Harrison',
  'William Howard Taft',
  'William McKinley',
  'Woodrow Wilson',
  'Zachary Taylor',
];

const styleSheet = createStyleSheet('FilteredSelectField', theme => {
  const { typography } = theme;
  return {
    filter: {
      ...typography.subheading,
      height: 48,
      boxSizing: 'border-box',
      background: 'none',
    },
    row: {
      display: 'flex',
    },
    column: {
      width: 200,
      flex: 1,
      flexDirection: 'row',
      margin: 8,
    },
  };
});

class FilteredSelectField extends Component {
  state = {
    value: '',
    filter: '',
    choices: US_PRESIDENTS,
  };

  filterInput = undefined;

  handleChange = (event, index, value) => this.setState({ value });

  handleEnter = () => {
    if (this.filterInput !== undefined) {
      this.filterInput.focus();
    }
  };

  handleFilter = event => {
    const { filter: oldFilter } = this.state;
    const filter = event.target.value;
    const searchChoices = filter.length > oldFilter.length ? this.state.choices : US_PRESIDENTS;
    const pattern = new RegExp(filter, 'i');
    this.setState({
      filter,
      choices: searchChoices.filter(c => pattern.test(c)),
    });
  };

  render() {
    const classes = this.props.classes;

    return (
      <Card>
        <CardHeader title="Filtered Select Field" />
        <CardContent>
          <div className={classes.row}>
            <SelectField
              className={classes.column}
              label="Favorite US President"
              value={this.state.value}
              onChange={this.handleChange}
              menuProps={{
                onEnter: this.handleEnter,
              }}
            >
              <ListItem tabIndex="-1" className={classes.filter}>
                <Input
                  placeholder="Filter..."
                  value={this.state.filter}
                  onChange={this.handleFilter}
                  inputRef={input => {
                    this.filterInput = input;
                  }}
                  onFocus={event => {
                    const { value } = event.target;
                    event.target.value = '';
                    event.target.value = value;
                  }}
                />
              </ListItem>
              {this.state.choices.map(choice =>
                <MenuItem value={choice} key={choice}>
                  {choice}
                </MenuItem>,
              )}
            </SelectField>
          </div>
        </CardContent>
      </Card>
    );
  }
}

FilteredSelectField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FilteredSelectField);
