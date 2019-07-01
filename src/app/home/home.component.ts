import { Component, OnInit } from '@angular/core';
import { Hero,Crue } from '../hero';
import { HEROES,CRUES } from '../mock-heroes';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
	h1Style: boolean = false;
	
	heroes = HEROES;
	selectedHero: Hero;

	crues	= CRUES;
	selectedCrue: Crue;
	//imageSrc = <any>require('./images/eceltic_logo.jpg');
	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}

	onSelectCrue(crue: Crue): void {
		this.selectedCrue = crue;
	}
	
	constructor() { }

	ngOnInit() {
	}
  
	myFocus() {
		this.h1Style = true;
	}
	
	myBlur() {
		this.h1Style = false;
	}

}