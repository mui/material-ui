const version = process.env.MUI_PACKAGE_VERSION || null;

let versionNumber: string | null = null;
let preReleaseInfo: string | null = null;

if (version) {
  [versionNumber, preReleaseInfo] = version.split('-');
}

let destructuredVersion: number[] | null[] = [null, null, null];
let destructuredPreReleaseInfo: [string, number] | null[] = [null, null];

if (versionNumber) {
  destructuredVersion = versionNumber.split('.').map(Number);
}

if (preReleaseInfo) {
  destructuredPreReleaseInfo = [preReleaseInfo.split('.')[0], Number(preReleaseInfo.split('.')[1])];
}

const [major, minor, patch] = destructuredVersion;
const [preReleaseLabel, preReleaseNumber] = destructuredPreReleaseInfo;

export { version, major, minor, patch, preReleaseLabel, preReleaseNumber };
export default version;
