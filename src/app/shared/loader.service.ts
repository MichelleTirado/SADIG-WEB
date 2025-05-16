import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();
  private activeRequests = 0;

  show(){
    this.activeRequests++;
    this.loadingSubject.next(true);
  }

  hide(){
    this.activeRequests--;
    if(this.activeRequests === 0){
      this.loadingSubject.next(false);
    }
  }
}
