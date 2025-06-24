import { Component, Input } from '@angular/core';
import { CorrespondenceTypesService } from '../../modules/catalogs/services/correspondence-types.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CatalogSharedService } from '../../shared/catalog-shared.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrl: './catalog-filter.component.scss'
})
export class CatalogFilterComponent {
  @Input() catalog: string = '';
  filters: any  = {};
  permissions: any[] = [];

  constructor(
    private correspondenceTypeService: CorrespondenceTypesService,
    private _formBuilder: FormBuilder,
    private catalogSharedService: CatalogSharedService
  ){}

  searchForm: FormGroup = this._formBuilder.group({
    Search: []
  });

  ngOnInit(): void {
    this.catalogSharedService.getFilters().subscribe( (filters: any) => {
      if(filters) {

      }
    });
  }

  clearSelection() {

  }

  applyFilters() {

  }

  onSearchInputChange(value: string): void {
  }
}
