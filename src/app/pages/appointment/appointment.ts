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
  readonly clinic1Images = ['images/arsenal1.jpg', 'images/arsenal2.jpg'];
  readonly clinic2Images = ['images/researchinstitute1.jpg', 'images/researchinstitute2.jpg'];
  readonly clinic1RotationDelayMs = 0;
  readonly clinic2RotationDelayMs = 2500;
}
