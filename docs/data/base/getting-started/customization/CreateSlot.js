import { createSlot } from '@mui/base/utils';
import Button from '@mui/base/Button';
import Link from 'next/link';

const LinkSlot = createSlot(Link);

export default function CreateSlot() {
  return (
    <Button href={'/'} slots={{ root: LinkSlot }}>
      Home
    </Button>
  );
}
