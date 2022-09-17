export class SortedArray<T> {
  private readonly _array: T[];

  public constructor();
  public constructor(array: T[]);
  public constructor(array: T[] = [], private readonly sortFunction?: (a: T, b: T) => number) {
    this._array = array;
  }

  public push(value: T): number {
    for (let i = 0; i < this._array.length; i++) {
      if (
        this.sortFunction ? this.sortFunction(this._array[i], value) > 0 : this._array[i] > value
      ) {
        this._array.splice(i, 0, value);
        return this._array.length;
      }
    }
    return this._array.push(value);
  }

  public remove(value: T) {
    this._array.splice(this._array.indexOf(value), 1);
  }

  public get length(): number {
    return this._array.length;
  }

  public filter(callback: (value: T, index: number, array: T[]) => boolean): T[] {
    return this._array.filter(callback);
  }

  public forEach(callback: (value: T, index: number, array: T[]) => void): void {
    for (let i = 0; i < this._array.length; i++) {
      callback(this._array[i], i, this._array);
    }
  }

  public reduce<I>(
    callback: (previousValue: I, currentValue: T, currentIndex: number, array: T[]) => I,
    initialValue: I,
  ): I {
    return this._array.reduce(callback, initialValue);
  }

  public indexOf(value: T): number {
    return this._array.indexOf(value);
  }
}
