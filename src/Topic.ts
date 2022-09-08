export class Topic {
  constructor(name: string);
  constructor(name: string, additionalData?: Record<string, any>, isActive?: boolean);
  constructor(
    public name: string,
    public additionalData: Record<string, any> = {},
    public isActive: boolean = false,
  ) {}

  public getData(key: string): any {
    return this.additionalData[key];
  }

  public toggleActive(): void {
    this.isActive = !this.isActive;
  }
}
