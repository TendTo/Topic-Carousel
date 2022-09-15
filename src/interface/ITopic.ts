export interface ITopic {
  readonly topic: string;
  additionalData: unknown;
  isActive: boolean;
  toggleActive(): void;
}
