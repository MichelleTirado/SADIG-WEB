import { Component } from '@angular/core';
import { LoaderService } from './shared/loader.service';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SADIG';
  loading$ = this.loaderService.loading$;
  
  constructor(
    protected loaderService: LoaderService,
    public sharedService: SharedService
  ){}
}
