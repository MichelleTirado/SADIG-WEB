import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-site-info',
  templateUrl: './site-info.component.html',
  styleUrl: './site-info.component.scss'
})
export class SiteInfoComponent {
  constructor(
    public sharedService: SharedService
  ){}
}
