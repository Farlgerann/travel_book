import { Injectable } from '@angular/core';

import { Travels } from './travels';
import { travelsList } from './mock-travels';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  getTravels(): Observable<Travels[]> {
    const dataSource = of(travelsList);
    return dataSource;
  }

  getTravel(id :number): Observable<Travels> {
    return of(travelsList.find(travel => travel.position === id));
  }

  constructor() { }
}
