export interface DefaultTriggerProps {
  directional?: boolean;
  threshhold?: number;
}

export type TriggerProps = DefaultTriggerProps & any;

export type OnTrigger = (
  event: Event,
  value: React.MutableRefObject<any>,
  props?: TriggerProps,
) => boolean;

export type UseScrollTriggerProps = {
  onTrigger?: OnTrigger;
} & TriggerProps;

export default function useScrollTrigger(
  props?: UseScrollTriggerProps,
): [boolean, (ref: any) => void];
