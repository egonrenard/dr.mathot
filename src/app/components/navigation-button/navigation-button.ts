import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'navigation-button',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation-button.html',
  styleUrl: './navigation-button.css',
})
export class NavigationButton {
  @Input() label!: string;
  @Input() routerLink?: string;
  @Input() icon?: string;
  @Input() isDarkRed?: boolean ;
  

  @Output() select = new EventEmitter<void>();

  @HostBinding('attr.theme') theme: string = 'colorful';

  setTheme(themeName: string) {
    this.theme = themeName;
  }

  onClick() {
    this.select.emit();
  }
}
