import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'home-header',
  imports: [],
  templateUrl: './home-header.html',
  styleUrl: './home-header.css',
})
export class HomeHeader {
  private readonly router = inject(Router);
  readonly languageService = inject(LanguageService);

  goToContactPage(): void {
    void this.router.navigateByUrl(this.languageService.getLocalizedRoute('contact'));
  }
}
