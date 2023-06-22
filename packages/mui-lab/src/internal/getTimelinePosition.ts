import { capitalize } from '@mui/material/utils';

export default function getTimelinePosition(position: string): string {
  return position === 'alternate-reverse' ? 'AlternateReverse' : capitalize(position);
}
