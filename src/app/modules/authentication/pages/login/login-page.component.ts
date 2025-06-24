import { Component } from '@angular/core';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(
    private sharedService: SharedService
  ){
    this.sharedService.setTitle = 'Inicio de sesión',
    this.sharedService.headerFooterVisible = false;
  }

  ngOnInit(): void {
    console.log('Login page loaded');
  }
}
