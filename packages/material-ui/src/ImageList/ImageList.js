import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
  },
};

const ImageList = React.forwardRef(function ImageList(props, ref) {
  const {
    cellHeight = 180,
    children,
    classes,
    className,
    cols = 2,
    component: Component = 'ul',
    spacing = 4,
    style,
    ...other
  } = props;

  return (
    <Component
      className={clsx(classes.root, className)}
      ref={ref}
      style={{ margin: -spacing / 2, ...style }}
      {...other}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "Material-UI: The ImageList component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        const childCols = child.props.cols || 1;
        const childRows = child.props.rows || 1;

        return React.cloneElement(child, {
          style: {
            width: `${(100 / cols) * childCols}%`,
            height: cellHeight === 'auto' ? 'auto' : cellHeight * childRows + spacing,
            padding: spacing / 2,
            ...child.props.style,
          },
        });
      })}
    </Component>
  );
});

ImageList.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  cellHeight: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  /**
   * Image Tiles that will be in Image List.
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.object,
    PropTypes.shape({
      /**
       * Iterator
       */
      '__@iterator': PropTypes.func.isRequired,
      /**
       * Returns an object whose properties have the value 'true'
       * when they will be absent when used in a 'with' statement.
       */
      '__@unscopables': PropTypes.func.isRequired,
      /**
       * Combines two or more arrays.
       * @param items Additional items to add to the end of array1.
       */
      concat: PropTypes.func.isRequired,
      /**
       * Returns the this object after copying a section of the array identified by start and end
       * to the same array starting at position target
       * @param target If target is negative, it is treated as length+target where length is the
       * length of the array.
       * @param start If start is negative, it is treated as length+start. If end is negative, it
       * is treated as length+end.
       * @param end If not specified, length of the this object is used as its default value.
       */
      copyWithin: PropTypes.func.isRequired,
      /**
       * Returns an iterable of key, value pairs for every entry in the array
       */
      entries: PropTypes.func.isRequired,
      /**
       * Determines whether all the members of an array satisfy the specified test.
       * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
       * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
       */
      every: PropTypes.func.isRequired,
      /**
       * Returns the this object after filling the section identified by start and end with value
       * @param value value to fill array section with
       * @param start index to start filling the array at. If start is negative, it is treated as
       * length+start where length is the length of the array.
       * @param end index to stop filling the array at. If end is negative, it is treated as
       * length+end.
       */
      fill: PropTypes.func.isRequired,
      /**
       * Returns the elements of an array that meet the condition specified in a callback function.
       * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
       * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
       */
      filter: PropTypes.func.isRequired,
      /**
       * Returns the value of the first element in the array where predicate is true, and undefined
       * otherwise.
       * @param predicate find calls predicate once for each element of the array, in ascending
       * order, until it finds one where predicate returns true. If such an element is found, find
       * immediately returns that element value. Otherwise, find returns undefined.
       * @param thisArg If provided, it will be used as the this value for each invocation of
       * predicate. If it is not provided, undefined is used instead.
       */
      find: PropTypes.func.isRequired,
      /**
       * Returns the index of the first element in the array where predicate is true, and -1
       * otherwise.
       * @param predicate find calls predicate once for each element of the array, in ascending
       * order, until it finds one where predicate returns true. If such an element is found,
       * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
       * @param thisArg If provided, it will be used as the this value for each invocation of
       * predicate. If it is not provided, undefined is used instead.
       */
      findIndex: PropTypes.func.isRequired,
      /**
       * Performs the specified action for each element in an array.
       * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
       * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
       */
      forEach: PropTypes.func.isRequired,
      /**
       * Determines whether an array includes a certain element, returning true or false as appropriate.
       * @param searchElement The element to search for.
       * @param fromIndex The position in this array at which to begin searching for searchElement.
       */
      includes: PropTypes.func.isRequired,
      /**
       * Returns the index of the first occurrence of a value in an array.
       * @param searchElement The value to locate in the array.
       * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
       */
      indexOf: PropTypes.func.isRequired,
      /**
       * Adds all the elements of an array separated by the specified separator string.
       * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
       */
      join: PropTypes.func.isRequired,
      /**
       * Returns an iterable of keys in the array
       */
      keys: PropTypes.func.isRequired,
      /**
       * Returns the index of the last occurrence of a specified value in an array.
       * @param searchElement The value to locate in the array.
       * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
       */
      lastIndexOf: PropTypes.func.isRequired,
      /**
       * Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.
       */
      length: PropTypes.number.isRequired,
      /**
       * Calls a defined callback function on each element of an array, and returns an array that contains the results.
       * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
       * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
       */
      map: PropTypes.func.isRequired,
      /**
       * Removes the last element from an array and returns it.
       */
      pop: PropTypes.func.isRequired,
      /**
       * Appends new elements to an array, and returns the new length of the array.
       * @param items New elements of the Array.
       */
      push: PropTypes.func.isRequired,
      /**
       * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
       * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
       * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
       */
      reduce: PropTypes.func.isRequired,
      /**
       * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
       * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
       * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
       */
      reduceRight: PropTypes.func.isRequired,
      /**
       * Reverses the elements in an Array.
       */
      reverse: PropTypes.func.isRequired,
      /**
       * Removes the first element from an array and returns it.
       */
      shift: PropTypes.func.isRequired,
      /**
       * Returns a section of an array.
       * @param start The beginning of the specified portion of the array.
       * @param end The end of the specified portion of the array.
       */
      slice: PropTypes.func.isRequired,
      /**
       * Determines whether the specified callback function returns true for any element of an array.
       * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
       * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
       */
      some: PropTypes.func.isRequired,
      /**
       * Sorts an array.
       * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
       */
      sort: PropTypes.func.isRequired,
      /**
       * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
       * @param start The zero-based location in the array from which to start removing elements.
       * @param deleteCount The number of elements to remove.
       */
      splice: PropTypes.func.isRequired,
      /**
       * Returns a string representation of an array. The elements are converted to string using their toLocalString methods.
       */
      toLocaleString: PropTypes.func.isRequired,
      /**
       * Returns a string representation of an array.
       */
      toString: PropTypes.func.isRequired,
      /**
       * Inserts new elements at the start of an array.
       * @param items  Elements to insert at the start of the Array.
       */
      unshift: PropTypes.func.isRequired,
      /**
       * Returns an iterable of values in the array
       */
      values: PropTypes.func.isRequired,
    }),
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Number of columns.
   */
  cols: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * @ignore
   */
  spacing: PropTypes.number,
  /**
   * @ignore
   */
  style: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiImageList' })(ImageList);
