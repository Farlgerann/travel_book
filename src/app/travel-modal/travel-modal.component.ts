import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Travels } from '../travels';

@Component({
  selector: 'app-travel-modal',
  templateUrl: './travel-modal.component.html',
  styleUrls: ['./travel-modal.component.scss']
})
export class TravelModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Travels) { }

  travelForm = new FormGroup({
    position: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    dates: new FormControl(),
    like: new FormControl()
  })

  onFormSubmit(): void {
    console.log('Name:' + this.travelForm.get('name').value);
} 
}
