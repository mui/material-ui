const defaultPropsToKey = {
  cancelText: ['cancelButtonLabel'],
  okText: ['okButtonLabel'],
  endText: ['end'],
  getClockLabelText: ['clockLabelText'],
  getHoursClockNumberText: ['hoursClockNumberText'],
  getMinutesClockNumberText: ['minutesClockNumberText'],
  getSecondsClockNumberText: ['secondsClockNumberText'],
  getViewSwitchingButtonText: ['calendarViewSwitchingButtonAriaLabel'],
  startText: ['start'],
};

const isMonthSwitchComponent = {
  DatePicker: true,
  StaticDatePicker: true,
  MobileDatePicker: true,
  DesktopDatePicker: true,
  DateRangePicker: true,
  StaticDateRangePicker: true,
  MobileDateRangePicker: true,
  DesktopDateRangePicker: true,
  CalendarPicker: true,
  // Special cases of DateTimePickers present in both
  DateTimePicker: true,
  StaticDateTimePicker: true,
  MobileDateTimePicker: true,
  DesktopDateTimePicker: true,
};

const isViewSwitchComponent = {
  TimePicker: true,
  StaticTimePicker: true,
  MobileTimePicker: true,
  DesktopTimePicker: true,
  DateTimePicker: true,
  ClockPicker: true,
  // Special cases of DateTimePickers present in both
  StaticDateTimePicker: true,
  MobileDateTimePicker: true,
  DesktopDateTimePicker: true,
};

const impactedComponents = [
  'DateRangePicker',
  'CalendarPicker',
  'ClockPicker',
  'DatePicker',
  'DateRangePicker',
  'DateRangePickerDay',
  'DateTimePicker',
  'DesktopDatePicker',
  'DesktopDateRangePicker',
  'DesktopDateTimePicker',
  'DesktopTimePicker',
  'MobileDatePicker',
  'MobileDateRangePicker',
  'MobileDateTimePicker',
  'MobileTimePicker',
  'StaticDatePicker',
  'StaticDateRangePicker',
  'StaticDateTimePicker',
  'StaticTimePicker',
  'TimePicker',
];

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;

  const printOptions = options.printOptions;

  const root = j(file.source);

  impactedComponents.forEach((componentName) => {
    const propsToKey = {
      ...defaultPropsToKey,
      leftArrowButtonText: [
        ...(isViewSwitchComponent[componentName] ? ['openPreviousView'] : []),
        ...(isMonthSwitchComponent[componentName] ? ['previousMonth'] : []),
      ],
      rightArrowButtonText: [
        ...(isViewSwitchComponent[componentName] ? ['openNextView'] : []),
        ...(isMonthSwitchComponent[componentName] ? ['nextMonth'] : []),
      ],
    };

    root.findJSXElements(componentName).forEach((path) => {
      const newLocaleText = [];
      const attributes = path.node.openingElement.attributes;
      attributes.forEach((node, index) => {
        if (node.type === 'JSXAttribute' && propsToKey[node.name.name] !== undefined) {
          const newNames = propsToKey[node.name.name];

          newNames.forEach((newName) => {
            const property = j.objectProperty(
              j.identifier(newName),
              node.value.expression ? node.value.expression : j.literal(node.value.value),
            );
            property.shorthand = node.value.expression && node.value.expression.name === newName;
            newLocaleText.push(property);
          });

          delete attributes[index];
        }
      });
      if (newLocaleText.length > 0) {
        attributes.push(
          j.jsxAttribute(
            j.jsxIdentifier('localeText'),
            j.jsxExpressionContainer(j.objectExpression(newLocaleText)),
          ),
        );
      }
    });
  });

  return root.toSource(printOptions);
}
