export default function escapeCell(value: string): string {
  // As the pipe is use for the table structure
  return value.replace(/</g, '&lt;').replace(/`&lt;/g, '`<').replace(/\|/g, '\\|');
}
