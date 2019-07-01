import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild, OnDestroy } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { NgbCarouselConfig,NgbCarousel,NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Observable, Subject, merge, Subscription, interval, timer } from 'rxjs';

//import 'rxjs/add/observable/interval';
//import 'rxjs/add/operator/map';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html', 
  styleUrls: ['./about.component.scss'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class AboutComponent implements OnInit, OnDestroy {
	public exampleData: Array<Select2OptionData>;
	public imageSrc: any;
	public images: any[] = [];
	public image_arr: any[]	=[];
	
	showNavigationArrows = false;
	showNavigationIndicators = false;
	new_images = [1, 2, 3, 4, 5].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
	closeResult: string;
	
	time: Date;
	timeSub: Subscription;

	@ViewChild('myCarousel') myCarousel: NgbCarousel;
	
	constructor(config: NgbCarouselConfig, 
	private _http: HttpClient,
	private modalService: NgbModal) {
		// customize default values of carousels used by this component tree
		//config.showNavigationArrows = false;
		//config.showNavigationIndicators = true;
		config.wrap	=true;
		config.keyboard	=false;
		config.pauseOnHover = false;
	}

	naviGateCarousel(){
		this.myCarousel.select('item_4');
	}
	
	open(content) {
		this.modalService.open(content, {
			ariaLabelledBy: 'modal-basic-title',
			size: 'sm',
			backdrop: 'static',
			keyboard  : false,
			centered: true}).result.then((result) => {
		  this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}
	
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
		  return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
		  return 'by clicking on a backdrop';
		} else {
		  return  `with: ${reason}`;
		}
	}

	ngOnInit() {
		interval(1000).subscribe(
         (value: any) => {
           //this.time = new Date();
		   this.time = value;
         },
         (error: any) => {
           console.log('error');
         },
         () => {
           console.log('observable completed !');
         }
       );
		
		console.log(this.new_images[0]);
		this.exampleData = [
			{
				id: 'basic1',
				text: 'Basic 1'
		  },
		  {
				id: 'basic2',
				disabled: true,
				text: 'Basic 2'
		  },
		  {
				id: 'basic3',
				text: 'Basic 3'
		  },
		  {
				id: 'basic4',
				text: 'Basic 4'
		  }
		];

		this.image_arr = [
			{
				id: 'item_1',
				text: 'https://i.ytimg.com/vi/PCwL3-hkKrg/maxresdefault.jpg'
			},
			{
				id: 'item_2',
				text: 'http://laposadademorfeo.com/wp-content/uploads/2014/05/therapeutic-nature.jpg'
			},
			{
				id: 'item_3',
				text: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBiVplR-sKBhscJyYa3MRma4q5QqDXW1SQPuBYo9j8H0KSIREO'
			},
			{
				id: 'item_4',
				text: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFnZHmASew_8VVe1kjXFTQXqkHka-Q_x3OET5SKnu30WEPzaPy'
			}
		];
	}
	
	onClickMe(){
		
	}
	
	ngOnDestroy() {
		this.timeSub.unsubscribe();
	}
}