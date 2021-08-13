export default function getUserAgentPlatform(): string {
  if ((navigator as any).userAgentData && (navigator as any).userAgentData.platform) {
    return (navigator as any).userAgentData.platform;
  }

  return navigator.userAgent;
}
