import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Part, Unit } from '../part';
import { Vendor } from '../vendor'

@Component({
  selector: 'app-create-part',
  templateUrl: './create-part.component.html',
  styleUrls: ['./create-part.component.scss']
})
export class CreatePartComponent implements OnInit {

  formGroup = new FormGroup({
    partName: new FormControl(null, [Validators.required]),
    desciption: new FormControl(),
    unitId: new FormControl(null, [Validators.required]),
    vendorId: new FormControl()
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreatePartComponent>
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  submitPart(){
    const {value} = this.formGroup
    const newPart: Part = {
      ...value
    }
  }

  cancel(){
    this.dialogRef.close()
  }

}
