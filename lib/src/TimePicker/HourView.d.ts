import { ComponentClass } from 'react';
import { Utils } from '../utils/utils';
import { Moment } from 'moment';

export interface HourViewProps {
    date: Moment;
    onChange: (date: Moment, isFinished?: boolean) => void;
    ampm?: boolean;
    utils?: Utils;
}

declare const HourView: ComponentClass<HourViewProps>;

export default HourView;
