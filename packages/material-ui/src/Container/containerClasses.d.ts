import { ContainerClassKey } from './Container';

export type ContainerClasses = Record<ContainerClassKey, string>;

declare const containerClasses: ContainerClasses;

export function getContainerUtilityClass(slot: string): string;

export default containerClasses;
