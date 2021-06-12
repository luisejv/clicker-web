import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPassword]',
})
export class PasswordDirective {
  private _shown = false;

  constructor(private el: ElementRef) {
    this.setup();
  }

  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = 'Ocultar contraseña';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = 'Mostrar contraseña';
    }
  }

  setup() {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.setAttribute('class', 'password-toggle');
    span.innerHTML = `Mostrar contraseña`;
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }
}
