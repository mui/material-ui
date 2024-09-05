import { capitalize } from '@mui/material/utils';

export default function convertTimelinePositionToClass(position: string): string {
  return position === 'alternate-reverse'
    ? 'positionAlternateReverse'
    : `position${capitalize(position)}`;
}
