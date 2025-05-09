import GridA from '@org/ui/material/Grid';
import GridLegacyA from '@org/ui/material/GridLegacy';
import { Grid as GridD, GridLegacy as GridLegacyB } from '@org/ui/material';

// Transforms on all the possible imports
<GridA xs={2} />;
<GridD xs={2} />;

<GridA item />;
<GridA item={true} />;
<GridA item={false} />;

<GridA zeroMinWidth />;
<GridA zeroMinWidth={true} />;
<GridA zeroMinWidth={false} />;

// Transforms responsive sizes
<GridA xs={2} sm={4} md={6} lg={8} xl={10} />;

// Transforms all the possible size values
<GridA xs sm="auto" md={2} lg={true} xl={false} />;

// Doesn't add jsx object expression for single string values
<GridA xs="auto" />;

// Transforms offset
<GridA xsOffset={2} />;

// Transforms responsive offset
<GridA xsOffset={2} smOffset={4} mdOffset={6} lgOffset={8} xlOffset={10} />;

// Transforms all the possible offset values
<GridA xsOffset={2} smOffset="auto" />;

// Transforms spread props
<GridA {...{ xs: 2, sm: 4, xsOffset: 0, smOffset: 2 }} />;

// Doesn't transform Grid v1
<GridLegacyA xs={2} />;
<GridLegacyB xs={2} />;
