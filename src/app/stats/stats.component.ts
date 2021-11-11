import { Component, ViewChild, OnInit } from '@angular/core';

import { TravelService } from '../travel.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { Travels } from '../travels';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor(private travelService: TravelService) { 

  }

  travelArray = new MatTableDataSource();
  dataSource = new MatTableDataSource();
  
  dummy : Calculation[];
  displayedColumns: string[] = ['year', 'travelCount', 'totalDays', 'averageDuration'];
  
  getTravels() : void{
    this.travelService.getTravels()
    .subscribe(travels => this.travelArray = new MatTableDataSource<Travels>(travels));
  }
  
  ngOnInit(): void {
    this.getTravels();
    let travelCount = this.travelArray.data.length;
    this.dummy = [
      {year : 2021, travelCount: travelCount, totalDays: 57, averageDuration: 6}
    ];
    this.dataSource = new MatTableDataSource<Calculation>(this.dummy);
  };

}

export interface Calculation {
  year: number;
  travelCount: number;
  totalDays: number;
  averageDuration: number;
}
