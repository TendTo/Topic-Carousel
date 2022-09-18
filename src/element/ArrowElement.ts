import { EventManager } from '@topic-carousel/event';
import { throttle } from '@topic-carousel/util';
import { BaseElement, ElementOptions } from './BaseElement';

type ArrowDirection = 'prev' | 'next';

export type ArrowElementEvents = {
  goPrev: () => void;
  goNext: () => void;
};

export class ArrowElement extends BaseElement {
  constructor(
    eventManager: EventManager,
    elementOrSelector: HTMLElement | string,
    options: ElementOptions,
    private readonly direction: ArrowDirection,
  ) {
    super(eventManager, elementOrSelector, options);
  }

  public override setupEvents(): void {
    this.element.addEventListener(
      'click',
      throttle(this.onClick, this.elementOptions.arrowThrottle),
    );
  }

  private onClick = () => {
    if (this.direction === 'prev') this.eventManager.emit('goPrev');
    else this.eventManager.emit('goNext');
  };
}
