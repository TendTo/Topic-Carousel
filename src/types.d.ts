type AnyFunctionArgs = any[];
type AnyFunction = (...args: AnyFunctionArgs) => void;

/**
 * Simple event emitter interface
 */
interface IEventEmitter<C extends Record<string, CallableFunction>> {
  /**
   * Add an event listener to the event emitter
   * @param event name of the event
   * @param listener callback function to be called when the event is emitted
   */
  on<E extends keyof C>(event: E, listener: C[E]): void;
  /**
   * Remove an event listener from the event emitter
   * @param event name of the event
   * @param listener callback function to be removed
   */
  off<E extends keyof C>(event: E, listener: C[E]): void;
}

/**
 * Topic interface
 */
interface ITopic {
  readonly topic: string;
  additionalData: unknown;
  isActive: boolean;
  toggleActive(): void;
}

/**
 * Topic interface
 */
interface IEventTargetHolder {
  readonly eventTarget: EventTarget;
}

interface IEventClass {
  /**
   * @virtual
   * Adds all the listeners the element needs for its interactivity.
   */
  setupEvents(): void;
}

interface IInit {
  /**
   * @virtual
   * Initializes the element.
   */
  init(): void;
}
