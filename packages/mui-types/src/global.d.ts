export {};

declare global {
  const process: {
    env: {
      NODE_ENV?: string;
    };
  };
}
