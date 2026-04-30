# DrMathot

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.




```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## i18n Template (NL / FR / EN)

Use this checklist whenever you add new UI text.

### 1. Add keys to all language files

Files:

- `public/i18n/nl.json`
- `public/i18n/fr.json`
- `public/i18n/en.json`

Example structure:

```json
{
	"aboutPage": {
		"title": "Over mij",
		"intro": "Korte introductie"
	}
}
```

Use the same keys in all 3 files.

### 2. Use the language service in the component

```ts
import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
	selector: 'about-page',
	imports: [],
	templateUrl: './about.html',
	styleUrl: './about.css',
})
export class About {
	readonly languageService = inject(LanguageService);
}
```

### 3. Render translated text in the template

```html
<h2>{{ languageService.t('aboutPage.title') }}</h2>
<p>{{ languageService.t('aboutPage.intro') }}</p>
```

### 4. Add route-aware navigation links (if needed)

```ts
routerLink: this.languageService.getLocalizedRoute('about')
```

