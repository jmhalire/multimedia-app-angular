import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./auth.guard";

import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { InitiationComponent } from './components/initiation/initiation.component';
import { FilesComponent } from "./components/files/files.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ListfilesComponent } from "./components/files/listfiles/listfiles.component";
import { UploadfileComponent } from './components/files/uploadfile/uploadfile.component';

//APIs
import { ApiweatherComponent } from "./components/apiweather/apiweather.component";



const routes: Routes = [
  { path: '', component: InitiationComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'files', component: FilesComponent, canActivate: [AuthGuard], children:[
      { path: 'upload', component: UploadfileComponent, canActivate: [AuthGuard]},
      { path: 'video', component: ListfilesComponent, canActivate: [AuthGuard] },
      { path: 'image', component: ListfilesComponent, canActivate: [AuthGuard] },
      { path: 'audio', component: ListfilesComponent, canActivate: [AuthGuard] },
      { path: 'pdf', component: ListfilesComponent, canActivate: [AuthGuard] },
      { path: 'other', component: ListfilesComponent, canActivate: [AuthGuard] },
    ]  
  },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'api/weather', component: ApiweatherComponent },
  //{ path: '**',redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
