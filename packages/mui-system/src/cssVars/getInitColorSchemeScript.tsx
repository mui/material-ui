// TODO: remove this file in v6
import * as React from 'react';
import InitColorSchemeScript, { InitColorSchemeScriptProps } from '../InitColorSchemeScript';

export default function getInitColorSchemeScript(params?: InitColorSchemeScriptProps) {
  return <InitColorSchemeScript {...params} />;
}
