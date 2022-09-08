export class Topic {
  constructor(name: string);
  constructor(name: string, additionalData?: unknown, isActive?: boolean);
  constructor(
    public name: string,
    public additionalData: unknown = undefined,
    public isActive: boolean = false,
  ) {}

  public toggleActive(): void {
    this.isActive = !this.isActive;
  }
}
