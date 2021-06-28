import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';
import { MainmenuComponent } from './navigation/mainmenu/mainmenu.component';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserlistComponent } from './navigation/userlist/userlist.component';
import { HomeComponent } from './navigation/home/home.component';
import { ChangepComponent } from './navigation/changep/changep.component';
import { EdituserComponent } from './navigation/userlist/edituser/edituser.component';
import { AdduserComponent } from './navigation/userlist/adduser/adduser.component';

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
    UserlistComponent,
    HomeComponent,
    ChangepComponent,
    EdituserComponent,
    AdduserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    LoginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
