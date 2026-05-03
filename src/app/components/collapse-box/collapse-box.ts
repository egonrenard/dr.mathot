import { Component, ElementRef, Input, inject } from '@angular/core';

@Component({
  selector: 'collapse-box',
  imports: [],
  templateUrl: './collapse-box.html',
  styleUrl: './collapse-box.css',
})
export class CollapseBox {
  protected isOpen = false;
  protected isKeyboardFocused = false;
  private mouseDown = false;
  private readonly el = inject(ElementRef);

  @Input() title = '';

  toggle() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      // Wacht tot de max-height animatie (500ms) klaar is en scroll dan indien nodig
      setTimeout(() => {
        const rect = (this.el.nativeElement as HTMLElement).getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Als de geopende box hoger is dan de viewport, hou de header bovenaan in beeld.
        if (rect.height > viewportHeight) {
          const targetTop = Math.max(0, window.scrollY + rect.top - 12);
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
          return;
        }

        const overflowBy = rect.bottom - viewportHeight;
        if (overflowBy > 0) {
          window.scrollBy({ top: overflowBy + 16, behavior: 'smooth' });
        }
      }, 520);
    }
  }

  onMouseDown() {
    this.mouseDown = true;
  }

  onFocus() {
    if (!this.mouseDown) {
      this.isKeyboardFocused = true;
    }
    this.mouseDown = false;
  }

  onBlur() {
    this.isKeyboardFocused = false;
    this.mouseDown = false;
  }
}
