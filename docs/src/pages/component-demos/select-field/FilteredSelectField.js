// @flow weak

import React, { Component } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import SelectField from 'material-ui/SelectField';
import { LabelCheckbox } from 'material-ui/Checkbox';
import { Input } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { ListItem } from 'material-ui/List';
import { Card, CardHeader, CardContent } from 'material-ui/Card';

const US_PRESIDENTS = ["George Washington","John Adams","Thomas Jefferson","James Madison","James Monroe","John Quincy Adams","Andrew Jackson","Martin Van Buren","William Henry Harrison","John Tyler","James K. Polk","Zachary Taylor","Millard Fillmore","Franklin Pierce","James Buchanan","Abraham Lincoln","Andrew Johnson","Ulysses S. Grant","Rutherford B. Hayes","James A. Garfield","Chester A. Arthur","Grover Cleveland","Benjamin Harrison","Grover Cleveland","William McKinley","Theodore Roosevelt","William Howard Taft","Woodrow Wilson","Warren G. Harding","Calvin Coolidge","Herbert Hoover","Franklin D. Roosevelt","Harry S. Truman","Dwight D. Eisenhower","John F. Kennedy","Lyndon B. Johnson","Richard Nixon","Gerald Ford","Jimmy Carter","Ronald Reagan","George H. W. Bush","Bill Clinton","George W. Bush","Barack Obama","Donald Trump"];

const styleSheet = createStyleSheet('FilteredSelectField', (theme) => {
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
      flex: 1,
      flexDirection: 'row',
      margin: 8,
    },
  };
});

export default class FilteredSelectField extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    value: '',
    filter: '',
    choices: US_PRESIDENTS,
  };

  handleChange = (event, index, value) => this.setState({ value });

  handleFilter = (event) => {
    const { filter: oldFilter } = this.state;
    const filter = event.target.value;
    const searchChoices = filter.length > oldFilter.length ? this.state.choices : US_PRESIDENTS;
    const pattern = new RegExp(filter, 'i');
    this.setState({
      filter,
      choices: searchChoices.filter(c => pattern.test(c))
    });
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <Card>
        <CardHeader
          title="Filtered Select Field"
        />
        <CardContent>
          <div className={classes.row}>
            <SelectField
              className={classes.column}
              label="Favorite US President"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <ListItem
                tabIndex="-1"
                className={classes.filter}
              >
                <Input
                  placeholder="Filter..."
                  value={this.state.filter}
                  onChange={this.handleFilter}
                />
              </ListItem>
              {this.state.choices.map((choice, i) => (
                <MenuItem value={choice} key={i}>{choice}</MenuItem>
              ))}
            </SelectField>
          </div>
        </CardContent>
      </Card>
    );
  }
}
