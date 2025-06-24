import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { correspondeceType } from '../../../../models/correspondenceType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceTypesService {

  private urlApi = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  //GET:
  getCorrespondenceTypes(filters: any): Observable<correspondeceType[]> {
    let params = new HttpParams({ fromObject: filters });
    return this.http.get<correspondeceType[]>(`${this.urlApi}/CorrespondenceTypes/GetCorrespondenceTypes`, { params });
  }

  //POST
  createCorrespondenceType(formData: FormData): Observable<any> {
    console.log('data - service: ', formData);
    return this.http.post(this.urlApi + '/CorrespondenceTypes/AddCorrespondenceType', formData);
  }
}
