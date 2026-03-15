import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

export type SupportedLanguage = 'nl' | 'fr' | 'en';

interface TranslationFile {
  [key: string]: string | TranslationFile;
}

const DEFAULT_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  nl: {
    'nav.home': 'Home',
    'nav.about': 'Over mij',
    'nav.contact': 'Contact',
    'header.menuAlt': 'Menu',
    'header.languageSwitcherAria': 'Taalselectie',
    'seo.title': 'Dr. Mathot',
    'seo.description': 'Specialist in medische en esthetische dermatologie.',
    'home.titleLine1': 'Welkom, ik ben',
    'home.titleLine2': 'Dr. Mathot',
    'home.subtitle': 'Uw specialist in medische en esthetische dermatologie',
    'home.ctaBookAppointment': 'Maak een afspraak',
    'home.profileImageAlt': 'profielfoto van Dr. Mathot',
    'footer.copyright': 'Alle rechten voorbehouden.',
    'pages.about.placeholder': 'Over-pagina in opbouw.',
    'pages.contact.placeholder': 'Contact-pagina in opbouw.'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'A propos',
    'nav.contact': 'Contact',
    'header.menuAlt': 'Menu',
    'header.languageSwitcherAria': 'Selection de langue',
    'seo.title': 'Dr. Mathot',
    'seo.description': 'Specialiste en dermatologie medicale et esthetique.',
    'home.titleLine1': 'Bienvenue, je suis',
    'home.titleLine2': 'Dr. Mathot',
    'home.subtitle': 'Votre specialiste en dermatologie medicale et esthetique',
    'home.ctaBookAppointment': 'Prendre rendez-vous',
    'home.profileImageAlt': 'photo de profil du Dr. Mathot',
    'footer.copyright': 'Tous droits reserves.',
    'pages.about.placeholder': 'Page A propos en construction.',
    'pages.contact.placeholder': 'Page Contact en construction.'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.contact': 'Contact',
    'header.menuAlt': 'Menu',
    'header.languageSwitcherAria': 'Language selector',
    'seo.title': 'Dr. Mathot',
    'seo.description': 'Specialist in medical and aesthetic dermatology.',
    'home.titleLine1': 'Welcome, I am',
    'home.titleLine2': 'Dr. Mathot',
    'home.subtitle': 'Your specialist in medical and aesthetic dermatology',
    'home.ctaBookAppointment': 'Book an appointment',
    'home.profileImageAlt': 'profile image of Dr. Mathot',
    'footer.copyright': 'All rights reserved.',
    'pages.about.placeholder': 'About page in progress.',
    'pages.contact.placeholder': 'Contact page in progress.'
  }
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly languageStorageKey = 'preferredLanguage';

  private readonly _currentLanguage = signal<SupportedLanguage>('en');
  private readonly _translations = signal<Record<string, string>>(DEFAULT_TRANSLATIONS.en);

  readonly supportedLanguages: readonly SupportedLanguage[] = ['nl', 'fr', 'en'];
  readonly currentLanguage = this._currentLanguage.asReadonly();

  async init(): Promise<void> {
    const defaultLanguage =
      this.getLanguageFromCurrentUrl() ?? this.getSavedLanguage() ?? this.detectBrowserLanguage() ?? 'en';
    await this.setLanguage(defaultLanguage);
  }

  async setLanguage(language: SupportedLanguage, options: { updateUrl?: boolean } = {}): Promise<void> {
    const nextLanguage = this.normalizeLanguage(language);
    this._currentLanguage.set(nextLanguage);
    this._translations.set(DEFAULT_TRANSLATIONS[nextLanguage]);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.languageStorageKey, nextLanguage);
      document.documentElement.lang = nextLanguage;
    }

    const loadedTranslations = await this.loadTranslations(nextLanguage);
    if (loadedTranslations) {
      this._translations.set({ ...DEFAULT_TRANSLATIONS[nextLanguage], ...loadedTranslations });
    }

    if (options.updateUrl && isPlatformBrowser(this.platformId)) {
      const targetUrl = this.replaceLanguageInUrl(this.router.url, nextLanguage);
      if (targetUrl !== this.router.url) {
        await this.router.navigateByUrl(targetUrl);
      }
    }
  }

  t(key: string): string {
    return this._translations()[key] ?? key;
  }

  getLocalizedRoute(path: '' | 'about' | 'contact', language = this.currentLanguage()): string {
    if (path === '') {
      return `/${language}`;
    }
    return `/${language}/${path}`;
  }

  private getSavedLanguage(): SupportedLanguage | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const saved = localStorage.getItem(this.languageStorageKey);
    return this.isSupportedLanguage(saved) ? saved : null;
  }

  private detectBrowserLanguage(): SupportedLanguage | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith('nl')) {
      return 'nl';
    }
    if (browserLanguage.startsWith('fr')) {
      return 'fr';
    }
    if (browserLanguage.startsWith('en')) {
      return 'en';
    }
    return null;
  }

  private normalizeLanguage(language: string): SupportedLanguage {
    if (language.startsWith('nl')) {
      return 'nl';
    }
    if (language.startsWith('fr')) {
      return 'fr';
    }
    if (language.startsWith('en')) {
      return 'en';
    }
    return 'en';
  }

  private isSupportedLanguage(language: string | null): language is SupportedLanguage {
    return language === 'nl' || language === 'fr' || language === 'en';
  }

  private getLanguageFromCurrentUrl(): SupportedLanguage | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const [firstSegment] = window.location.pathname.split('/').filter(Boolean);
    const candidate = firstSegment ?? null;
    return this.isSupportedLanguage(candidate) ? candidate : null;
  }

  private replaceLanguageInUrl(url: string, language: SupportedLanguage): string {
    const match = url.match(/^([^?#]*)(.*)$/);
    const rawPath = match?.[1] ?? url;
    const suffix = match?.[2] ?? '';

    const segments = rawPath.split('/').filter(Boolean);
    if (segments.length > 0 && this.isSupportedLanguage(segments[0])) {
      segments.shift();
    }

    const localizedPath = ['/', language, ...segments].join('/').replace('//', '/');
    return `${localizedPath}${suffix}`;
  }

  private async loadTranslations(language: SupportedLanguage): Promise<Record<string, string> | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    try {
      const response = await fetch(`/i18n/${language}.json`, { cache: 'no-store' });
      if (!response.ok) {
        return null;
      }

      const translationFile = (await response.json()) as TranslationFile;
      return this.flattenTranslations(translationFile);
    } catch {
      return null;
    }
  }

  private flattenTranslations(
    source: TranslationFile,
    prefix = '',
    target: Record<string, string> = {}
  ): Record<string, string> {
    for (const [key, value] of Object.entries(source)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'string') {
        target[fullKey] = value;
        continue;
      }

      this.flattenTranslations(value, fullKey, target);
    }

    return target;
  }
}