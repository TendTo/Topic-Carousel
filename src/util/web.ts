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
