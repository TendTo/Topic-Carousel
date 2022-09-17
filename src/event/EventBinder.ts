type CustomEventListenerArg = Event & Partial<CustomEvent<AnyFunctionArgs>>;

/**
 * Instance of the EventBinder object.
 */
export class EventBinder {
  /**
   * Stores all handlers that listen to native events.
   * `[ target, event, callback, remover ]`
   */
  private _listeners: [string, AnyFunction, () => void][] = [];

  constructor(public readonly target: EventTarget) {
    this.target.addEventListener('destroy', () => this.unbindAll());
  }

  public get listeners(): [string, AnyFunction, () => void][] {
    return this._listeners;
  }

  /**
   * Listens to native events.
   * @link https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener
   * @param events an event or events to listen to.
   * @param callback a callback function.
   * @param options the options to pass to the `addEventListener` function.
   */
  public bind(
    events: string | string[],
    callback: AnyFunction,
    options?: AddEventListenerOptions,
  ): void {
    if (Array.isArray(events)) {
      events.forEach((event) => this.bind(event, callback, options));
    } else {
      const internalCallback = (e: CustomEventListenerArg) => {
        callback(...(e?.detail ?? []));
      };
      this._listeners.push([
        events,
        callback,
        () => this.target.removeEventListener(events, internalCallback, options),
      ]);
      this.target.addEventListener(events, internalCallback, options);
    }
  }

  /**
   * Removes the event handler.
   * @param events the event name or names to remove.
   * @param callback specific callback to remove.
   */
  public unbind(events: string | string[], callback?: AnyFunction): void {
    if (Array.isArray(events)) {
      events.forEach((event) => this.unbind(event, callback));
    } else {
      this._listeners = this._listeners.filter((listener) => {
        if (listener[0] === events && (!callback || listener[1] === callback)) {
          listener[2]();
          return false;
        }
        return true;
      });
    }
  }

  /**
   * Dispatches a custom event of the target
   * @param type the event type
   * @param detail the `detail` object of the event
   * @return an event object
   */
  public dispatch(type: string, detail?: AnyFunctionArgs): CustomEvent {
    const e = new CustomEvent(type, { bubbles: true, detail });
    this.target.dispatchEvent(e);
    return e;
  }

  /**
   * Removes all listeners.
   */
  public unbindAll(): void {
    this._listeners.forEach((data) => {
      data[2]();
    });
    this._listeners = [];
  }
}
