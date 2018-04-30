export function focusKeyPressed(pressed: boolean): boolean;
export function detectFocusVisible(
  instance: {
    focusVisibleTimeout: any;
    focusVisibleCheckTime: number;
    focusVisibleMaxCheckTimes: number;
  },
  element: Element,
  cb: () => void,
  attempt: number,
): void;
export function listenForFocusKeys(window: Window): void;
