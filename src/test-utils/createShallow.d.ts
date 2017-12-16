import {shallow, EnzymeSelector, MountRendererProps, ReactWrapper} from 'enzyme';
import {ReactElement} from "react";

export interface ShallowOptions {
  shallow: typeof shallow;
  otherContext: object;
  dive: boolean;
  untilSelector: EnzymeSelector;
}

type MuiShallow<P> = (node: ReactElement<P>, options?: MountRendererProps) => ReactWrapper<P, any>

export default function createShallow<P>(
  options?: Partial<ShallowOptions>
): MuiShallow<P>;
