import { NgtUniversalModule } from '@ng-toolkit/universal';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HashLocationStrategy, Location, LocationStrategy, CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
//import { ModalModule } from  'angular-custom-modal';

import { Select2Module } from 'ng2-select2';
import { NgSelectModule } from '@ng-select/ng-select';
import { NewAccordionComponent } from './new-accordion/new-accordion.component';

// Import the library
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    FooterComponent,
    NewAccordionComponent
  ],
  imports:[
	CommonModule,
	NgtUniversalModule,
	TransferHttpCacheModule,
	HttpClientModule,
 	//.withServerTransition({appId:'ng7-test'}),
	CommonModule,
	NgtUniversalModule,
	TransferHttpCacheModule,
	HttpClientModule,
	AppRoutingModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	NgbModule.forRoot(),
	//NgbModule,
	//Import NgxUiLoaderModule
	NgxUiLoaderModule,
	//ModalModule,
	Select2Module,
	NgSelectModule,
	BrowserAnimationsModule,
	ToastrModule.forRoot({
    timeOut: 3000,
    positionClass: 'toast-top-center',
    preventDuplicates: true,
  })
  ],
  //providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  providers: [],
  entryComponents: [
	AboutComponent
  ]
})
export class AppModule { }