import {Component, OnInit} from '@angular/core';

import {TravelService} from '../travel.service';

import {MatTableDataSource} from '@angular/material/table';
import {Travels} from '../travels';
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  private travels$: Observable<Travels[]>;

  constructor(private travelService: TravelService) {

  }

  travelArray = new MatTableDataSource();
  dataSource = new MatTableDataSource();

  dummy: Calculation[];
  displayedColumns: string[] = ['year', 'travelCount', 'totalDays', 'averageDuration'];

  ngOnInit(): void {
    this.travels$ = this.travelService.getTravels();

    this.travels$ .pipe(
      tap((travels) => {

        this.travelArray = new MatTableDataSource<Travels>(travels);
        const travelCount = this.travelArray.data.length;
        this.dummy = [
          {year: 2021, travelCount, totalDays: 57, averageDuration: 6}
        ];
        this.dataSource = new MatTableDataSource<Calculation>(this.dummy);
      })).subscribe();
  }

}

export interface Calculation {
  year: number;
  travelCount: number;
  totalDays: number;
  averageDuration: number;
}