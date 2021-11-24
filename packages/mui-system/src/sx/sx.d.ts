import { CSSObject } from '@mui/styled-engine';
import { SxProps } from '../styleFunctionSx';

export default function sx<T extends object = {}>(styles: SxProps<T>): CSSObject;
