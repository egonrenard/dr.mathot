import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'navigation-button',
  imports: [RouterLink],
  templateUrl: './navigation-button.html',
  styleUrl: './navigation-button.css',
})
export class NavigationButton {
  @Input() label!: string;
  @Input() routerLink?: string;
  @Input() icon?: string;
  @Input() selected: boolean = false;

  @Output() select = new EventEmitter<void>();

  @HostBinding('attr.theme') theme: string = 'colorful';

  setTheme(themeName: string) {
    this.theme = themeName;
  }

  onClick() {
    this.select.emit();
  }
}
