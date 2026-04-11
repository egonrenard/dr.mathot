import { Component, Input } from '@angular/core';

interface ScheduleEntry {
  day: string;
  hours: string;
}

@Component({
  selector: 'app-contact-block',
  imports: [],
  templateUrl: './contact-block.html',
  styleUrl: './contact-block.css',
})
export class ContactBlock {
  @Input() label!: string;
  @Input() scheduleEntries: ScheduleEntry[] = [];
  @Input() address!: string;
  @Input() phone!: string;
  @Input() email!: string;
  @Input() notes!: string;
  @Input() ctaLabel!: string;
}
