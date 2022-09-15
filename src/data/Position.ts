import { clamp } from '../util';

type PositionOptions = {
  /** Whether the position will reset upon going over the maximum value
   * and go the end when going under the minimum one.
   * If false, in the situation described above, the limit position will be returned */
  loop?: boolean;
  /**
   * Initial position of the carousel.
   * Must be between 0 and maxPosition - 1.
   */
  initialPosition?: number;
};

type OnPositionChangeCallback = (isGoNext: boolean, position: number, prevPosition: number) => void;

type PositionEvents = {
  onPositionChange: OnPositionChangeCallback;
};

export class Position implements IEventEmitter<PositionEvents> {
  private _position: number;
  private _onTopicChangeCallbacks: OnPositionChangeCallback[] = [];
  public readonly initialPosition: number;
  public readonly maxPosition: number;
  public readonly loop: boolean;

  constructor(maxPosition: number);
  constructor(maxPosition: number, options?: PositionOptions);
  constructor(maxPosition: number, { loop = false, initialPosition = 0 }: PositionOptions = {}) {
    this.maxPosition = maxPosition > 0 ? maxPosition : 0;
    this.loop = loop;
    this.initialPosition = clamp(initialPosition, 0, this.maxPosition);
    this._position = this.initialPosition;
  }

  public get position(): number {
    return this._position;
  }

  public set position(position: number) {
    const prevPosition = this._position;
    this._position = clamp(position, 0, this.maxPosition);
    this.onPositionChange(this._position > prevPosition, this._position, prevPosition);
  }

  on<E extends keyof PositionEvents>(event: E, listener: PositionEvents[E]): void {
    switch (event) {
      case 'onPositionChange':
        this._onTopicChangeCallbacks.push(listener as OnPositionChangeCallback);
        break;
      default:
        throw new Error(`Event ${event} not found`);
    }
  }

  off<E extends keyof PositionEvents>(event: E, listener: PositionEvents[E]): void {
    switch (event) {
      case 'onPositionChange':
        this._onTopicChangeCallbacks = this._onTopicChangeCallbacks.filter((cb) => cb !== listener);
        break;
      default:
        throw new Error(`Event ${event} not found`);
    }
  }

  private onPositionChange(isGoNext: boolean, position: number, prevPosition: number): void {
    this._onTopicChangeCallbacks.forEach((cb) => cb(isGoNext, position, prevPosition));
  }

  public goNext(): void {
    const prevPosition = this._position;
    this._position = this.loop
      ? (this._position + 1) % this.maxPosition
      : Math.min(this._position + 1, this.maxPosition);
    this.onPositionChange(true, this._position, prevPosition);
  }

  public goPrev(): void {
    const prevPosition = this._position;
    this._position = this.loop
      ? (this._position - 1 + this.maxPosition) % this.maxPosition
      : Math.max(this._position - 1, 0);
    this.onPositionChange(false, this._position, prevPosition);
  }
}
