import * as React from 'react';

export default function useIsFocusVisible(): {
  isFocusVisibleRef: React.MutableRefObject<boolean>;
  onBlur: (event: React.FocusEvent<any>) => void;
  onFocus: (event: React.FocusEvent<any>) => void;
  ref: React.Ref<unknown>;
};
