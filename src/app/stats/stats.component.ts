import { Component, ViewChild, OnInit } from '@angular/core';

import { travelsList } from '../mock-travels';

import { MatTableDataSource } from '@angular/material/table';
import {MatTable} from '@angular/material/table';
import { Travels } from '../travels';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['name', 'description', 'dates', 'like'];
  dataSource = new MatTableDataSource(travelsList);

  ngOnInit(): void {
  }

}
