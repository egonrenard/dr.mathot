import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'page-block',
  imports: [CommonModule],
  templateUrl: './page-block.html',
  styleUrl: './page-block.css',
})
export class PageBlock {
  @Input() color: string = '#ffffff';
}
