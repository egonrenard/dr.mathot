import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'contact-page',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  readonly languageService = inject(LanguageService);

  getUrgentItem2Html(): string {
    return this.wrapEmergencyNumber(this.languageService.t('pages.contact.urgentItem2'), '1733');
  }

  getUrgentItem3Html(): string {
    return this.wrapEmergencyNumber(this.languageService.t('pages.contact.urgentItem3'), '112');
  }

  private wrapEmergencyNumber(text: string, number: string): string {
    return text.replace(number, `<strong>${number}</strong>`);
  }
}
