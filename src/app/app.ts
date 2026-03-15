import { Component, effect, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PageWrapper } from './components/page-wrapper/page-wrapper';
import { LanguageService } from './services/language';
import { SeoService } from './services/seo';

@Component({
  selector: 'app-root',
  imports: [ PageWrapper],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dr.mathot');

  constructor(
    private readonly languageService: LanguageService,
    private readonly seoService: SeoService,
    private readonly router: Router
  ) {
    const updateSeo = () => {
      this.seoService.updateMetadata(
        this.languageService.t('seo.title'),
        this.languageService.t('seo.description'),
        '',
        this.router.url
      );
      this.seoService.updateLanguageLinks(this.languageService.currentLanguage(), this.router.url);
    };

    effect(() => {
      this.languageService.currentLanguage();
      updateSeo();
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        updateSeo();
      }
    });

    void this.languageService.init();
  }
}
