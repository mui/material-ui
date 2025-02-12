import Rating from '@mui/material/Rating';
import { Rating as MyRating } from '@mui/material';

<Rating
  slots={{
    iconContainer: CustomIconContainer
  }}
/>;
<MyRating
  slots={{
    iconContainer: CustomIconContainer
  }}
/>;
<Rating
  slots={{
    root: 'div',
    iconContainer: CustomIconContainer
  }} />;
<MyRating
  slots={{
    ...outerSlots,
    iconContainer: CustomIconContainer
  }} />;
<Rating
  slots={{
    root: 'div',
    iconContainer: SlotContainer,
  }} />;

// should skip non MUI components
<NonMuiRating
  IconContainerComponent={CustomIconContainer}
/>;
