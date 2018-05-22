import * as React from "react";
import { StandardProps } from "../../../material-ui/src";
import { ButtonProps } from "../../../material-ui/src/Button";
import { TooltipProps } from "../../../material-ui/src/Tooltip";

export interface SpeedDialActionProps extends StandardProps<ButtonProps & TooltipProps, SpeedDialActionClassKey> {
    ButtonProps?: Partial<ButtonProps>;
    delay?: number;
    icon: React.ReactNode;
    tooltipTitle?: React.ReactNode;
}

export type SpeedDialActionClassKey =
    | "root"
    | "button"
    | "buttonClosed";

declare const SpeedDialAction: React.ComponentType<SpeedDialActionProps>;

export default SpeedDialAction;
