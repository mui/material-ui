'use client';
import * as React from 'react';
import { Autocomplete } from '@base-ui/react/autocomplete';
import styles from './base-ui-autocomplete-enter.module.css';

const cities = ['New York', 'New Orleans', 'New Delhi', 'London', 'Paris'];

export default function BaseUIAutocompleteEnter() {
  const inputId = React.useId();
  const [value, setValue] = React.useState('');
  const [submittedValue, setSubmittedValue] = React.useState('-');
  const [submitCount, setSubmitCount] = React.useState(0);

  return (
    <form
      className={styles.Form}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setSubmittedValue((formData.get('city') as string) || '-');
        setSubmitCount((count) => count + 1);
      }}
    >
      <Autocomplete.Root
        autoHighlight
        items={cities}
        name="city"
        value={value}
        onValueChange={setValue}
      >
        <label htmlFor={inputId} className={styles.Label}>
          City
          <Autocomplete.Input
            autoFocus
            id={inputId}
            placeholder="e.g. New"
            className={styles.Input}
          />
        </label>

        <Autocomplete.Portal>
          <Autocomplete.Positioner className={styles.Positioner} sideOffset={4}>
            <Autocomplete.Popup className={styles.Popup}>
              <Autocomplete.Empty>
                <div className={styles.Empty}>No cities found.</div>
              </Autocomplete.Empty>
              <Autocomplete.List className={styles.List}>
                {(city: string) => (
                  <Autocomplete.Item key={city} className={styles.Item} value={city}>
                    {city}
                  </Autocomplete.Item>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>

      <button type="submit" className={styles.Button}>
        Submit
      </button>
      <p className={styles.Status}>Value: {value || '-'}</p>
      <p className={styles.Status}>Submitted: {submittedValue}</p>
      <p className={styles.Status}>Submits: {submitCount}</p>
    </form>
  );
}
