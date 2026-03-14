import { Component, HostBinding, HostListener } from '@angular/core';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { NavigationBarMobile } from '../navigation-bar-mobile/navigation-bar-mobile';

@Component({
  selector: 'page-header',
  imports: [NavigationBar, NavigationBarMobile],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
  navButtons = [
    { id: 1, label: 'Home', routerLink: '/', icon: 'fa fa-home' },
    { id: 2, label: 'About Me', routerLink: '/about', icon: 'fa fa-info-circle' },
    { id: 4, label: 'Contact', routerLink: '/contact', icon: 'fa fa-envelope' },
  ];
  constructor() {}
  isNavOpen = false;

  private setBodyScrollLocked(locked: boolean) {
    document.body.style.overflow = locked ? 'hidden' : 'auto';
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
    this.setBodyScrollLocked(this.isNavOpen);
  }

  closeNav() {
    this.isNavOpen = false;
    this.setBodyScrollLocked(false);
  }
}
