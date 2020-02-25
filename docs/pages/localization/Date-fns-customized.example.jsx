import format from 'date-fns/format';
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import MoreIcon from '@material-ui/icons/MoreVert';
import React, { useState, useCallback } from 'react';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const localeMap = {
  en: enLocale,
  fr: frLocale,
  ru: ruLocale,
};

class RuLocalizedUtils extends DateFnsAdapter {
  getCalendarHeaderText(date) {
    return format(date, 'LLLL', { locale: this.locale });
  }

  getDatePickerHeaderText(date) {
    return format(date, 'dd MMMM', { locale: this.locale });
  }
}

class FrLocalizedUtils extends DateFnsAdapter {
  getDatePickerHeaderText(date) {
    return format(date, 'd MMM yyyy', { locale: this.locale });
  }
}

const localeUtilsMap = {
  en: DateFnsAdapter,
  fr: FrLocalizedUtils,
  ru: RuLocalizedUtils,
};

const localeFormatMap = {
  en: 'MMMM d, yyyy',
  fr: 'd MMM yyyy',
  ru: 'd MMM yyyy',
};

const localeCancelLabelMap = {
  en: 'cancel',
  fr: 'annuler',
  ru: 'отмена',
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
    <MuiPickersUtilsProvider utils={localeUtilsMap[locale]} locale={localeMap[locale]}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        inputFormat={localeFormatMap[locale]}
        cancelLabel={localeCancelLabelMap[locale]}
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
    </MuiPickersUtilsProvider>
  );
}

export default DateFnsLocalizationExample;
