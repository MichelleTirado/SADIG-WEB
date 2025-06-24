import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { SweetDialogs } from '../../../../core/utils/sweet-dialogs';
import { error } from 'console';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  title = 'Login';

  // *********
  showPassword: boolean = false; // Variable to show/hide password

  // Reactive forms
  loginForm!: FormGroup;

  message: string = '';
  token: string = '';


  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private gobDialog: SweetDialogs
  ) {

    this.loginForm = this._formBuilder.group({
      curp: ['', Validators.required, Validators.minLength(18), Validators.maxLength(18)],
      password: ['', Validators.required]
    });

  }


  loginHandler(): void {

    if(this.loginForm.invalid) {
      this.message = 'Por favor, completa el formulario correctamente.'
      return;
    }

    const curp = this.loginForm.controls['curp'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.login(curp, password).subscribe({
      next: (response) => {
        localStorage.setItem('AuthToken', response.access_token);
        this.router.navigate(['/home']);
      }
    });
  }
}
