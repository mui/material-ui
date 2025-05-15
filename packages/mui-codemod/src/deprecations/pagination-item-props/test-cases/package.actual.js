import PaginationItem from '@org/ui/material/PaginationItem';

<PaginationItem components={{ first: first, last: last, next: next, previous: previous }} />;
<PaginationItem
  slots={{ first: slotFirst, last: slotLast, next: slotNext, previous: slotPrevious }}
  components={{
    first: componentFirst,
    last: componentLast,
    next: componentNext,
    previous: componentPrevious,
  }}
/>;
