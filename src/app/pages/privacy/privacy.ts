import { Component, inject } from '@angular/core';
import { LanguageService, SupportedLanguage } from '../../services/language';

@Component({
  selector: 'app-privacy',
  imports: [],
  templateUrl: './privacy.html',
  styleUrl: './privacy.css',
})
export class Privacy {
  readonly languageService = inject(LanguageService);

  private readonly dpaUrls: Record<SupportedLanguage, string> = {
    nl: 'https://www.gegevensbeschermingsautoriteit.be/burger',
    fr: 'https://www.autoriteprotectiondonnees.be/citoyen',
    en: 'https://www.dataprotectionauthority.be/citizen',
  };

  getDataProtectionAuthorityUrl(): string {
    return this.dpaUrls[this.languageService.currentLanguage()];
  }
}
