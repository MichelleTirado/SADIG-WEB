import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlApi = environment.apiSECAP;

  constructor(
     private http: HttpClient
  ) { }

  getUsers(filters: any): Observable<User[]> {
    let params = new HttpParams({ fromObject: filters });

    return this.http.get<User[]>(`${this.urlApi}/empleados/generalInformation`, { params });
  }
}
