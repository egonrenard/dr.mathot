import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-disclaimer',
  imports: [],
  templateUrl: './disclaimer.html',
  styleUrl: './disclaimer.css',
})
export class Disclaimer {
  readonly languageService = inject(LanguageService);
}
