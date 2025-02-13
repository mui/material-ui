const exports = {
  AdapterDateFns: {
    default: 'AdapterDateFns',
    named: [],
  },
  AdapterDayjs: {
    default: 'AdapterDayjs',
    named: [],
  },
  AdapterLuxon: {
    default: 'AdapterLuxon',
    named: [],
  },
  AdapterMoment: {
    default: 'AdapterMoment',
    named: [],
  },
  CalendarPicker: {
    default: 'CalendarPicker',
    named: [
      'calendarPickerClasses',
      'CalendarPickerClasses',
      'CalendarPickerClassKey',
      'CalendarPickerProps',
      'CalendarPickerView',
    ],
  },
  CalendarPickerSkeleton: {
    default: 'CalendarPickerSkeleton',
    named: [
      'calendarPickerSkeletonClasses',
      'CalendarPickerSkeletonClassKey',
      'CalendarPickerSkeletonProps',
      'getCalendarPickerSkeletonUtilityClass',
    ],
  },
  ClockPicker: {
    default: 'ClockPicker',
    named: [
      'clockPickerClasses',
      'ClockPickerClasses',
      'ClockPickerClassKey',
      'ClockPickerProps',
      'ClockPickerView',
    ],
  },
  DatePicker: {
    default: 'DatePicker',
    named: ['DatePickerProps'],
  },
  DateRangePicker: {
    default: 'DateRangePicker',
    named: ['DateRange', 'DateRangePickerProps'],
    isPro: true,
  },
  DateRangePickerDay: {
    default: 'DateRangePickerDay',
    named: [
      'dateRangePickerDayClasses',
      'DateRangePickerDayClasses',
      'DateRangePickerDayClassKey',
      'DateRangePickerDayProps',
      'getDateRangePickerDayUtilityClass',
    ],
    isPro: true,
  },
  DateTimePicker: {
    default: 'DateTimePicker',
    named: ['DateTimePickerProps'],
  },
  DesktopDatePicker: {
    default: 'DesktopDatePicker',
    named: ['DesktopDatePickerProps'],
  },
  DesktopDateRangePicker: {
    default: 'DesktopDateRangePicker',
    named: ['DesktopDateRangePickerProps'],
    isPro: true,
  },
  DesktopDateTimePicker: {
    default: 'DesktopDateTimePicker',
    named: ['DesktopDateTimePickerProps'],
  },
  DesktopTimePicker: {
    default: 'DesktopTimePicker',
    named: ['DesktopTimePickerProps'],
  },
  LocalizationProvider: {
    default: 'LocalizationProvider',
    named: [
      'LocalizationProviderProps',
      'MuiPickersAdapter',
      'MuiPickersAdapterContext',
      'MuiPickersAdapterContextValue',
    ],
  },
  MobileDatePicker: {
    default: 'MobileDatePicker',
    named: ['MobileDatePickerProps'],
  },
  MobileDateRangePicker: {
    default: 'MobileDateRangePicker',
    named: ['MobileDateRangePickerProps'],
    isPro: true,
  },
  MobileDateTimePicker: {
    default: 'MobileDateTimePicker',
    named: ['MobileDateTimePickerProps'],
  },
  MobileTimePicker: {
    default: 'MobileTimePicker',
    named: ['MobileTimePickerProps'],
  },
  MonthPicker: {
    default: 'MonthPicker',
    named: [
      'monthPickerClasses',
      'getMonthPickerUtilityClass',
      'MonthPickerClassKey',
      'MonthPickerProps',
    ],
  },
  PickersDay: {
    default: 'PickersDay',
    named: [
      'pickersDayClasses',
      'getPickersDayUtilityClass',
      'PickersDayClassKey',
      'PickersDayProps',
    ],
  },
  StaticDatePicker: {
    default: 'StaticDatePicker',
    named: ['StaticDatePickerProps'],
  },
  StaticDateRangePicker: {
    default: 'StaticDateRangePicker',
    named: ['StaticDateRangePickerProps'],
    isPro: true,
  },
  StaticDateTimePicker: {
    default: 'StaticDateTimePicker',
    named: ['StaticDateTimePickerProps'],
  },
  StaticTimePicker: {
    default: 'StaticTimePicker',
    named: ['StaticTimePickerProps'],
  },
  TimePicker: {
    default: 'TimePicker',
    named: ['TimePickerProps'],
  },
  YearPicker: {
    default: 'YearPicker',
    named: [
      'yearPickerClasses',
      'getYearPickerUtilityClass',
      'YearPickerClassKey',
      'YearPickerProps',
    ],
  },
};

const buildLookup = () => {
  return Object.fromEntries(
    Object.entries(exports).flatMap(([entryPoint, entryPointData]) =>
      [entryPointData.default, ...entryPointData.named].map((exportName) => [
        exportName,
        { entryPoint, isPro: entryPointData.isPro },
      ]),
    ),
  );
};

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  const printOptions = options.printOptions || { quote: 'single' };

  const lookup = buildLookup();

  const root = j(fileInfo.source);

  root
    .find(j.ImportDeclaration)
    .forEach((path) => {
      const importSource = path.node.source.value;
      const subPackageImportMatch = importSource.match(/@mui\/lab\/(.*)/);
      if (subPackageImportMatch !== null) {
        const subModule = subPackageImportMatch[1];

        if (subModule.startsWith('internal')) {
          console.warn('Imports from `@mui/lab/internal` are not supported');
          return;
        }

        if (exports[subModule]) {
          /**
           * @type {import('jscodeshift').ASTPath}
           */
          const sourcePath = path.get('source');
          const targetPackage = exports[subModule].isPro
            ? '@mui/x-date-pickers-pro'
            : '@mui/x-date-pickers';
          const targetImportPath = `${targetPackage}/${subModule}`;
          sourcePath.replace(j.stringLiteral(targetImportPath));

          const importDeclaration = path.value;
          importDeclaration.specifiers = importDeclaration.specifiers.map((specifier) => {
            if (specifier.type === 'ImportDefaultSpecifier') {
              const localName = specifier.local.name;
              return j.importSpecifier(j.identifier(subModule), j.identifier(localName));
            }
            return specifier;
          });
        }
      } else if (importSource === '@mui/lab') {
        // Sieve import specifiers into /core and /lab
        const xImportSpecifiers = [];
        const labImportSpecifiers = [];
        let isPro = false;
        path.node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportSpecifier') {
            const lookupValue = lookup[specifier.imported.name];
            if (lookupValue) {
              xImportSpecifiers.push(specifier);
              if (lookupValue.isPro) {
                isPro = true;
              }
            } else {
              labImportSpecifiers.push(specifier);
            }
          } else {
            // `import Lab from '@material-ui/lab'`
            // `import * as Lab from '@material-ui/lab'`
            // These imports would require scope analysis.
            console.warn(`Can't handle ${specifier.type}`);
          }
        });

        if (xImportSpecifiers.length > 0) {
          const targetPackage = isPro ? '@mui/x-date-pickers-pro' : '@mui/x-date-pickers';
          path.replace(
            j.importDeclaration(xImportSpecifiers, j.stringLiteral(targetPackage)),
            j.importDeclaration(labImportSpecifiers, j.stringLiteral('@mui/lab')),
          );
        }
      }
    })
    .toSource(printOptions);

  return root.toSource(printOptions);
}
