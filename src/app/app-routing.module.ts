import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './commons/home/home.component'
import { LoginPageComponent } from './modules/authentication/pages/login/login-page.component';
import { UsersComponent } from './modules/catalogs/users/users.component';
import { CorrespondenceTypeComponent } from './modules/catalogs/correspondence-type/correspondence-type.component';
import { ShiftTypesComponent } from './modules/catalogs/shift-types/shift-types.component';
import { CorrespondenceControlFormGeneratorComponent } from './modules/correspondence-flow/correspondence-control-form-generator/correspondence-control-form-generator.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: 'security/users', component: UsersComponent },
  { path: 'security/correspondenceType', component: CorrespondenceTypeComponent },
  { path: 'security/shiftTypes', component: ShiftTypesComponent },
  { path: 'correspondence/controlFormGenerator', component: CorrespondenceControlFormGeneratorComponent },

  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
