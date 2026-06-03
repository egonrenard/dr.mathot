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
  private readonly defaultSeoLanguage: SupportedLanguage = 'en';
  private readonly seoFallbacks: Record<SupportedLanguage, { title: string; description: string }> =
    {
      nl: {
        title: 'Dr. Olivia Mathot – Dermatoloog Brussel',
        description: 'Dermatoloog in Brussel voor medische, esthetische en pediatrische dermatologie. Consultaties in Etterbeek (di/do) en Ukkel (wo/vr). Specialist in nagelaandoeningen.',
      },
      fr: {
        title: 'Dr. Olivia Mathot – Dermatologue Bruxelles',
        description: 'Dermatologue à Bruxelles spécialisée en dermatologie médicale, esthétique et pédiatrique. Consultations à Etterbeek (ma/je) et Uccle (me/ve). Experte en pathologies onguéales.',
      },
      en: {
        title: 'Dr. Olivia Mathot – Dermatologist Brussels',
        description: 'Dermatologist in Brussels specialising in medical, aesthetic and paediatric dermatology. Consultations in Etterbeek (Tue/Thu) and Uccle (Wed/Fri). Expert in nail disorders.',
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
      const activeLanguage = routeLanguage ?? this.defaultSeoLanguage;
      const shouldIndexRoute = routeLanguage !== null;
      const pageKey = this.getSeoPageKeyFromUrl(currentUrl);

      const baseTitle = this.languageService.t('seo.title');
      const resolvedBase =
        baseTitle === 'seo.title' ? this.seoFallbacks[activeLanguage].title : baseTitle;
      const pageTitleKey = `seo.pages.${pageKey}.title`;
      const pageDescriptionKey = `seo.pages.${pageKey}.description`;
      const translatedPageTitle = this.languageService.t(pageTitleKey);
      const translatedDescription = this.languageService.t(pageDescriptionKey);
      const pageName = translatedPageTitle === pageTitleKey ? '' : translatedPageTitle;
      const resolvedDescription =
        translatedDescription === pageDescriptionKey
          ? this.seoFallbacks[activeLanguage].description
          : translatedDescription;
      const pageTitle = pageName ? `${pageName} | ${resolvedBase}` : resolvedBase;

      this.seoService.updateMetadata(pageTitle, resolvedDescription, {
        url: currentUrl,
        index: shouldIndexRoute,
        language: activeLanguage,
      });
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
    const pageKey = this.getSeoPageKeyFromUrl(url);
    const pageTitleKey = `seo.pages.${pageKey}.title`;
    const translated = this.languageService.t(pageTitleKey);

    return translated === pageTitleKey ? '' : translated;
  }

  private getSeoPageKeyFromUrl(url: string):
    | 'home'
    | 'about'
    | 'contact'
    | 'appointment'
    | 'practicalInfo'
    | 'privacy'
    | 'disclaimer' {
    const [path] = url.split(/[?#]/, 1);
    const segments = path.split('/').filter(Boolean);
    const pageSegment = segments.find((s) => s !== 'nl' && s !== 'fr' && s !== 'en') ?? '';

    const pageKeyMap: Record<string, 'about' | 'contact' | 'appointment' | 'practicalInfo' | 'privacy' | 'disclaimer'> = {
      about: 'about',
      contact: 'contact',
      appointment: 'appointment',
      'practical-info': 'practicalInfo',
      privacy: 'privacy',
      disclaimer: 'disclaimer',
    };

    return pageKeyMap[pageSegment] ?? 'home';
  }
}
