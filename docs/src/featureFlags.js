export const isConcurrent = true;

// Add the strict mode back once the number of warnings is manageable.
// We might miss important warnings by keeping the strict mode 🌊🌊🌊.
export const isStrict = isConcurrent || false;
