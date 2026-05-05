import { Component, inject } from '@angular/core';
import { CollapseBox } from '../../components/collapse-box/collapse-box';
import { LanguageService, SupportedLanguage } from '../../services/language';
import { PdfBox } from '../../components/pdf-box/pdf-box';
import { LinkBox } from '../../components/link-box/link-box';

@Component({
  selector: 'pratical-info',
  imports: [CollapseBox, PdfBox, LinkBox],
  templateUrl: './pratical-info.html',
  styleUrl: './pratical-info.css',
})
export class PraticalInfo {
  readonly languageService = inject(LanguageService);

  private readonly dpaUrls: Record<SupportedLanguage, string> = {
    nl: 'https://www.gegevensbeschermingsautoriteit.be/burger',
    fr: 'https://www.autoriteprotectiondonnees.be/citoyen',
    en: 'https://www.dataprotectionauthority.be/citizen',
  };

  getDataProtectionAuthorityUrl(): string {
    return this.dpaUrls[this.languageService.currentLanguage()];
  }

  scrollToPreparationDocuments(event: Event): void {
    event.preventDefault();

    const target = document.getElementById('preparation-documents');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
