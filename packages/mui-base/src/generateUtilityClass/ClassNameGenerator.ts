const defaultGenerator = (componentName: string) => componentName;

const createClassNameGenerator = () => {
  let generate = defaultGenerator;
  return {
    configure(generator: typeof generate) {
      generate = generator;
    },
    generate(componentName: string) {
      return generate(componentName);
    },
    reset() {
      generate = defaultGenerator;
    },
  };
};

const ClassNameGenerator = createClassNameGenerator();

export default ClassNameGenerator;
