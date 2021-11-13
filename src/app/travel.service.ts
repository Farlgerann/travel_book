import {Injectable} from '@angular/core';

import {Travels} from './travels';
import {travelsList} from './mock-travels';
import {Observable, Subject} from 'rxjs';
import {startWith} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class TravelService {
  private dataSource: Travels[];
  private dataSource$ = new Subject<Travels[]>();
  
  public init(): void {
    this.dataSource = travelsList;
  }

  getTravels(): Observable<Travels[]> {
    return this.dataSource$.pipe(startWith(this.dataSource));
  }

  //bon la tu pourra refaire le truc a ta sauce mais le but est simplement de recupere les donner de base et de faire next / re-emetre le suject pour {insert commentaire plus haut}
  setTravel(travel: Partial<Travels>): void {
    this.dataSource[travel.id] = {...this.dataSource[travel.id], ...travel};
    this.dataSource$.next(this.dataSource);
  }
  
  insertTravel(travel: Travels): void {
    this.dataSource.push(travel);
    this.dataSource$.next(this.dataSource);
  }

  deleteTravel(id: number): void {
    this.dataSource.splice(id, 1);
    this.dataSource$.next(this.dataSource);
  }
}