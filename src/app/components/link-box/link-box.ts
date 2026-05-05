import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'link-box',
  imports: [],
  templateUrl: './link-box.html',
  styleUrl: './link-box.css',
})
export class LinkBox {
  @Input() label = '';
  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  onBoxClick(event: MouseEvent): void {
    const target = event.target;

    if (target instanceof Element && target.closest('a')) {
      return;
    }

    this.triggerProjectedLink();
  }

  onBoxKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this.triggerProjectedLink();
  }

  private triggerProjectedLink(): void {
    const link = this.elementRef.nativeElement.querySelector('a');

    link?.click();
  }
}
