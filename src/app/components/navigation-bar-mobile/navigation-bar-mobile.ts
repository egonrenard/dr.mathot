import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationButton } from '../navigation-button/navigation-button';

@Component({
  selector: 'navigation-bar-mobile',
  imports: [NavigationButton],
  templateUrl: './navigation-bar-mobile.html',
  styleUrl: './navigation-bar-mobile.css',
})
export class NavigationBarMobile {
  @Input() navButtons!: { id: number; label: string; routerLink?: string; icon?: string }[];
  @Input() theme?: string;
  @Output() navButtonClick = new EventEmitter<void>();

  selectButton() {
    this.navButtonClick.emit();
  }
}
