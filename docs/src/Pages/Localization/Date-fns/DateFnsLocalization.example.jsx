import React, { PureComponent } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import MoreIcon from '@material-ui/icons/MoreVert';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';

const localeMap = {
  en: enLocale,
  fr: frLocale,
  ru: ruLocale,
};

export default class DateFnsLocalizationExample extends PureComponent {
  state = {
    selectedDate: new Date(),
    anchorEl: null,
    currentLocale: 'fr',
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleMenuOpen = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  selectLocale = selectedLocale => {
    this.setState({
      currentLocale: selectedLocale,
      anchorEl: null,
    });
  };

  render() {
    const { selectedDate } = this.state;
    const locale = localeMap[this.state.currentLocale];

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
        <div className="picker">
          <DatePicker
            value={selectedDate}
            onChange={this.handleDateChange}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="Select locale"
                  aria-owns={this.state.anchorEl ? 'locale-menu' : null}
                  onClick={this.handleMenuOpen}
                >
                  <MoreIcon />
                </IconButton>
              ),
            }}
          />
        </div>

        <Menu
          id="locale-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleMenuClose}
        >
          {Object.keys(localeMap).map(localeItem => (
            <MenuItem
              key={localeItem}
              selected={localeItem === this.state.locale}
              onClick={() => this.selectLocale(localeItem)}
            >
              {localeItem}
            </MenuItem>
          ))}
        </Menu>
      </MuiPickersUtilsProvider>
    );
  }
}
