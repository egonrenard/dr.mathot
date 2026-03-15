import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'page-footer',
  imports: [],
  templateUrl: './page-footer.html',
  styleUrl: './page-footer.css',
})
export class PageFooter {
  readonly languageService = inject(LanguageService);
}
