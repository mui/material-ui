/* eslint-disable import/prefer-default-export */

import * as React from 'react';

export function cloneChildrenWithClassName(children: React.ReactNode, className: string) {
  return React.Children.map(
    children,
    child =>
      React.isValidElement(child) &&
      React.cloneElement(child as React.ReactElement<any>, {
        className: child.props.hasOwnProperty('className')
          ? `${(child.props as any).className} ${className}`
          : className,
      }),
  );
}

export function isMuiElement(element: any, muiNames: Array<string>) {
  return React.isValidElement(element) && muiNames.indexOf((element.type as any).muiName) !== -1;
}

export function isMuiComponent(element: any, muiNames: Array<string>) {
  return muiNames.indexOf(element.muiName) !== -1;
}

// const drawer =
//   children &&
//   React.Children.map(
//     children,
//     child =>
//       React.isValidElement(child) && 'onClose' in child.props
//         ? React.cloneElement(child as React.ReactElement<any>, { onClose })
//         : child,
//   )
