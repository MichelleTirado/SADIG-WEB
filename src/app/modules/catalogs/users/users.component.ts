import { Component } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { UsersService } from '../services/users.service';
import { response } from 'express';
import { User } from '../../../../models/user';
import { TranslateService } from '@ngx-translate/core';
import { CatalogSharedService } from '../../../shared/catalog-shared.service';
import { SweetDialogs } from '../../../core/utils/sweet-dialogs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  showFilters: boolean = false;
  tableFilter: string = '';
  filters: any = {};

  columns: string[] = [];

  users: User[] = [];
  usersFiltering: User[] = [];
  

  constructor(
    private userService: UsersService,
    private translateService: TranslateService,
    private catalogSharedService: CatalogSharedService,
    private sweetDialogs: SweetDialogs,
    private sharedService: SharedService
  ) {
    this.translateService.setDefaultLang('es'); //Default language
    this.sharedService.pageName = 'Catálogo de Usuarios';
    this.sharedService.headerFooterVisible = true;
  }


  ngOnInit() {
    this.catalogSharedService.setShowFilters(false);
    this.catalogSharedService.showFilters$.subscribe(value => {
      this.showFilters = value;
    });

    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.catalogSharedService.getFilters().subscribe((value) => {
      this.getUsers(value);
      this.filters = value;
    })
  }

  getUsers(filters: any = {}): void {
    const columnsToExclude = ['employeeId'];
    const preferredOrder = ['employeePicture', 'employeePrefix', 'employeeName', 'employeePosition', 'employeeRegimen', 'employeeDirection', 'employeeArea', 'employeeAvailable'];

    this.userService.getUsers(filters).subscribe({
      next: (response) => {
        this.users = response;
        this.usersFiltering = [...this.users];

        if(this.users.length > 0) {
          this.columns = Object.keys(this.users[0]).filter(
            column => !columnsToExclude.includes(column)
          );

          this.columns = preferredOrder.filter(col => this.columns.includes(col));
          const remaining = this.columns.filter(col => !preferredOrder.includes(col));
          this.columns.push(...remaining);
        }
      }
    });
  }

  getFirebaseImageUrl(path: string): string {
    if (!path) return '';

    const firebaseBase = 'https://firebasestorage.googleapis.com/v0/b/secap-533fc.appspot.com/o/'
     return firebaseBase + path;
  }

  toggleFilters(): void {
    this.catalogSharedService.setShowFilters(!this.showFilters);
  }


  onSearchInputChange(value: string): void {
    const term = value.toLowerCase();

    this.usersFiltering = this.users.filter(item => {
      const employeeName = item.employeeName?.toLowerCase() || '';

      return employeeName.includes(term);
    });

    this.catalogSharedService.setFilterValue(value);
  }

  newRecord() {

  }
}
