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
      if (this.travelForm.get("name").value.length > 0)
        this.updateProgressBar(1, true);
      else
        this.updateProgressBar(1, false);
    });
    this.travelForm.get("description").valueChanges.subscribe(x => {
      if (this.travelForm.get("description").value.length > 0)
        this.updateProgressBar(2, true);
      else
        this.updateProgressBar(2, false);
    });
    this.travelForm.get("departure").valueChanges.subscribe(x => {
      if (this.travelForm.get("departure").value.length > 0)
        this.updateProgressBar(3, true);
      else
        this.updateProgressBar(3, false);
    });
    this.travelForm.get("return").valueChanges.subscribe(x => {
      if (this.travelForm.get("return").value.length > 0)
        this.updateProgressBar(4, true);
      else
        this.updateProgressBar(4, false);
    });
  }

  updateProgressBar( control: number, filled: boolean) {
    if (control == 1)
      this.namefilled = filled? true : false;
    else if (control == 2)
      this.descriptionfilled = filled? true : false;
    else if (control == 3)
      this.departurefilled = filled? true : false;
    else if (control == 4)
      this.returnfilled = filled? true : false;
    this.progressBarValue = ((this.namefilled?25:0) + (this.descriptionfilled?25:0) + (this.departurefilled?25:0) + (this.returnfilled?25:0));
  }

  public toggleLike(): void {
    this.travelForm.get('like').setValue(!this.travelForm.get('like').value);
  }
  

}