import { Component } from '@angular/core';

import { HomeHeader } from '../../components/home-header/home-header';

@Component({
  selector: 'home-page',
  imports: [HomeHeader],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
