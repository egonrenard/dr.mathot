import { Component, Input } from '@angular/core';
import { NavigationButton } from '../navigation-button/navigation-button';

@Component({
  selector: 'navigation-bar',
  imports: [NavigationButton],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
})
export class NavigationBar {
  @Input() navButtons!: { id: number; label: string; routerLink?: string; icon?: string }[];
  @Input() theme?: string;
  selectedButtonId: number = 1;

  selectButton(id: number) {
    this.selectedButtonId = id;
    console.log(`Selected button ID: ${id}`);
  }
}
