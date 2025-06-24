import { Component } from '@angular/core';
import { shiftType } from '../../../../models/shiftType';
import { ShiftTypesService } from '../services/shift-types.service';
import { response } from 'express';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shift-types',
  templateUrl: './shift-types.component.html',
  styleUrl: './shift-types.component.scss'
})
export class ShiftTypesComponent {
  columns: string[] = [];
  shiftTypes: shiftType[] = [];
  showFilters: boolean = false;

  isModalOpen: boolean = false;
  isNewRecord: boolean = false;

  newForm!: FormGroup;

  constructor(
    private shiftTypesService: ShiftTypesService,
     private translateService: TranslateService
  ){
    this.translateService.setDefaultLang('es'); //Default language
  }

  ngOnInit() {
    this.getShiftTypes();
  }

  getShiftTypes(): void {
    const columnsToExclude = ['pkShiftType'];

    this.shiftTypesService.getShiftTypes().subscribe({
      next: (response) => {
        console.log('getShiftTypes', response);
        this.shiftTypes = response;

        if(this.shiftTypes.length > 0) {
          this.columns = Object.keys(this.shiftTypes[0]).filter(
            column => !columnsToExclude.includes(column)
          );
        }
      }
    })
  }

  onEditInit(shiftType: shiftType) {

  }

  toggleFilters(): void {

  }

  newRecord() {
    this.isNewRecord = true;
  }
  onSearchInputChange(value: string): void {
    // console.log(value);
    // const term = value.toLowerCase();

    // this.correspondenceTypesFiltering = this.correspondenceTypes.filter(item => {
    //   console.log(item);

    //   const type = item.correspondenceType?.toLowerCase() || '';
    //   const desc = item.description?.toLowerCase() || '';

    //   console.log('a',type, desc);

    //   return type.includes(term);
    // });

    // this.catalogSharedService.setFilterValue(value);
  }

  createShiftType() {

  }

  closeModal() {
    this.isModalOpen = false;
    this.isNewRecord = false;
  }
}
