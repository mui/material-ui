import { ComponentClass } from 'react';
import { Utils } from '../utils/utils';

export interface HourViewProps {
    date: object;
    onChange: (date: object, isFinished?: boolean) => void;
    ampm?: boolean;
    utils?: Utils;
}

declare const HourView: ComponentClass<HourViewProps>;

export default HourView;
