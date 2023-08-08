import { ItemElement } from '@topic-carousel/element';
import { ElementOptions } from './BaseElement';
import { EventManager } from '@topic-carousel/event';
import { INVALID_NUMBER_VALUE } from '@topic-carousel/constants';
import { Position } from '@topic-carousel/data';
import { ItemsElement } from './ItemsElement';

export class ItemsElementOrder extends ItemsElement {
  constructor(
    eventManager: EventManager,
    selector: string | HTMLElement,
    options: ElementOptions,
    items: ItemElement[] = [],
  ) {
    super(eventManager, selector, options, items);
  }

  protected onResize = (): void => {
    const item = this._items.find((item) => item.isActive || item.overrideIsActive);
    this.itemWidth = item?.width ?? INVALID_NUMBER_VALUE;
    if (this.lastPosition !== INVALID_NUMBER_VALUE) this.onPositionChange(this.lastPosition);
  };

  protected onPositionChange = (prevPosition: number, position?: Position) => {
    const pos = position?.position ?? prevPosition;
    this.lastPosition = pos;
    if (position?.loop === 'continue' && position) {
      const order = this.getOrder(position.position);
      const prevPos = position.position > prevPosition ? 1 : -1;
      this.items.reduce((idx, item) => {
        if (!item.isActive && !item.overrideIsActive) return idx;
        if (idx === order) item.order = position.position;
        return idx + 1;
      }, 0);
      this.teleport(prevPos * this.itemWidth, 0);
      this.translate(0, 0);
    } else {
      this.translate(-pos * this.itemWidth, 0);
    }
  };

  private getOrder(pos: number) {
    const nActive = this.nActive;
    if (pos >= 0) return pos % nActive;
    return (pos + nActive * Math.ceil(-pos / nActive)) % nActive;
  }
}
