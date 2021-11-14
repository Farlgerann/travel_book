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
  statsToDisplay = new MatTableDataSource();

  mapArray = new Map<number, any>();
  idArray = new Array<number>();
  displayedColumns: string[] = ['year', 'travelCount', 'totalDays', 'averageDuration'];

  ngOnInit(): void {
    this.travels$ = this.travelService.getTravels();

    this.travels$ .pipe(
      tap((travels) => {

        this.travelArray = new MatTableDataSource<Travels>(travels);
        const travelCount = this.travelArray.data.length;
        this.travelArray.data.forEach((element: any) => {
          if (this.idArray.find(x => x === element.id) || !this.mapArray.has(element.departure.getFullYear())) {
            this.idArray.push(element.id);
            this.mapArray.set(element.departure.getFullYear(), {
              year: element.departure.getFullYear(),
              travelCount: 1,
              totalDays: element.return.getDate() - element.departure.getDate(),
              averageDuration: this.getDifferenceInDays(element.departure, element.return)
            });
          }
          else {
            
            this.mapArray.set(element.departure.getFullYear(), {
              year: element.departure.getFullYear(),
              travelCount: this.mapArray.get(element.departure.getFullYear()).travelCount + 1,
              totalDays: this.computeTotalDays(this.mapArray,element),
              averageDuration: Math.round(this.computeTotalDays(this.mapArray,element) / (this.mapArray.get(element.departure.getFullYear()).travelCount + 1))
            });
          }
        });     
        this.statsToDisplay = new MatTableDataSource<Map<number, any>>(Array.from(this.mapArray.values()));
        this.mapArray.clear();
      })).subscribe();
  }
  
  computeTotalDays(map: Map<number, any>, element: any): number {
    return map.get(element.departure.getFullYear()).totalDays + this.getDifferenceInDays(element.departure, element.return);
  }

  getDifferenceInDays(date1: Date, date2: Date): number {
    const diff = Math.abs(date2.getTime() - date1.getTime());
    return Math.round(diff / (1000 * 3600 * 24));
  }

}