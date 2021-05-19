import { DialogTitleClassKey } from './DialogTitle';

export type DialogTitleClasses = Record<DialogTitleClassKey, string>;

declare const dialogTitleClasses: DialogTitleClasses;

export function getDialogTitleUtilityClass(slot: string): string;

export default dialogTitleClasses;
