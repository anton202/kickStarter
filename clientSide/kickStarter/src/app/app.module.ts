import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StartProjectComponent } from './start-project/start-project.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { FooterComponent } from './footer/footer.component';



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
  
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
