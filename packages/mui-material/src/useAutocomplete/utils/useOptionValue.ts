'use client';
import * as React from 'react';
import validateOptionValues, { validateOptionValue } from './validateOptionValues';

// The runtime helper handles all modes; public props enforce the narrower per-mode value types.
type OptionValue<Option, Value> = Option | Value | string;

interface UseOptionValueParameters<Option, Value> {
  options: readonly Option[];
  getOptionValue?: ((option: Option) => Value) | undefined;
  isOptionEqualToValue?:
    ((option: Option, value: OptionValue<Option, Value>) => boolean) | undefined;
  freeSolo: boolean;
  multiple: boolean;
  value: OptionValue<Option, Value> | readonly OptionValue<Option, Value>[] | null;
}

const defaultGetOptionValue = <Option>(option: Option) => option;
const defaultGetOptionFromValue = <Value>(value: Value) => value;

/**
 * Maps and matches Autocomplete values using cached option lookups and custom equality when supplied.
 * Current options take precedence over retained selections created by `filterOptions`.
 *
 * Call `rememberSelectedOption` before resetting the input or publishing an option selection.
 * Retained options survive popup closure and are discarded once no longer selected.
 * Raw values and mapped free-solo strings pass through; unresolved mapped values return `null`.
 */
export default function useOptionValue<Option, Value = never>({
  options,
  getOptionValue: getOptionValueProp,
  isOptionEqualToValue: isOptionEqualToValueProp,
  freeSolo,
  multiple,
  value,
}: UseOptionValueParameters<Option, Value>) {
  const getOptionValue = getOptionValueProp ?? defaultGetOptionValue;
  const hasOptionValueMapping = getOptionValueProp !== undefined;
  const duplicatedErrorMessages = React.useMemo(() => new Set<string>(), []);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      // Mapped values identify options and must therefore be valid, unique primitive keys.
      validateOptionValues({
        options,
        freeSolo,
        getOptionValueProp,
        duplicatedErrorMessages,
      });
    }, [options, freeSolo, getOptionValueProp, duplicatedErrorMessages]);
  }

  // Determines if an option is equal to a value, considering custom equality and free-solo scenarios.
  const isOptionEqualToValue = React.useCallback(
    (option: Option, value: OptionValue<Option, Value>) => {
      // With value mapping, strings are reserved for free-solo values and cannot identify options.
      if (getOptionValueProp !== undefined && freeSolo && typeof value === 'string') {
        return false;
      }

      // Custom equality takes precedence over comparing the option's mapped value.
      if (isOptionEqualToValueProp) {
        return isOptionEqualToValueProp(option, value);
      }

      return getOptionValue(option) === value;
    },
    [freeSolo, getOptionValue, getOptionValueProp, isOptionEqualToValueProp],
  );

  // Creates a lookup map from option values to their corresponding options for efficient resolution.
  const optionValueMap = React.useMemo(() => {
    if (getOptionValueProp === undefined || isOptionEqualToValueProp) {
      return null;
    }

    return new Map<OptionValue<Option, Value>, Option>(
      options.map((option) => [getOptionValueProp(option), option]),
    );
  }, [getOptionValueProp, isOptionEqualToValueProp, options]);

  // Resolves a value to its corresponding option, considering free-solo and custom equality scenarios.
  const resolveFromOptions = React.useMemo<
    (value: OptionValue<Option, Value>) => OptionValue<Option, Value> | null
  >(() => {
    if (!hasOptionValueMapping) {
      // Without value mapping, selected values are already options, so return them unchanged.
      return defaultGetOptionFromValue;
    }

    if (isOptionEqualToValueProp) {
      const resolvedOptions = new Map<OptionValue<Option, Value>, Option | null>();
      // Custom equality defines matching behavior, so resolve the first matching option.
      return (value) => {
        if (freeSolo && typeof value === 'string') {
          // Strings always represent free-solo values when mapping is enabled.
          return value;
        }

        // Cache misses as well as matches so unchanged selections do not rescan the options.
        if (!resolvedOptions.has(value)) {
          resolvedOptions.set(
            value,
            options.find((option) => isOptionEqualToValueProp(option, value)) ?? null,
          );
        }

        return resolvedOptions.get(value)!;
      };
    }

    // Default equality uses mapped values as keys, so resolve them through the lookup map.
    return (value) => {
      if (freeSolo && typeof value === 'string') {
        // Check before the map because a mapped string and free-solo text are indistinguishable.
        return value;
      }

      return optionValueMap!.get(value) ?? null;
    };
  }, [freeSolo, hasOptionValueMapping, isOptionEqualToValueProp, optionValueMap, options]);

  // Maintains a ref to selected options generated by filterOptions to ensure they persist across renders.
  const selectedGeneratedOptionsRef = React.useRef<Option[]>([]);
  const getOptionFromValue = React.useCallback(
    (value: OptionValue<Option, Value>) => {
      const option = resolveFromOptions(value);
      if (!hasOptionValueMapping || option !== null) {
        return option;
      }

      // A selected option created by filterOptions must survive popup closure and later searches.
      // Keep this fallback outside the options cache so cached misses cannot hide new selections.
      return (
        selectedGeneratedOptionsRef.current.find((selectedOption) =>
          isOptionEqualToValue(selectedOption, value),
        ) ?? null
      );
    },
    [resolveFromOptions, hasOptionValueMapping, isOptionEqualToValue],
  );

  const selectedValues = React.useMemo<readonly OptionValue<Option, Value>[]>(() => {
    // `multiple` distinguishes a list of selections from an option that is itself an array.
    if (multiple) {
      return value as readonly OptionValue<Option, Value>[];
    }

    if (value != null) {
      return [value as OptionValue<Option, Value>];
    }

    return [];
  }, [multiple, value]);
  // Creates a set of selected values for fast lookup when using custom equality.
  const selectedValuesSet = React.useMemo(() => {
    // Fast path for the default equality behavior to avoid O(n^2) option checks.
    if (isOptionEqualToValueProp || selectedValues.length === 0) {
      return null;
    }

    return new Set<OptionValue<Option, Value>>(
      hasOptionValueMapping && freeSolo
        ? selectedValues.filter((selectedValue) => typeof selectedValue !== 'string')
        : selectedValues,
    );
  }, [freeSolo, hasOptionValueMapping, isOptionEqualToValueProp, selectedValues]);
  const isOptionSelected = React.useCallback(
    (option: Option) => {
      if (selectedValuesSet) {
        return selectedValuesSet.has(getOptionValue(option));
      }

      return selectedValues.some(
        (value2) => value2 != null && isOptionEqualToValue(option, value2),
      );
    },
    [getOptionValue, isOptionEqualToValue, selectedValues, selectedValuesSet],
  );

  // Cleans up selected generated options that are no longer valid after each render.
  React.useEffect(() => {
    // Also discard attempted selections rejected by a controlled value after the render commits.
    if (selectedGeneratedOptionsRef.current.length > 0) {
      selectedGeneratedOptionsRef.current = hasOptionValueMapping
        ? selectedGeneratedOptionsRef.current.filter(isOptionSelected)
        : [];
    }
  });

  // Remembers a selected option that was generated by filterOptions but not present in the current options.
  const rememberSelectedOption = React.useCallback(
    (option: Option, optionValue: OptionValue<Option, Value>) => {
      if (process.env.NODE_ENV !== 'production') {
        if (hasOptionValueMapping) {
          // filterOptions can synthesize options that were not covered by options-prop validation.
          validateOptionValue(optionValue, freeSolo, duplicatedErrorMessages);
        }
      }

      if (!hasOptionValueMapping || resolveFromOptions(optionValue) !== null) {
        return;
      }

      selectedGeneratedOptionsRef.current = [
        ...selectedGeneratedOptionsRef.current.filter(
          (selectedOption) =>
            isOptionSelected(selectedOption) && !isOptionEqualToValue(selectedOption, optionValue),
        ),
        option,
      ];
    },
    [
      hasOptionValueMapping,
      resolveFromOptions,
      isOptionSelected,
      isOptionEqualToValue,
      freeSolo,
      duplicatedErrorMessages,
    ],
  );

  return {
    getOptionValue,
    isOptionEqualToValue,
    isOptionSelected,
    getOptionFromValue,
    rememberSelectedOption,
  };
}
