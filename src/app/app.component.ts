import { Component } from '@angular/core';
import {Title,Meta } from "@angular/platform-browser";
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { MetaService } from './seo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
	title = 'Welcome To Angular 7 Home Page';
	isCollapsed = true;
	
	
	constructor(private titleService: Title, 
	private ngxService: NgxUiLoaderService,
	private meta: Meta,
	private meta_service: MetaService) {
		//this.titleService.setTitle(this.title);
		this.meta_service.updateTitle();
		
		/*this.meta.updateTag({name: 'description', content: 'How to use Angular 7 meta service'});
		this.meta.updateTag({name: 'keywords', content: 'Angular, Meta Service'});
		this.meta.updateTag({name: 'author', content: 'angular 7 author'});
		this.meta.updateTag({name: 'viewport', content: 'width=device-width, initial-scale=1'});*/
		
		this.ngxService.start(); // start foreground loading with 'default' id
 
		// Stop the foreground loading after 5s
		setTimeout(() => {
		  this.ngxService.stop(); // stop foreground loading with 'default' id
		}, 2000);
	}
}
