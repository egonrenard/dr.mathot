import { Component, Input } from '@angular/core';

@Component({
  selector: 'collapse-box',
  imports: [],
  templateUrl: './collapse-box.html',
  styleUrl: './collapse-box.css',
})
export class CollapseBox {
  protected isOpen = false;
  @Input() title = '';

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
