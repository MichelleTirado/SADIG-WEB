import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './commons/footer/footer.component';
import { HeaderComponent } from './commons/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './commons/home/home.component';
import { SiteInfoComponent } from './commons/site-info/site-info.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { UsersComponent } from './modules/catalogs/users/users.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CorrespondenceTypeComponent } from './modules/catalogs/correspondence-type/correspondence-type.component';
import { ShiftTypesComponent } from './modules/catalogs/shift-types/shift-types.component';
import { CatalogFilterComponent } from './commons/catalog-filter/catalog-filter.component';
import { LoaderComponent } from './commons/loader/loader.component';
import { CorrespondenceControlFormGeneratorComponent } from './modules/correspondence-flow/correspondence-control-form-generator/correspondence-control-form-generator.component';
import { MatTabsModule } from '@angular/material/tabs';

export function tokenGetter() {
  if(typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('token');
  }

  return null;
  
}

export function HttpLoaderFactory(http: HttpClient) {
 return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    SiteInfoComponent,
    UsersComponent,
    CorrespondenceTypeComponent,
    ShiftTypesComponent,
    CatalogFilterComponent,
    LoaderComponent,
    CorrespondenceControlFormGeneratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    MatTabsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['http://localhost:5148'],
        disallowedRoutes: []
      }
    }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
