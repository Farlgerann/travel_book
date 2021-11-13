import {Component, OnInit} from '@angular/core';
import {TravelService} from "./travel.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Travel Book';

  constructor(private readonly travelService: TravelService) {
  }
  
  public ngOnInit(): void {
    this.travelService.init();
  }
}