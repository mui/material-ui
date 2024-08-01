import * as React from 'react';

export default function getReactMajor(): number {
  return Number(React.version.split('.')[0]);
}
