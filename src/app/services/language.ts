import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, REQUEST, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import enTranslations from '../../../public/i18n/en.json';
import frTranslations from '../../../public/i18n/fr.json';
import nlTranslations from '../../../public/i18n/nl.json';

export type SupportedLanguage = 'nl' | 'fr' | 'en';

interface TranslationFile {
  [key: string]: string | TranslationFile;
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly request = inject(REQUEST, { optional: true });
  private readonly router = inject(Router);
  private readonly languageStorageKey = 'preferredLanguage';
  private readonly warnedMissingKeys = new Set<string>();
  private readonly documentLanguageMap: Record<SupportedLanguage, string> = {
    nl: 'nl-BE',
    fr: 'fr-BE',
    en: 'en',
  };

  private readonly _currentLanguage = signal<SupportedLanguage>('en');
  private readonly _translations = signal<Record<string, string>>({});
  private _loadingTranslations = false;

  readonly supportedLanguages: readonly SupportedLanguage[] = ['nl', 'fr', 'en'];
  readonly currentLanguage = this._currentLanguage.asReadonly();
  private readonly translationFiles: Record<SupportedLanguage, TranslationFile> = {
    en: enTranslations as TranslationFile,
    fr: frTranslations as TranslationFile,
    nl: nlTranslations as TranslationFile,
  };

  async init(): Promise<void> {
    const defaultLanguage =
      this.getLanguageFromCurrentUrl() ?? this.getSavedLanguage() ?? this.detectBrowserLanguage() ?? 'en';
    await this.setLanguage(defaultLanguage);
  }

  async setLanguage(language: SupportedLanguage, options: { updateUrl?: boolean } = {}): Promise<void> {
    const nextLanguage = this.normalizeLanguage(language);
    this._currentLanguage.set(nextLanguage);
    this._loadingTranslations = true;
    this.document.documentElement.lang = this.documentLanguageMap[nextLanguage];

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.languageStorageKey, nextLanguage);
    }

    const loadedTranslations = await this.loadTranslations(nextLanguage);
    this._loadingTranslations = false;
    if (loadedTranslations) {
      this._translations.set(loadedTranslations);
    }

    if (options.updateUrl && isPlatformBrowser(this.platformId)) {
      const targetUrl = this.replaceLanguageInUrl(this.router.url, nextLanguage);
      if (targetUrl !== this.router.url) {
        await this.router.navigateByUrl(targetUrl);
      }
    }
  }

  t(key: string): string {
    const value = this._translations()[key];
    if (value !== undefined) {
      return value;
    }

    if (isPlatformBrowser(this.platformId) && !this._loadingTranslations && !this.warnedMissingKeys.has(key)) {
      this.warnedMissingKeys.add(key);
      console.warn(`[i18n] Missing translation key: ${key} (${this.currentLanguage()})`);
    }

    return key;
  }

  getLocalizedRoute(path: '' | 'about' | 'contact' | 'appointment' | 'privacy' | 'disclaimer' | 'practical-info', language = this.currentLanguage()): string {
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
    const path = isPlatformBrowser(this.platformId)
      ? window.location.pathname
      : this.document.location?.pathname
        ? this.document.location.pathname
      : this.request
        ? new URL(this.request.url).pathname
        : this.router.url;
    const [firstSegment] = path.split('/').filter(Boolean);
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
    const translationFile = this.translationFiles[language];
    return this.flattenTranslations(translationFile);
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