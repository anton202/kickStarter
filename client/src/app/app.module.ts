import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ServerService } from './server.service';
import {IsLogedGuard } from './is-loged.guard';
import { StatsService } from './stats.service';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StartProjectComponent } from './start-project/start-project.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';



const routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'sign-in', component: SignInComponent},
  { path: 'user', component: UserComponent,canActivate:[IsLogedGuard]},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'start-project', component: StartProjectComponent, canActivate:[IsLogedGuard]},
  { path: 'view-all/:category', component: ViewAllComponent },
  { path: 'view-project/:id', component: ViewProjectComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SignInComponent,
    SignUpComponent,
    StartProjectComponent,
    ViewAllComponent,
    ViewProjectComponent,
    FooterComponent,
    UserComponent

  ],
  imports: [
    BrowserModule,FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),FormsModule,
    RouterModule.forRoot(routes),HttpModule
  ],
  providers: [ServerService,IsLogedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
