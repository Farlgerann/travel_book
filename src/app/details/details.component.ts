import { Component, ViewChild, OnInit } from '@angular/core';

import { MatTable} from '@angular/material/table';
import { TravelService } from '../travel.service';
import { Travels } from '../travels';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TravelModalComponent } from '../travel-modal/travel-modal.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})


export class DetailsComponent implements OnInit{

  constructor(private travelService: TravelService, public dialog: MatDialog) {}
  
  @ViewChild(MatTable) table: MatTable<Travels>;

  displayedColumns: string[] = ['name', 'description', 'dates', 'like', 'action'];
  dataSource = new MatTableDataSource<Travels>();

  addTravel(): void {
    const dialogRef = this.dialog.open(TravelModalComponent, {
      data: {
        position: '',
        name: '',
        description: '',
        dates: '',
        like: false
      },
    }).afterClosed().subscribe(result => {
      if(result){
        this.dataSource.data.push(result);
        this.table.renderRows();
      }
    });

    this.dataSource.data.push({position:this.dataSource.data.length+1, name: "voyageTest", description: 'voyage de test', dates: 2021, like: false}),
    this.table.renderRows();
  }

  editTravel(id: number): void {
    const dialogRef = this.dialog.open(TravelModalComponent, {
      data: {
        position: this.dataSource.data[id].position,
        name: this.dataSource.data[id].name,
        description: this.dataSource.data[id].description,
        dates: this.dataSource.data[id].dates,
        like: this.dataSource.data[id].like
      },
    });
  }


  getTravels() : void{
    this.travelService.getTravels()
      .subscribe(travels => this.dataSource = new MatTableDataSource<Travels>(travels));
    }
    
  ngOnInit(): void {
    this.getTravels();
  };

  deleteTravel(id: number): void {
    console.log(id);
    this.dataSource.data.splice(id, 1);
    this.table.renderRows();
  }

  toggleLike(id: number): void {
    this.dataSource.data[id].like = !this.dataSource.data[id].like;
  }

}