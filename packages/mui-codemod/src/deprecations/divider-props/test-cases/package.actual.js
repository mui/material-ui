import Divider from '@org/ui/material/Divider';
import { Divider as MyDivider } from '@org/ui/material';

<Divider light className="test" />;
<MyDivider light className="test" />;
<Divider light={false} className="test" />;
<MyDivider light={false} className="test" />;
<Divider light={light} className="test" />;
<MyDivider light={light} className="test" />;
<Divider light sx={{ opacity: '0.7' }} />;
<MyDivider light sx={{ bgcolor: 'black' }} />;
<Divider className="test" />;
