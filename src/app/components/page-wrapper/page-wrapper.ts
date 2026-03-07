import { Component } from '@angular/core';
import { PageHeader } from '../page-header/page-header';
import { PageFooter } from '../page-footer/page-footer';
import { EmptyHeaderBlock } from '../empty-header-block/empty-header-block';

import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'page-wrapper',
  standalone: true,
  imports: [ RouterOutlet, PageHeader, PageFooter],
  templateUrl: './page-wrapper.html',
  styleUrl: './page-wrapper.css',
})
export class PageWrapper {}
