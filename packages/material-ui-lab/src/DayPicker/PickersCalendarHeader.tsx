import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Fade from '@material-ui/core/Fade';
import { WithStyles, withStyles, StyleRules, MuiStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { SlideDirection } from './PickersSlideTransition';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import FadeTransitionGroup from './PickersFadeTransitionGroup';
import { DateValidationProps } from '../internal/pickers/date-utils';
// tslint:disable-next-line no-relative-import-in-test
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import PickersArrowSwitcher, {
  ExportedArrowSwitcherProps,
} from '../internal/pickers/PickersArrowSwitcher';
import {
  usePreviousMonthDisabled,
  useNextMonthDisabled,
} from '../internal/pickers/hooks/date-helpers-hooks';
import { DayPickerView } from './shared';

export type ExportedCalendarHeaderProps<TDate> = Pick<
  PickersCalendarHeaderProps<TDate>,
  | 'components'
  | 'componentsProps'
  | 'getViewSwitchingButtonText'
  | 'leftArrowButtonText'
  | 'rightArrowButtonText'
>;

export interface PickersCalendarHeaderProps<TDate>
  extends ExportedArrowSwitcherProps,
    Omit<DateValidationProps<TDate>, 'shouldDisableDate'> {
  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: ExportedArrowSwitcherProps['components'] & {
    SwitchViewButton?: React.ElementType;
    SwitchViewIcon?: React.ElementType;
  };
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps?: ExportedArrowSwitcherProps['componentsProps'] & {
    switchViewButton?: any;
  };
  currentMonth: TDate;
  views: readonly DayPickerView[];
  /**
   * Get aria-label text for switching between views button.
   */
  getViewSwitchingButtonText?: (currentView: DayPickerView) => string;
  onMonthChange: (date: TDate, slideDirection: SlideDirection) => void;
  openView: DayPickerView;
  reduceAnimations: boolean;
  onViewChange?: (view: DayPickerView) => void;
}

export type PickersCalendarHeaderClassKey =
  | 'root'
  | 'yearSelectionSwitcher'
  | 'switchView'
  | 'switchViewActive'
  | 'label'
  | 'labelItem';

export const styles: MuiStyles<PickersCalendarHeaderClassKey> = (
  theme,
): StyleRules<PickersCalendarHeaderClassKey> => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    paddingLeft: 24,
    paddingRight: 12,
    // prevent jumping in safari
    maxHeight: 30,
    minHeight: 30,
  },
  yearSelectionSwitcher: {
    marginRight: 'auto',
  },
  switchView: {
    willChange: 'transform',
    transition: theme.transitions.create('transform'),
    transform: 'rotate(0deg)',
  },
  switchViewActive: {
    transform: 'rotate(180deg)',
  },
  label: {
    display: 'flex',
    maxHeight: 30,
    overflow: 'hidden',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: 'auto',
    ...theme.typography.body1,
    fontWeight: theme.typography.fontWeightMedium,
  },
  labelItem: {
    marginRight: 6,
  },
});

function getSwitchingViewAriaText(view: DayPickerView) {
  return view === 'year'
    ? 'year view is open, switch to calendar view'
    : 'calendar view is open, switch to year view';
}

/**
 * @ignore - do not document.
 */
function PickersCalendarHeader<TDate>(
  props: PickersCalendarHeaderProps<TDate> & WithStyles<typeof styles>,
) {
  const {
    classes,
    components = {},
    componentsProps = {},
    currentMonth: month,
    disableFuture,
    disablePast,
    getViewSwitchingButtonText = getSwitchingViewAriaText,
    leftArrowButtonText = 'Previous month',
    maxDate,
    minDate,
    onMonthChange,
    onViewChange,
    openView: currentView,
    reduceAnimations,
    rightArrowButtonText = 'Next month',
    views,
  } = props;

  const utils = useUtils<TDate>();

  const SwitchViewButton = components.SwitchViewButton || IconButton;
  const switchViewButtonProps = componentsProps.switchViewButton || {};
  const SwitchViewIcon = components.SwitchViewIcon || ArrowDropDownIcon;

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(month), 'left');
  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(month), 'right');

  const isNextMonthDisabled = useNextMonthDisabled(month, { disableFuture, maxDate });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(month, { disablePast, minDate });

  const handleToggleView = () => {
    if (views.length === 1 || !onViewChange) {
      return;
    }

    if (views.length === 2) {
      onViewChange(views.find((view) => view !== currentView) || views[0]);
    } else {
      // switching only between first 2
      const nextIndexToOpen = views.indexOf(currentView) !== 0 ? 0 : 1;
      onViewChange(views[nextIndexToOpen]);
    }
  };

  // No need to display more information
  if (views.length === 1 && views[0] === 'year') {
    return null;
  }

  return (
    <div className={classes.root}>
      <div role="presentation" className={classes.label} onClick={handleToggleView}>
        <FadeTransitionGroup
          reduceAnimations={reduceAnimations}
          transKey={utils.format(month, 'month')}
        >
          <div aria-live="polite" data-mui-test="calendar-month-text" className={classes.labelItem}>
            {utils.format(month, 'month')}
          </div>
        </FadeTransitionGroup>
        <FadeTransitionGroup
          reduceAnimations={reduceAnimations}
          transKey={utils.format(month, 'year')}
        >
          <div aria-live="polite" data-mui-test="calendar-year-text" className={classes.labelItem}>
            {utils.format(month, 'year')}
          </div>
        </FadeTransitionGroup>
        {views.length > 1 && (
          <SwitchViewButton
            size="small"
            className={classes.yearSelectionSwitcher}
            aria-label={getViewSwitchingButtonText(currentView)}
            {...switchViewButtonProps}
          >
            <SwitchViewIcon
              className={clsx(classes.switchView, {
                [classes.switchViewActive]: currentView === 'year',
              })}
            />
          </SwitchViewButton>
        )}
      </div>
      <Fade in={currentView === 'day'}>
        <PickersArrowSwitcher
          leftArrowButtonText={leftArrowButtonText}
          rightArrowButtonText={rightArrowButtonText}
          components={components}
          componentsProps={componentsProps}
          onLeftClick={selectPreviousMonth}
          onRightClick={selectNextMonth}
          isLeftDisabled={isPreviousMonthDisabled}
          isRightDisabled={isNextMonthDisabled}
        />
      </Fade>
    </div>
  );
}

PickersCalendarHeader.propTypes = {
  leftArrowButtonText: PropTypes.string,
  rightArrowButtonText: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiPickersCalendarHeader' })(PickersCalendarHeader) as <
  TDate
>(
  props: PickersCalendarHeaderProps<TDate>,
) => JSX.Element;
