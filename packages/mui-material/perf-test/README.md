# TypeScript Performance Test

Run TypeScript performance diagnostics for `createTheme` to measure type instantiation costs.

## Prerequisites

```bash
npm install -g @typescript/analyze-trace
```

## Run Performance Test

### 1. Run Basic Diagnostics

```bash
npx tsc --noEmit --diagnostics
```

Key metrics to note:
- `Instantiations` (target: < 500,000)
- `Memory used` (target: < 300MB)
- `Check time` (lower is better)

### 2. Generate Trace

```bash
npx tsc --noEmit --generateTrace trace-output --incremental false
```

### 3. Analyze Trace

```bash
analyze-trace trace-output
```

Look for:
- Top instantiated types
- Hottest files
- Memory allocation patterns

### 4. Visual Analysis (Optional)

1. Open Chrome: `chrome://tracing`
2. Load `trace-output/trace.json`
3. Find repeated `Components<Omit<Theme, 'components'>>` instantiations

## Files

- `test-createTheme.ts` - Test file that triggers the circular dependency
- `tsconfig.json` - TypeScript configuration
- `trace-output/` - Generated trace files

## More Details

See `.claude/typescript-performance-diagnosis.md` for comprehensive guide.
