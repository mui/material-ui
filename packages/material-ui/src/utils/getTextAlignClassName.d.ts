import { PropTypes } from '..';

type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean;

interface ClassDictionary {
  [id: string]: any;
}
interface ClassArray extends Array<ClassValue> {}

export function getTextAlignClassName(classes: object, align: PropTypes.Alignment): ClassValue[];
