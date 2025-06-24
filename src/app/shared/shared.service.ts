import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  pageName: string = '';
  setTitle: string = '';
  headerFooterVisible: boolean = true;
  menuVisible = true;
}
