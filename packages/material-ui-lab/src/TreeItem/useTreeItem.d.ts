import * as React from 'react';

export default function useTreeItem(nodeId: string): {
  disabled: boolean;
  expanded: boolean;
  selected: boolean;
  focused: boolean;
  handleExpansion: (event: React.SyntheticEvent) => void;
  handleSelection: (event: React.SyntheticEvent) => void;
  preventSelection: (event: React.SyntheticEvent) => void;
};
