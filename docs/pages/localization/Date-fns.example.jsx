// @ts-check
import React, { PureComponent, useState, useCallback } from 'react';
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
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
      <div className="picker">
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="Select locale"
                onClick={handleMenuOpen}
                aria-owns={anchorEl ? 'locale-menu' : null}
              >
                <MoreIcon />
              </IconButton>
            ),
          }}
        />
      </div>

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
    </MuiPickersUtilsProvider>
  );
}

export default DateFnsLocalizationExample;
