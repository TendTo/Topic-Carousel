import { BaseElement } from './BaseElement';

export class ArrowElement extends BaseElement {
  public override addListeners(): void {
    this.element.addEventListener('click', this.onClick);
  }

  private onClick = () => {
    this.element.innerText = 'Fest';
  };
}
