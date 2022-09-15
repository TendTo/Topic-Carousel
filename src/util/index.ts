/**
 * Limits the value between the minimum and maximum values.
 * @param value value to be checked
 * @param min minimum value
 * @param max maximum value
 * @returns value if it is between min and max, min if it is lower than min, max if it is higher than max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}
