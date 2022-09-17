import { EventManager } from './EventManager';

export class EventClass {
  constructor(protected readonly eventManager: EventManager) {
    this.eventManager.on('setup', this.setupEvents.bind(this));
    this.eventManager.on('init', this.init.bind(this));
  }

  /**
   * @virtual
   * Adds all the listeners the element needs for its interactivity.
   */
  protected setupEvents(): void {
    // To be implemented by the child class, if needed
  }

  /**
   * @virtual
   * Adds all the listeners the element needs for its interactivity.
   */
  protected init(): void {
    // To be implemented by the child class, if needed
  }
}
