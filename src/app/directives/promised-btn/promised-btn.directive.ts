import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPromisedBtn]'
})
export class PromisedBtnDirective {

  @Input() appPromisedBtn: Promise<any> | boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    if (this.appPromisedBtn) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
      const span = this.renderer.createElement('span');
      this.renderer.addClass(span, 'spinner');
      this.renderer.appendChild(this.el.nativeElement, span);
    }
  }

  ngOnChanges() {
    if (this.appPromisedBtn) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
      const span = this.renderer.createElement('span');
      this.renderer.addClass(span, 'spinner');
      this.renderer.appendChild(this.el.nativeElement, span);
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
      const span = this.el.nativeElement.querySelector('.spinner');
      if (span) {
        this.renderer.removeChild(this.el.nativeElement, span);
      }
    }
  }
}
