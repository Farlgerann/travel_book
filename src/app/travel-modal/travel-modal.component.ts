import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Travels} from '../travels';

@Component({
  selector: 'app-travel-modal',
  templateUrl: './travel-modal.component.html',
  styleUrls: ['./travel-modal.component.scss']
})
export class TravelModalComponent implements OnInit {
  public travelForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Travels) {
  }
  public ngOnInit(): void {
    this.travelForm = new FormGroup({
      id: new FormControl(this.data.id),
      name: new FormControl(this.data.name),
      description: new FormControl(this.data.description),
      departure: new FormControl(this.data.departure),
      return: new FormControl(this.data.return),
      like: new FormControl(this.data.like)
    });
  }
}