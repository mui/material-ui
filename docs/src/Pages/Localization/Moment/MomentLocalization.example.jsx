import React, { PureComponent } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/ru';
import MomentUtils from '@date-io/moment';
import MoreIcon from '@material-ui/icons/MoreVert';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

moment.locale('fr');

const localeMap = {
  en: 'en',
  fr: 'fr',
  ru: 'ru',
};

export default class MomentLocalizationExample extends PureComponent {
  state = {
    selectedDate: new Date(),
    anchorEl: null,
    currentLocale: 'fr',
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date.toDate() });
  };

  handleMenuOpen = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  selectLocale = selectedLocale => {
    moment.locale(selectedLocale);
    this.setState({
      currentLocale: selectedLocale,
      anchorEl: null,
    });
  };

  render() {
    const { selectedDate } = this.state;
    const locale = localeMap[this.state.currentLocale];

    return (
      <MuiPickersUtilsProvider utils={MomentUtils} locale={locale} moment={moment}>
        <div className="picker">
          <DatePicker
            value={selectedDate}
            onChange={this.handleDateChange}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="Select locale"
                  onClick={this.handleMenuOpen}
                  aria-owns={this.state.anchorEl ? 'locale-menu' : null}
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
