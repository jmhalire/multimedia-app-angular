import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AuthGuard } from "./auth.guard";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// services
import { AuthService } from "./services/auth.service";
import { FilesService } from "./services/files.service";
import { TokenInterseptorService } from "./services/token-interseptor.service";
import { ApiService } from "./services/api.service";

// components
import { AppComponent } from './app.component';
import { InitiationComponent } from './components/initiation/initiation.component';
import { HeaderComponent } from "./components/header/header.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { ListfilesComponent } from "./components/files/listfiles/listfiles.component";
import { ViewfilesComponent } from './components/files/listfiles/viewfiles/viewfiles.component';
import { ClockComponent } from './components/clock/clock.component';
import { FilesComponent } from "./components/files/files.component";
import { UploadfileComponent } from './components/files/uploadfile/uploadfile.component';
import { ApiweatherComponent } from "./components/apiweather/apiweather.component";
import { WeatherComponent } from './components/apiweather/weather/weather.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    InitiationComponent,
    ListfilesComponent,
    ViewfilesComponent,
    ClockComponent,
    FilesComponent,
    UploadfileComponent,
    ApiweatherComponent,
    WeatherComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports:[
  ],

  providers: [AuthService,FilesService,ApiService,AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
