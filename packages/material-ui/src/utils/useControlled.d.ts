export interface UseControlledProps {
  /**
   * This prop contains the component value when it's controlled.
   */
  controlled: any;
  /**
   * The default value.
   */
  default: any;
  /**
   * The component name displayed in warnings.
   */
  name: string;
}

export default function useControlled(props: UseControlledProps): [any, () => void];
