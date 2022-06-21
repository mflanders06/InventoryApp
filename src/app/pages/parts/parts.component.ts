import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { PartsService } from 'src/app/services/parts.service';
import { Part, PartsReturned, Unit } from 'src/app/components/part';
import {  Vendor } from 'src/app/components/vendor';
import { CreatePartComponent } from 'src/app/components/create-part/create-part.component';
import { EditPartComponent } from 'src/app/components/edit-part/edit-part.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {

  @ViewChild('partsTable', {static: false}) partTable: MatTable<Part> | undefined
  parts: Part[] = [];
  vendors: Vendor[] = [];
  units: Unit[] = [];
  displayedColumns: string[] = ['partName', 'description', 'unitName', 'vendorName', 'edit'];
  modalHeight: string = '70%';
  modalWidth: string = '70%';

  constructor(
    private partsService: PartsService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getPartsList();
    this.getUnits();
    this.getVendors();
  }

  getParts(){
    this.partsService.getParts()
    .subscribe(
      ((response) => {
        this.parts = response.data.parts
        //console.log(this.parts)
      })
    )
  }

  getPartsList(){
    this.partsService.getPartsList()
    .subscribe(
      ((response) => {
        this.parts = response.data.fullParts
        //console.log('this is partslist', response.data)
      })
    )
  }

  newPart(){
    const dialogRef = this.dialog.open(CreatePartComponent, {
      height: this.modalHeight,
      width: this.modalWidth,
      data:{
        units: this.units,
        vendors: this.vendors
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.partName){
        this.partsService.newPart(result.partName, result.description, result.unitId, result.vendorId)
        .subscribe(() => {
          this.getPartsList();
          this.cd.markForCheck();
          this.partTable?.renderRows();
        })
      }
    })
  }

  getVendors(){
    this.partsService.getVendors()
    .subscribe(
      ((response) => {
        this.vendors = response.data.vendors
      })
    )
  }

  getUnits(){
    this.partsService.getUnits()
    .subscribe(
      ((response) => {
        this.units = response.data.units
      })
    )
  }

  
  editPart(part: Part){
    const dialogRef = this.dialog.open(EditPartComponent, {height: this.modalHeight, width: this.modalWidth, data: part})

    dialogRef.afterClosed().subscribe(result => {
      if(result.partName){
        this.partsService.editPart(result.id, result.partName, result.description, result.unitId, result.vendorId)
        .subscribe(() => {
          this.getPartsList()
        })
      }
    })
  }
  

}
