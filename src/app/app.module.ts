import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavBarComponent } from '../shared-resources/components/navbar/navbar.component';
import { MaterialModule } from '../shared-resources/material.module';
import { HttpInterceptorService } from '../shared-resources/services/http-interceptor.service';
import { PopupMessageComponent } from '../shared-resources/components/pop-up-message/popup-message.component';


@NgModule({
  declarations: [
    AppComponent, NavBarComponent, PopupMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireStorageModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  entryComponents: [PopupMessageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
