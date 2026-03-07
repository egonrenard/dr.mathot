import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageWrapper } from './components/page-wrapper/page-wrapper';

@Component({
  selector: 'app-root',
  imports: [ PageWrapper],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dr.mathot');
}
