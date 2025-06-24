import { Component } from '@angular/core';
import { LoaderService } from './shared/loader.service';
import { SharedService } from './shared/shared.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './core/utils/route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'SADIG';
  loading$ = this.loaderService.loading$;
  
  constructor(
    protected loaderService: LoaderService,
    public sharedService: SharedService
  ){}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
