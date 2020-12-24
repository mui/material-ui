export interface TouchRippleUnstyledClasses {
  root: string;
  ripple: string;
  rippleVisible: string;
  ripplePulsate: string;
  child: string;
  childLeavinge: string;
  childPulsate: string;
}

declare const touchRippleClasses: TouchRippleUnstyledClasses;

export function getTouchRippleUtilityClass(part: string): string;

export default touchRippleClasses;
