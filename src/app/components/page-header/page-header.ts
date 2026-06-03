import { Component, computed, inject } from '@angular/core';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { NavigationBarMobile } from '../navigation-bar-mobile/navigation-bar-mobile';
import { LanguageService, SupportedLanguage } from '../../services/language';

@Component({
  selector: 'page-header',
  imports: [NavigationBar, NavigationBarMobile],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
  readonly languageService = inject(LanguageService);
  readonly availableLanguages = this.languageService.supportedLanguages;

  readonly navButtons = computed(() => [
    {
      id: 1,
      label: this.languageService.t('nav.home'),
      routerLink: this.languageService.getLocalizedRoute(''),
    },
    {
      id: 2,
      label: this.languageService.t('nav.about'),
      routerLink: this.languageService.getLocalizedRoute('about'),
    },
    {
      id: 3,
      label: this.languageService.t('nav.practicalInfo'),
      routerLink: this.languageService.getLocalizedRoute('practical-info'),
      isDarkRed: false,
    },
    {
      id: 4,
      label: this.languageService.t('nav.contact'),
      routerLink: this.languageService.getLocalizedRoute('contact'),
    },
    {
      id: 5,
      label: this.languageService.t('nav.appointment'),
      routerLink: this.languageService.getLocalizedRoute('appointment'),
      isDarkRed: false,
    },
  ]);

  isNavOpen = false;

  private setBodyScrollLocked(locked: boolean) {
    document.body.style.overflow = locked ? 'hidden' : 'auto';
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
    this.setBodyScrollLocked(this.isNavOpen);
  }

  closeNav() {
    this.isNavOpen = false;
    this.setBodyScrollLocked(false);
  }

  changeLanguage(language: SupportedLanguage) {
    void this.languageService.setLanguage(language, { updateUrl: true });
  }

  isLanguageActive(language: SupportedLanguage): boolean {
    return this.languageService.currentLanguage() === language;
  }
}
