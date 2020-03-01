import moment from 'moment';
import MoreIcon from '@material-ui/icons/MoreVert';
import React, { useState, useCallback } from 'react';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { DatePicker, LocalizationProvider } from '@material-ui/pickers';
import 'moment/locale/fr';
import 'moment/locale/ru';

moment.locale('fr'); // it is required to select default locale manually

const localeMap = {
  en: 'en',
  fr: 'fr',
  ru: 'ru',
};

function MomentLocalizationExample() {
  const [locale, setLocale] = useState('fr');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleMenuOpen = useCallback(e => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const selectLocale = useCallback(locale => {
    moment.locale(locale);

    setLocale(locale);
    setAnchorEl(null);
  }, []);

  return (
    <LocalizationProvider dateLibInstance={moment} dateAdapter={MomentAdapter} locale={locale}>
      <DatePicker
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="Select locale"
              onClick={handleMenuOpen}
              aria-owns={anchorEl ? 'locale-menu' : undefined}
            >
              <MoreIcon />
            </IconButton>
          ),
        }}
      />

      <Menu
        id="locale-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {Object.keys(localeMap).map(localeItem => (
          <MenuItem
            key={localeItem}
            selected={localeItem === locale}
            onClick={() => selectLocale(localeItem)}
          >
            {localeItem}
          </MenuItem>
        ))}
      </Menu>
    </LocalizationProvider>
  );
}

export default MomentLocalizationExample;
