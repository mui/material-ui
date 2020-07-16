import * as React from 'react';
import GlobalCss from './GlobalCss';

export default function App() {
  return (
    <div>
      <GlobalCss />
      <div className="d-inline mr-1">div.d-inline</div>
      <div className="d-inline d-print-none">Hidden when printed</div>
    </div>
  );
}
