export interface ClassDefinition {
  className: string;
  key: string;
  hash: string;
  description?: string;
  isGlobal?: boolean;
  isDeprecated?: boolean;
  deprecationInfo?: string;
}
