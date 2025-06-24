import { Component } from '@angular/core';
import { correspondeceType } from '../../../../models/correspondenceType';
import { CorrespondenceTypesService } from '../services/correspondence-types.service';
import { response } from 'express';
import { TranslateService } from '@ngx-translate/core';
import { CatalogSharedService } from '../../../shared/catalog-shared.service';
import { SweetDialogs } from '../../../core/utils/sweet-dialogs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-correspondence-type',
  templateUrl: './correspondence-type.component.html',
  styleUrl: './correspondence-type.component.scss'
})
export class CorrespondenceTypeComponent {
  showFilters: boolean = false;
  tableFilter: string = '';
  filters: any = {};

  columns: string[] = [];

  correspondenceTypes: correspondeceType[] = [];
  correspondenceTypesFiltering: correspondeceType[] = [];

  isModalOpen = false;
  isNewRecord = false;

  selectedCorrespondenceType: correspondeceType = {
    pkCorrespondenceType: 0,
    correspondenceType: '',
    description: '',
    available: false,
  };

  newForm!: FormGroup;

  constructor(
    private correspondenceTypeService: CorrespondenceTypesService,
    private translateService: TranslateService,
    private catalogSharedService: CatalogSharedService,
    private sweetDialogs: SweetDialogs,
    private fb: FormBuilder
  ){
    this.translateService.setDefaultLang('es'); //Default language
  }

  ngOnInit() {
    this.newForm = this.fb.group({
      correspondenceType: ['', Validators.required],
      description: ['', Validators.required],
      available: [true]
    });

    this.catalogSharedService.setShowFilters(false);
    this.catalogSharedService.showFilters$.subscribe(value => {
      this.showFilters = value;
    });

    this.getCorrespondenceTypes();


  }

  ngAfterViewInit(): void {
    this.catalogSharedService.getFilters().subscribe((value) => {
      this.getCorrespondenceTypes(value);
      this.filters = value;
    })
  }

  onEditInit(correspondeceType: correspondeceType) {
    console.log('correspondeceType', correspondeceType);
    this.selectedCorrespondenceType = JSON.parse(JSON.stringify(correspondeceType));
    console.log('this.selectedCorrespondenceType', this.selectedCorrespondenceType);
    this.isModalOpen = true;
  }

  newRecord() {
    this.isNewRecord = true;
  }

  getCorrespondenceTypes(filters: any = {}): void {
    const columnsToExclude = ['pkCorrespondenceType'];

    this.correspondenceTypeService.getCorrespondenceTypes(filters).subscribe({
      next: (response) => {
        console.log('getCorrespondenceTypes', response);

        this.correspondenceTypes = response;
        this.correspondenceTypesFiltering = [...this.correspondenceTypes];

        if(this.correspondenceTypes.length > 0) {
          this.columns = Object.keys(this.correspondenceTypes[0]).filter(
            column => !columnsToExclude.includes(column)
          );
        }
      }
    });
  }

  createCorrespondenceType() {
    if(this.newForm.invalid) {
      return this.sweetDialogs.alertDialog('Error', 'Por favor, llena todos los campos', 'error');
    }

    const formData = new FormData();
    formData.append('correspondenceType', this.newForm.value.correspondenceType);
    formData.append('description', this.newForm.value.description);
    formData.append('available', this.newForm.value.available);

    this.correspondenceTypeService.createCorrespondenceType(formData).subscribe({
      next: () => {
        this.sweetDialogs.alertDialog('Success', 'Se ha registrado correctamente', 'success');
        this.getCorrespondenceTypes();
        this.isNewRecord = false;
      },
      error: () => {
        this.sweetDialogs.alertDialog('Error', 'No se insertó ningún registro. Puede que ya exista o no haya cambios.', 'error');
      }
    })
  }

  closeModal() {
    this.isModalOpen = false;
    this.isNewRecord = false;
  }

  saveChanges() {

  }

  toggleFilters(): void {
    this.catalogSharedService.setShowFilters(!this.showFilters);
  }

  onSearchInputChange(value: string): void {
    console.log(value);
    const term = value.toLowerCase();

    this.correspondenceTypesFiltering = this.correspondenceTypes.filter(item => {
      console.log(item);

      const type = item.correspondenceType?.toLowerCase() || '';
      const desc = item.description?.toLowerCase() || '';

      console.log('a',type, desc);

      return type.includes(term);
    });

    this.catalogSharedService.setFilterValue(value);
  }
}
