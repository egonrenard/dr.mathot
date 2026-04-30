import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NavigationButton } from '../navigation-button/navigation-button';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'navigation-bar-mobile',
  imports: [NavigationButton],
  templateUrl: './navigation-bar-mobile.html',
  styleUrl: './navigation-bar-mobile.css',
})
export class NavigationBarMobile {
  readonly languageService = inject(LanguageService);
  @Input() navButtons!: { id: number; label: string; routerLink?: string; icon?: string }[];
  @Input() theme?: string;
  @Output() navButtonClick = new EventEmitter<void>();

  selectButton() {
    this.navButtonClick.emit();
  }
}
