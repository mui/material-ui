function composeClasses({ slots, classes, getUtilityClass }) {
  const output = {};

  Object.keys(slots).forEach((slot) => {
    output[slot] = slots[slot]
      .reduce((acc, key) => {
        if (key) {
          if (classes && classes[key]) {
            acc.push(classes[key]);
          }
          acc.push(getUtilityClass(key));
        }
        return acc;
      }, [])
      .join(' ');
  });

  return output;
}

export default composeClasses;
