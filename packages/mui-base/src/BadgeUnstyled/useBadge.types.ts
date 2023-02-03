import * as React from 'react';

export interface UseBadgeReturnValue {
    badgeContent: React.ReactNode;
    invisible: boolean;
    max: number;
    displayValue: React.ReactNode;
}
