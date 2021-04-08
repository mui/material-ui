import { NativeSelectClassKey } from './NativeSelect';

declare const nativeSelectClasses: Record<NativeSelectClassKey, string>;

export function getNativeSelectUtilityClasses(slot: string): string;

export default nativeSelectClasses;
