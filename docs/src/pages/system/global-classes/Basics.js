import React from 'react';
import GlobalCss from './GlobalCss';

export default function App() {
  return (
    <div>
      <GlobalCss />
      <div className="d-inline mr-1">div.d-inline</div>
      <div className="d-inline d-print-none">Hidden when printed</div>
      <div className="position-relative p-4 mb-12">
        <div className="position-absolute p-4 top-4 left-0 bg-grey-700 text-common-white">
          Positioned
        </div>
        <div className="position-absolute p-4 top-10 left-5 zIndex-tooltip bg-primary-light text-common-white">
          zIndex tooltip
        </div>
      </div>
    </div>
  );
}
