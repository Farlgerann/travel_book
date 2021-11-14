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
  private namefilled : boolean; 
  private descriptionfilled : boolean; 
  private departurefilled : boolean; 
  private returnfilled : boolean; 
  private progressBarValue: number = 0;

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

    this.travelForm.get("name").valueChanges.subscribe(x => {
      this.updateProgressBar(1);
    });
    this.travelForm.get("description").valueChanges.subscribe(x => {
      this.updateProgressBar(2);
    });
    this.travelForm.get("departure").valueChanges.subscribe(x => {
      this.updateProgressBar(3);
    });
    this.travelForm.get("return").valueChanges.subscribe(x => {
      this.updateProgressBar(4);
    });
  }

  updateProgressBar( value: number) {
    if (value == 1)
      this.namefilled = !this.namefilled;
    if (value == 2)
      this.descriptionfilled = !this.descriptionfilled;
    if (value == 3)
      this.departurefilled = !this.departurefilled;
    if (value == 4)
      this.returnfilled = !this.returnfilled;
    this.progressBarValue = ((this.namefilled?25:0) + (this.descriptionfilled?25:0) + (this.departurefilled?25:0) + (this.returnfilled?25:0));
  }

  public toggleLike(): void {
    this.travelForm.get('like').setValue(!this.travelForm.get('like').value);
  }
  

}