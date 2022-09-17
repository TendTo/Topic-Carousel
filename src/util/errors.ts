import { PACKAGE_NAME } from '@topic-carousel/constants';

/**
 * Throws an error if the provided condition is falsy.
 * @param condition if falsy, an error is thrown
 * @param message message to display
 */
export function assert(condition: boolean, message?: string): void {
  if (!condition) throw new Error(`[${PACKAGE_NAME}] ${message ?? ''}`);
}

/**
 * Throws an error with the provided message.
 * @param message message to display
 */
export function error(message?: string): never {
  throw new Error(`[${PACKAGE_NAME}] ${message ?? ''}`);
}

/**
 * Displays an error log in the console with the provided message.
 * @param message message to display
 */
export function errorLog(message?: string): void {
  console.error(`[${PACKAGE_NAME}] ${message ?? ''}`);
}
