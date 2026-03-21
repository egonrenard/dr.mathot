
import { HomeHeader } from '../../components/home-header/home-header';
import { PageBlock } from '../../components/page-block/page-block';
import { LanguageService } from '../../services/language';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'home-page',
  imports: [HomeHeader, PageBlock],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly languageService = inject(LanguageService);
}
