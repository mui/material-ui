<div>
  <Badge overlap="circle" />
  <Badge overlap="rectangle" />
  <Badge
    classes={{
      anchorOriginTopRightRectangle: 'className',
      anchorOriginBottomRightRectangle: 'className',
      anchorOriginTopLeftRectangle: 'className',
      anchorOriginBottomLeftRectangle: 'className',
      anchorOriginTopRightCircle: 'className',
      anchorOriginBottomRightCircle: 'className',
      anchorOriginTopLeftCircle: 'className',
    }}
  />
  <Box
    sx={{
      '& .MuiBadge-circle, & .MuiBadge-rectangle': {},
      '& .MuiBadge-anchorOriginTopRightRectangle': {},
      '& .MuiBadge-anchorOriginBottomRightRectangle': {},
      '& .MuiBadge-anchorOriginTopLeftRectangle': {},
      '& .MuiBadge-anchorOriginBottomLeftRectangle': {},
      '& .MuiBadge-anchorOriginTopRightCircle': {},
      '& .MuiBadge-anchorOriginBottomRightCircle': {},
      '& .MuiBadge-anchorOriginTopLeftCircle': {},
      '& .MuiBadge-anchorOriginBottomLeftCircle': {},
    }}
  />
  <Badge
    classes={{
      ...badgeClasses,
      badge: badgeClasses.badge,
    }}
  >
    {icon}
  </Badge>
</div>;
