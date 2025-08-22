export {};

declare global {
  const process: {
    env: {
      NODE_ENV?: string;
      MUI_VERSION?: string;
      MUI_MAJOR_VERSION?: string;
      MUI_MINOR_VERSION?: string;
      MUI_PATCH_VERSION?: string;
      MUI_PRERELEASE?: string;
    };
  };
}
