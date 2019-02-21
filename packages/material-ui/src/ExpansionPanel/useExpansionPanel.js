import React from 'react';
import ExpansionPanelContext from './ExpansionPanelContext';

export default function useExpansionPanel() {
  return React.useContext(ExpansionPanelContext);
}
