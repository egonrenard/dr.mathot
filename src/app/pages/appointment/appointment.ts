import { Component, inject } from '@angular/core';
import { ContactBlock } from '../../components/contact-block/contact-block';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-appointment',
  imports: [ContactBlock],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class Appointment {
  readonly languageService = inject(LanguageService);
}
