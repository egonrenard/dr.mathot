import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import type { SupportedLanguage } from './language';

interface SeoMetadataOptions {
  image?: string;
  url?: string;
  index?: boolean; // true = indexeren, false = noindex, undefined = standaard indexeren
  language?: SupportedLanguage;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly siteUrl = 'https://dermathot.be';
  private readonly defaultImagePath = '/images/logo-dark-red.png';

  private readonly supportedLanguages: readonly SupportedLanguage[] = ['nl', 'fr', 'en'];
  private readonly hreflangMap: Record<SupportedLanguage, string> = {
    nl: 'nl-BE',
    fr: 'fr-BE',
    en: 'en',
  };

  updateMetadata(title: string, description: string, options: SeoMetadataOptions = {}) {
    const image = this.toAbsoluteUrl(options.image || this.defaultImagePath);
    const url = options.url ? this.toAbsoluteUrl(options.url) : '';

    // Waterdichte check: Alleen als options.index expliciet 'false' is, wordt het noindex.
    // In alle andere gevallen (true, undefined, ontbrekend) is het 'index, follow'.
    const robots = options.index === false ? 'noindex, follow' : 'index, follow';

    this.titleService.setTitle(title);

    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'robots', content: robots });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: 'Dr. Mathot' });
    this.metaService.updateTag({ property: 'og:image', content: image });
    if (options.language) {
      this.metaService.updateTag({
        property: 'og:locale',
        content: this.hreflangMap[options.language].replace('-', '_'),
      });
    }
    if (url) {
      this.metaService.updateTag({ property: 'og:url', content: url });
    }

    // Twitter Cards
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: image });
  }

  updateLanguageLinks(currentLanguage: SupportedLanguage, currentUrl: string): void {
    const canonicalPath = this.toLocalizedPath(currentUrl, currentLanguage);
    this.setLinkTag('canonical', this.toAbsoluteUrl(canonicalPath));

    for (const language of this.supportedLanguages) {
      const localizedPath = this.toLocalizedPath(currentUrl, language);
      this.setLinkTag('alternate', this.toAbsoluteUrl(localizedPath), this.hreflangMap[language]);
    }

    this.setLinkTag(
      'alternate',
      this.toAbsoluteUrl(this.toLocalizedPath(currentUrl, 'nl')),
      'x-default',
    );
  }

  private toLocalizedPath(url: string, language: SupportedLanguage): string {
    const [path] = url.split(/[?#]/, 1);
    const segments = path.split('/').filter(Boolean);

    if (segments.length > 0 && this.supportedLanguages.includes(segments[0] as SupportedLanguage)) {
      segments.shift();
    }

    return segments.length > 0 ? `/${language}/${segments.join('/')}` : `/${language}`;
  }

  private toAbsoluteUrl(path: string): string {
    if (/^https?:\/\//.test(path)) {
      return path;
    }

    if (isPlatformBrowser(this.platformId) && path.startsWith('/')) {
      return `${window.location.origin}${path}`;
    }

    return `${this.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }

  private setLinkTag(rel: 'canonical' | 'alternate', href: string, hreflang?: string): void {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
    let link = this.document.head.querySelector(selector) as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', rel);
      if (hreflang) {
        link.setAttribute('hreflang', hreflang);
      }
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', href);
  }
}
