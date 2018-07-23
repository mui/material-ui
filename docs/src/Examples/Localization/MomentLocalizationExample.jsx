import React, { PureComponent } from 'react';
import DatePicker from 'material-ui-pickers/DatePicker';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/ru';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { Icon, IconButton, Menu, MenuItem } from '@material-ui/core';

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
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  handleMenuOpen = (event) => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  selectLocale = (selectedLocale) => {
    this.setState({
      currentLocale: selectedLocale,
      anchorEl: null,
    });
  }

  render() {
    const { selectedDate } = this.state;
    const locale = localeMap[this.state.currentLocale];
    moment.locale(locale);

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
                  aria-owns={this.state.anchorEl ? 'locale-menu' : null}
                  onClick={this.handleMenuOpen}
                >
                  <Icon> more_vert </Icon>
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
          {
            Object.keys(localeMap).map(localeItem => (
              <MenuItem
                key={localeItem}
                selected={localeItem === this.state.locale}
                onClick={() => this.selectLocale(localeItem)}
              >
                {localeItem}
              </MenuItem>
            ))
          }
        </Menu>
      </MuiPickersUtilsProvider>
    );
  }
}
