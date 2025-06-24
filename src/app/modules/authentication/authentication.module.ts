import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginPageComponent } from './pages/login/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent
  ],
  imports: [
    
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
  ]
})
export class AuthenticationModule { }

