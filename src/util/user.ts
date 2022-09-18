/**
 * Produces a debounced callback that delays being invoked until after {@link wait} milliseconds have elapsed since the last time it was invoked.
 * @param callback callback to be debounced
 * @param wait milliseconds to wait
 * @param callNow whether to call the {@link callback} immediately
 * @returns new callback function with debounced functionality
 */
export function debounce(callback: AnyFunction, wait = 100, callNow = false) {
  let timeout: number | undefined;

  return function executedFunction(...args: AnyFunctionArgs) {
    clearTimeout(timeout);
    if (callNow) callback(...args);
    else timeout = window.setTimeout(callback, wait);
  };
}

/**
 * Produces a throttled callback that avoids executing a function more than once every {@link wait} milliseconds.
 * @param callback callback to be throttled
 * @param wait milliseconds to wait
 * @returns new callback function with throttled functionality
 */
export function throttle(callback: AnyFunction, wait = 100) {
  let timeout: number | undefined;

  return function executedFunction(...args: AnyFunctionArgs) {
    if (timeout) return;
    timeout = window.setTimeout(() => (timeout = undefined), wait);
    callback(...args);
  };
}
