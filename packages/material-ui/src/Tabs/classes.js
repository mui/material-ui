import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled'

export function getUtilityClasses(slot) {
    return generateUtilityClass('MuiTabs', slot)
}

const classes = generateUtilityClasses('MuiTabs', [
    'root',
    'vertical',
    'flexContainer',
    'flexContainerVertical',
    'centered',
    'scroller',
    'fixed',
    'scrollableX',
    'scrollableY',
    'hideScrollbar',
    'scrollButtons',
    'scrollButtonsHideMobile',
    'indicator'
])

export default classes;