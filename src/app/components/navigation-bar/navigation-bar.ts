import { Component, Input, inject } from '@angular/core';
import { NavigationButton } from '../navigation-button/navigation-button';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'navigation-bar',
  imports: [NavigationButton],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
})
export class NavigationBar {
  readonly languageService = inject(LanguageService);
  @Input() navButtons!: { id: number; label: string; routerLink?: string; icon?: string; isDarkRed?: boolean }[];
  @Input() theme?: string;
}
