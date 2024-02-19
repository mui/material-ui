'use client';
import * as React from 'react';
import { css } from '@mui/zero-runtime';
import { setTheme } from '../app/actions';

export default function ThemeToggle({ value }: { value: string }) {
  return (
    <select
      value={value}
      className={css({
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000,
      })}
      onChange={async (event) => {
        await setTheme(event.target.value);
      }}
    >
      <option value="light">light</option>
      <option value="dark">dark</option>
    </select>
  );
}
