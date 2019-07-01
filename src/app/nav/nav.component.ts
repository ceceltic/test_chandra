import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
	
	appTitle: string = 'GIBL APP';
	isCollapsed = true;
	head_menu: JSON;
	
	header_menu_item: any	= { "menu_item": [ 
			{ "name" : "Home", "link" : "/"} ,
			{ "name" : "About", "link" : "", 
				"sub_menu" : [
					{"name" : "About One", "link" : "/about"},
				]
			} ,
			{ "name" : "Contact Us", "link" : "/contact"}
		] 
	};

	constructor() { }

	ngOnInit() {
		this.head_menu = <JSON>this.header_menu_item;
		/*console.log(this.obj);
		this.obj.forEach(el => {
			console.log(el);
		});*/
	}

}
