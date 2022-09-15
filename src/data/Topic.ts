export class Topic {
  constructor(id: string);
  constructor(id: string, additionalData?: unknown, isActive?: boolean);
  constructor(
    public readonly id: string,
    public additionalData: unknown = undefined,
    public isActive: boolean = false,
  ) {}

  public toggleActive(): void {
    this.isActive = !this.isActive;
  }
}
