import * as React from 'react';
import './index.css';

export default function App() {
  return (
    <div className="box">
      <h1>Base UI + Create React App scaffold (JavaScript)</h1>
      <div className="item">
        <a href="https://v6.mui.com/base-ui/getting-started/">MUI Base</a> is a library of unstyled React UI components
        and hooks.
      </div>
      <div className="item">
        <a href="https://create-react-app.dev/">Create React App</a> is a framework for quickly
        creating a new React project without the need to configure complex build tools or
        development environments.
      </div>
      <span>
        Created with 💙 by <a href="https://mui.com">MUI</a>.
      </span>
    </div>
  );
}
