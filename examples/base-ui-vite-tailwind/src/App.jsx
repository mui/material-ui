import * as React from 'react';

export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-4">MUI Base + Vite.js + Tailwind CSS</h1>
      <ul>
        <li className="card">
          <a href="https://v6.mui.com/base-ui/getting-started/" className="link">
            MUI Base
          </a>{' '}
          is a library of unstyled React UI components and hooks.
        </li>
        <li className="card">
          <a href="https://vite.dev/" className="link">
            Vite
          </a>{' '}
          is a build tool that aims to provide a faster and leaner development experience for modern
          web projects, consisting of a dev server and a build command.
        </li>
        <li className="card">
          <a href="https://tailwindcss.com/" className="link">
            Tailwind CSS
          </a>{' '}
          is a utility-first CSS framework that provides low-level CSS classes that can be composed
          to build custom UI designs.
        </li>
      </ul>
      <span>
        Created with 💙 by{' '}
        <a href="https://mui.com" className="link">
          MUI
        </a>
        .
      </span>
    </div>
  );
}
