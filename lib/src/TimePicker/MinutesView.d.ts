import { ComponentClass } from 'react';
import { Utils } from '../utils/utils';
import { Moment } from 'moment';

export interface MinutesViewProps {
    date: Moment;
    onChange: (date: Moment, isFinished?: boolean) => void;
    utils?: Utils;
}

declare const MinutesView: ComponentClass<MinutesViewProps>;

export default MinutesView;
