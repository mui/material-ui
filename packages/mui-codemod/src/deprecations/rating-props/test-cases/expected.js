import Rating from '@mui/material/Rating';
import { Rating as MyRating } from '@mui/material';

<Rating slotProps={{
  icon: {
    component: CustomIconContainer
  }
}} />;
<MyRating slotProps={{
  icon: {
    component: CustomIconContainer
  }
}} />;
<Rating
  slots={{
    root: 'div',
  }}
  slotProps={{
    icon: {
      component: CustomIconContainer
    }
  }}
/>;
<MyRating
  slots={{
    ...outerSlots,
  }}
  slotProps={{
    icon: {
      component: CustomIconContainer
    }
  }}
/>;
<Rating
  slotProps={{
    icon: {
      id: 'my-rating-icon',
      component: CustomIconContainer
    },
  }} />;

// should skip non MUI components
<NonMuiRating IconContainerComponent={CustomIconContainer} />;
