import { ComponentClass } from 'react';
import { Utils } from '../typings/utils';
import { MaterialUiPickersDate } from '../typings/date'

export interface SecondsViewProps {
    date: MaterialUiPickersDate;
    onChange: (date: MaterialUiPickersDate, isFinished?: boolean) => void;
    utils?: Utils<MaterialUiPickersDate>;
}

declare const SecondsView: ComponentClass<SecondsViewProps>;

export default SecondsView;
