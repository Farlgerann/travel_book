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
  public progressBarValue: number = 0;

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
    this.travelForm.valueChanges.subscribe(() => {
      this.updateProgressBar();
    });
  }

  updateProgressBar() {
    this.namefilled = this.travelForm.get('name').value.length>0?true:false;
    this.descriptionfilled = this.travelForm.get('description').value.length>0?true:false;
    this.departurefilled = this.travelForm.get('departure').value.length>0?true:false;
    this.returnfilled = this.travelForm.get('return').value.length>0?true:false;

    this.progressBarValue = ((this.namefilled?25:0) + (this.descriptionfilled?25:0) + (this.departurefilled?25:0) + (this.returnfilled?25:0));
  }

  public toggleLike(): void {
    this.travelForm.get('like').setValue(!this.travelForm.get('like').value);
  }
}