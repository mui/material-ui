function getUniqueIdGenerator(prefix = 'mui') {
  let index = 0;
  return () => {
    return `${prefix}-id-${index++}`;
  };
}

export default getUniqueIdGenerator;
