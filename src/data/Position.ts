import { ItemsElement } from '@topic-carousel/element';
import { EventManager, EventClass } from '@topic-carousel/event';
import { clamp, error } from '@topic-carousel/util';

type LoopType = 'none' | 'jump' | 'continue';

/** Options for the initialization of a Position object */
export type PositionOptions = {
  /** Whether the position will reset upon going over the maximum value
   * and go the end when going under the minimum one.
   * If false, in the situation described above, the limit position will be returned */
  loop?: LoopType;
  /**
   * Initial position of the carousel.
   * Must be between 0 and maxPosition.
   */
  initialPosition?: number;
};

type OnPositionChangeCallback = (prevPosition: number, position: Position) => void;

export type PositionEvents = {
  positionChange: OnPositionChangeCallback;
};

export class Position extends EventClass {
  private _position: number;
  private _maxPosition: number;
  private _nColumns = 2;
  private _nItems = 1;
  public readonly loop: LoopType;

  constructor(eventManager: EventManager);
  constructor(eventManager: EventManager, maxPosition: number);
  constructor(eventManager: EventManager, maxPosition: number, options?: PositionOptions);
  constructor(
    eventManager: EventManager,
    maxPosition = 0,
    { loop = 'none', initialPosition = 0 }: PositionOptions = {},
  ) {
    super(eventManager);
    this._maxPosition = maxPosition > 0 ? maxPosition : 0;
    this.loop = loop;
    this._position = clamp(initialPosition, 0, this._maxPosition);
  }

  protected override setupEvents(): void {
    this.eventManager.on('goNext', this.onGoNext);
    this.eventManager.on('goPrev', this.onGoPrev);
    this.eventManager.on('updateItems', this.onUpdateItems);
    // this.eventManager.on('updateColumns', this.onUpdateColumns);
  }

  private onUpdateItems = (itemsElement: ItemsElement) => {
    this.nItems = itemsElement.nActive;
  };

  private onUpdateColumns = (itemsElement: ItemsElement) => {
    this.nItems = itemsElement.nActive;
  };

  private onGoNext = (): void => {
    if (this.loop === 'none') this.position = Math.min(this._position + 1, this._maxPosition);
    else if (this.loop === 'jump') this.position = (this._position + 1) % (this._maxPosition + 1);
    else if (this.loop === 'continue') error('Not implemented yet');
  };

  private onGoPrev = (): void => {
    if (this.loop === 'none') this.position = Math.max(this._position - 1, 0);
    else if (this.loop === 'jump')
      this.position = (this._position + this._maxPosition) % (this._maxPosition + 1);
    else if (this.loop === 'continue') error('Not implemented yet');
  };

  public get maxPosition(): number {
    return this._maxPosition;
  }

  private set maxPosition(maxPosition: number) {
    this._maxPosition = maxPosition;
    if (this._position > maxPosition) this.position = maxPosition;
  }

  public get position(): number {
    return this._position;
  }

  public set position(position: number) {
    const prevPosition = this._position;
    this._position = clamp(position, 0, this._maxPosition);
    this.eventManager.emit('positionChange', prevPosition, this);
  }

  public get nColumns(): number {
    return this._nColumns;
  }

  public set nColumns(nColumns: number) {
    this._nColumns = nColumns;
    this.maxPosition = Math.max(this._nItems - nColumns, 0);
  }

  public get nItems(): number {
    return this._nItems;
  }

  public set nItems(nItems: number) {
    this._nItems = nItems;
    this.maxPosition = Math.max(nItems - this._nColumns, 0);
  }
}
