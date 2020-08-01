export default function createDensity() {
  const interval = 4;

  return (defaultValue, densityScale) => defaultValue + densityScale * interval;
}
