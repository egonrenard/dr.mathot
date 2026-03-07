import { Component, HostBinding, HostListener } from '@angular/core';
import { NavigationBar } from '../navigation-bar/navigation-bar';

@Component({
  selector: 'page-header',
  imports: [NavigationBar],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
  constructor() {
  }
  navButtons = [
    { id: 1, label: 'Home', routerLink: '/', icon: 'fa fa-home' },
    { id: 2, label: 'About Me', routerLink: '/about', icon: 'fa fa-info-circle' },
    { id: 4, label: 'Contact', routerLink: '/contact', icon: 'fa fa-envelope' },
  ];

}
