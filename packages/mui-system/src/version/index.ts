export const version = process.env.MUI_VERSION;
export const major = Number(process.env.MUI_MAJOR_VERSION);
export const minor = Number(process.env.MUI_MINOR_VERSION);
export const patch = Number(process.env.MUI_PATCH_VERSION);
export const preReleaseLabel = process.env.MUI_PRERELEASE_LABEL || null;
export const preReleaseNumber = Number(process.env.MUI_PRERELEASE_NUMBER) || null;

export default version;
