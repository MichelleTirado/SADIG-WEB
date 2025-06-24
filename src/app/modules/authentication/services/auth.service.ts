import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;
  private apiSECAP = environment.apiSECAP;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }

  login(curp: string, password: string): Observable<any> {
    const body = { username: curp, password };

    return this.http.post(`${this.apiSECAP}/auth/login`, body);
  }


  // isAuth(): boolean {
  //   const token = localStorage.getItem('AuthToken') || null;
  //   if(!token) {
  //     return false;
  //   }

  //   const isExpired = this.jwtHelper.isTokenExpired(token);

  //   if(isExpired) {
  //     return false;
  //   }

  //   return true;
  // }

  // async decodeToken(): Promise<any> {
  //   const token = localStorage.getItem('AuthToken');

  //   if(token) {
  //     return jwtDecode(token);
  //   }
  //   return null;
  // }


  getUserPermissions(): Observable<any> {
    const role = localStorage.getItem('Role') || "0";

    return this.http.get(`${this.apiUrl}roles/rolePermissions/${role}`);
  }

  getFirebaseImageUrl(path: string): string {
    if (!path) return '';
    const firebaseBase = 'https://firebasestorage.googleapis.com/v0/b/secap-533fc.appspot.com/o/'
    return firebaseBase + path;
  }
}
