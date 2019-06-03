import { BorderInlineStyleProperty } from 'csstype';

export interface Border {
  (): string;
  (width: number | string): string;
  (width: number | string, style: BorderInlineStyleProperty): string;
  (width: number | string, style: BorderInlineStyleProperty, color: string): string;
}

export interface BorderOptions {
  defaultWidth: number | string;
  defaultStyle: BorderInlineStyleProperty;
  defaultColor: string;
}

export default function createBorder(
  defaultWidth: number | string,
  defaultStyle: BorderInlineStyleProperty,
  defaultColor: string,
): string;
