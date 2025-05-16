import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  setTitle: string = '';
  headerFooterVisible = true;
  menuVisible = true;
}
