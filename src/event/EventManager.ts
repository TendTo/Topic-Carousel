import { PositionEvents, TopicListEvents } from '@topic-carousel/data';
import {
  ArrowElementEvents,
  ItemsElementEvents,
  TopicElementEvents,
  TopicAllElementEvents,
} from '@topic-carousel/element';
import { TopicCarouselEvents } from '@topic-carousel/TopicCarousel';
import { EventBinder } from './EventBinder';

export type EventMap = PositionEvents &
  TopicListEvents &
  ArrowElementEvents &
  ItemsElementEvents &
  TopicElementEvents &
  TopicAllElementEvents &
  TopicCarouselEvents;

/**
 * The constructor function that provides interface for internal and native events.
 */
export class EventManager {
  /**
   * The document fragment for internal events.
   * Usually is provided by the holder, which is the TopicCarousel instance.
   */
  public readonly target: EventTarget;
  /** The event binder object. */
  public readonly binder: EventBinder;

  constructor(holder?: IEventTargetHolder) {
    this.target = holder ? holder.eventTarget : document.createDocumentFragment();
    this.binder = new EventBinder(this.target);
  }

  /**
   * Listens to an internal event or events.
   * @param event the event name
   * @param callback the callback function to register
   */
  public on<K extends keyof EventMap>(event: K, callback: EventMap[K]): void;
  public on(event: string | string[], callback: AnyFunction): void {
    this.binder.bind(event, callback);
  }

  /**
   * Removes all event listeners for the provided event.
   * @param event the event name
   */
  public off<K extends keyof EventMap>(event: K, callback?: EventMap[K]): void;
  public off(event: string | string[], callback?: AnyFunction): void {
    this.binder.unbind(event, callback);
  }

  /**
   * Triggers callback functions.
   * This accepts additional arguments and passes them to callbacks.
   * @param event the event name
   * @param args the arguments to pass to callbacks
   */
  public emit<K extends keyof EventMap>(event: K, ...args: Parameters<EventMap[K]>): void;
  public emit(event: string, ...args: AnyFunctionArgs): void {
    this.binder.dispatch(event, args);
  }
}
