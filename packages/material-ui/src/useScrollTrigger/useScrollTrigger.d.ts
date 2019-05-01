export interface DefaultTriggerProps {
  directional?: boolean;
  threshhold?: number;
}

export type TriggerProps = DefaultTriggerProps & any;

export type TriggerFunc = (next: number, current: number, props?: TriggerProps) => boolean;

export type UseScrollTriggerProps = {
  triggerFunc?: TriggerFunc;
} & TriggerProps;

export default function useScrollTrigger(
  props?: UseScrollTriggerProps,
): [boolean, (ref: any) => void];
