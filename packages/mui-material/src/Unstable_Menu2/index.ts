export { default } from './Menu2';
export * from './Menu2';
// The trigger and popup are rendered by Menu2 itself; only their style hooks
// are public, for `styleOverrides` and `sx`.
export {
  menu2TriggerClasses,
  getMenu2TriggerUtilityClass,
  menu2PopupClasses,
  getMenu2PopupUtilityClass,
} from './menu2Classes';
export type {
  Menu2TriggerClasses,
  Menu2TriggerClassKey,
  Menu2PopupClasses,
  Menu2PopupClassKey,
} from './menu2Classes';
