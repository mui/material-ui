import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import MoreIcon from '@material-ui/icons/MoreVert';
import React, { useState, useCallback } from 'react';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { DatePicker, LocalizationProvider } from '@material-ui/pickers';

const localeMap = {
  en: enLocale,
  fr: frLocale,
  ru: ruLocale,
};

function DateFnsLocalizationExample() {
  const [locale, setLocale] = useState('ru');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleMenuOpen = useCallback(e => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const selectLocale = useCallback(locale => {
    setLocale(locale);
    setAnchorEl(null);
  }, []);

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={localeMap[locale]}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
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

export default DateFnsLocalizationExample;
