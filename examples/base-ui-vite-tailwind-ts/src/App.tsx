import * as React from 'react';

export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-4">
        Base UI + Vite.js + Tailwind CSS in TypeScript
      </h1>
      <ul>
        <li className="card">
          <a href="https://mui.com/base-ui/" className="link">
            Base UI
          </a>{' '}
          is a library of unstyled React UI components and hooks.
        </li>
        <li className="card">
          <a href="https://vitejs.dev/" className="link">
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
