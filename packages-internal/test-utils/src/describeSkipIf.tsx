import { describe, SuiteAPI } from 'vitest';

const describeSkipIf = describe.skipIf;

export default describeSkipIf as (condition: any) => SuiteAPI<object>;
