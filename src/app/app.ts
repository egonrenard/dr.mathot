import { Component, effect, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PageWrapper } from './components/page-wrapper/page-wrapper';
import { LanguageService, type SupportedLanguage } from './services/language';
import { SeoService } from './services/seo';

@Component({
  selector: 'app-root',
  imports: [PageWrapper],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('dr.mathot');
  private readonly seoFallbacks: Record<SupportedLanguage, { title: string; description: string }> =
    {
      nl: {
        title: 'Dr. Mathot',
        description: 'Specialist in Algemene Dermatologie en Nagelaandoeningen.',
      },
      fr: {
        title: 'Dr. Mathot',
        description: 'Votre specialiste en Dermatologie Generale et Pathologies Ongueales.',
      },
      en: {
        title: 'Dr. Mathot',
        description: 'Your specialist in General Dermatology and Nail Disorders.',
      },
    };

  constructor(
    private readonly languageService: LanguageService,
    private readonly seoService: SeoService,
    private readonly router: Router,
  ) {
    const updateSeo = () => {
      const currentUrl = this.router.url;
      const routeLanguage = this.getLanguageFromUrl(currentUrl);
      const activeLanguage = routeLanguage ?? this.languageService.currentLanguage();

      const baseTitle = this.languageService.t('seo.title');
      const description = this.languageService.t('seo.description');
      const resolvedBase =
        baseTitle === 'seo.title' ? this.seoFallbacks[activeLanguage].title : baseTitle;
      const resolvedDescription =
        description === 'seo.description'
          ? this.seoFallbacks[activeLanguage].description
          : description;

      const pageName = this.getPageNameFromUrl(currentUrl);
      const pageTitle = pageName ? `${pageName} | ${resolvedBase}` : resolvedBase;

      this.seoService.updateMetadata(pageTitle, resolvedDescription, '', currentUrl);
      this.seoService.updateLanguageLinks(activeLanguage, currentUrl);
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

  private getLanguageFromUrl(url: string): SupportedLanguage | null {
    const [path] = url.split(/[?#]/, 1);
    const [firstSegment] = path.split('/').filter(Boolean);

    if (firstSegment === 'nl' || firstSegment === 'fr' || firstSegment === 'en') {
      return firstSegment;
    }

    return null;
  }

  private getPageNameFromUrl(url: string): string {
    const [path] = url.split(/[?#]/, 1);
    const segments = path.split('/').filter(Boolean);
    const pageSegment = segments.find((s) => s !== 'nl' && s !== 'fr' && s !== 'en') ?? '';

    const pageKeyMap: Record<string, string[]> = {
      about: ['nav.about', 'about.title'],
      contact: ['nav.contact', 'pages.contact.title'],
      appointment: ['nav.appointment', 'appointment.title'],
      'practical-info': ['nav.practicalInfo'],
      privacy: ['pages.privacy.title'],
      disclaimer: ['pages.disclaimer.title'],
    };

    const keys = pageKeyMap[pageSegment];
    if (!keys) return '';

    for (const key of keys) {
      const translated = this.languageService.t(key);
      if (translated !== key) {
        return translated;
      }
    }

    return '';
  }
}
