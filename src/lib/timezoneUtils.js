export function getDeviceTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
