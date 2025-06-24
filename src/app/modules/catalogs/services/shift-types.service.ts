import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { shiftType } from '../../../../models/shiftType';

@Injectable({
  providedIn: 'root'
})
export class ShiftTypesService {

  private urlApi = environment.apiUrl;
  
  constructor(
    private http: HttpClient
  ) { }

  getShiftTypes(){
    return this.http.get<shiftType[]>(this.urlApi + '/ShiftTypes/GetShiftTypes');
  }
}
