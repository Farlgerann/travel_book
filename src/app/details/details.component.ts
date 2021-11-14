import {Component, OnInit, ViewChild} from '@angular/core';

import {MatTable, MatTableDataSource} from '@angular/material/table';
import {TravelService} from '../travel.service';
import {Travels} from '../travels';
import {MatDialog} from '@angular/material/dialog';
import {TravelModalComponent} from '../travel-modal/travel-modal.component';
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private travels$: Observable<Travels[]>;

  constructor(private travelService: TravelService, public dialog: MatDialog) {
  }

  @ViewChild(MatTable) table: MatTable<Travels>;

  displayedColumns: string[] = ['name', 'description', 'departure', 'return' , 'like', 'action'];
  dataSource = new MatTableDataSource<Travels>();

  addTravel(): void {
    this.dialog.open(TravelModalComponent, {
      data: {
        id: this.dataSource.data.length + 1,
        name: '',
        description: '',
        departure: '',
        return: '',
        like: false
      },
    }).afterClosed().subscribe(result => {
      
      if (result) {
        result.name = result.name.length != 0?result.name:'Travel';
        result.description = result.description.length != 0?result.description:'Empty Line';
        result.departure = result.departure.length != 0?new Date(result.departure):new Date();
        result.return = result.return.length != 0?new Date(result.return):new Date();
        result.like = result.like.length != 0?result.like:false;
        this.travelService.insertTravel(result);
      }
    });

      this.table.renderRows();
  }

  editTravel(id: number): void {
    this.dialog.open(TravelModalComponent, {
      data: {
        id: id,
        name: this.dataSource.data[id].name,
        description: this.dataSource.data[id].description,
        departure: formatDate(this.dataSource.data[id].departure, 'yyyy-MM-dd', 'en'),
        return: formatDate(this.dataSource.data[id].return, 'yyyy-MM-dd', 'en'),
        like: this.dataSource.data[id].like
      },
    }).afterClosed().pipe(tap(travel => {
      this.travelService.setTravel(travel);
    })).subscribe();
    this.table.renderRows()
  }
  
  deleteTravel(id: number): void {
    this.travelService.deleteTravel(id);
    this.table.renderRows();
  }
  
  toggleLike(id: number): void {
    this.dataSource.data[id].like = !this.dataSource.data[id].like;
  }
  
  ngOnInit(): void {
    this.travels$ = this.travelService.getTravels();
    this.travels$.pipe(tap(travels => {
      this.dataSource = new MatTableDataSource<Travels>(travels);
    })).subscribe();
  }

}