export interface defaultTriggerProps {
  directional?: boolean;
  threshhold?: number;
}

export type TriggerFunc = (next: number, current: number, props?: any) => boolean;

export interface Options {
  triggerFunc?: TriggerFunc;
  props?: any;
}

export default function useScrollTrigger(options?: Options): boolean;
