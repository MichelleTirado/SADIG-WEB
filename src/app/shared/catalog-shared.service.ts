import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogSharedService {
  private filters = new BehaviorSubject<any>('');
  private filterValueSubject = new BehaviorSubject<string>('');
  private showFilterSubject = new BehaviorSubject<boolean>(false);

  showFilters$ = this.showFilterSubject.asObservable();

  setFilters(value: string): void {
    this.filters.next(value);
  }

  getFilters(): Observable<string> {
    return this.filters.asObservable();
  }

  setFilterValue(value: string): void {
    this.filterValueSubject.next(value);
  }

  getFilterValue(): Observable<string> {
    return this.filterValueSubject.asObservable();
  }

  setShowFilters(value: boolean): void {
    this.showFilterSubject.next(value);
  }
}
