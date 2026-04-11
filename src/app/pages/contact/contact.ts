import { Component, inject } from '@angular/core';
import { ContactBlock } from '../../components/contact-block/contact-block';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'contact-page',
  imports: [ContactBlock],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  readonly languageService = inject(LanguageService);
}
