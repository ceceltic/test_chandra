import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import {Title, Meta} from "@angular/platform-browser";

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, merge, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, filter,switchMap, catchError } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../helpers/must-match.validator';

import {NgbDatepickerConfig, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from "../service/ngb-date-formatter";

import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';

import city_data from './json/city_data.json';
import vehicle_data from './json/vehicle_data.json';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss'],
	providers: [{provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]
})

export class ContactComponent implements OnInit {
	public state_model:any;

	@ViewChild('instance') instance: NgbTypeahead;
  	focus$ = new Subject<string>();
  	click$ = new Subject<string>();

	search = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map(term => (term === '' ? states
			: states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
		);
	}

	search_type_ahead = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map(term => (term === '' ? vehicle_data
			: vehicle_data.filter(v => v.text.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
		);
	}

	resultFormatBandListValue(value: any) {            
		return value.text;
	} 
	/**
	* Initially binds the string value and then after selecting
	* an item by checking either for string or key/value object.
	*/
	inputFormatBandListValue(value: any)   {
		if(value.text)
			return value.text;
		return value;
	}

	@ViewChild('city_select') select: NgSelectComponent;
	hobbie: boolean = true;
	loop: boolean = false;
	registerForm: FormGroup;
	submitted = false;
	fname: String;
	title = 'Welcome To Angular 7 Contact';

	displayMonths = 2;
	navigation = 'select';
	showWeekNumbers = false;
	outsideDays = 'visible';
	
	model: NgbDateStruct;
	today= new Date();
	jstoday = {'year':this.today.getFullYear(),'month':this.today.getMonth(),'day':this.today.getDate()};
	
	cities = [
		{id: 1, name: 'Vilnius'},
		{id: 2, name: 'Kaunas', selected:true},
		{id: 3, name: 'Pavilnys'},
		{id: 4, name: 'Pabradė'},
		{id: 5, name: 'Klaipėda'},
		{id: 1, name: 'Vilnius'},
		{id: 2, name: 'Kaunas'},
		{id: 3, name: 'Pavilnys'},
		{id: 4, name: 'Pabradė'},
		{id: 5, name: 'Klaipėda'},
		{id: 1, name: 'Vilnius'},
		{id: 2, name: 'Kaunas',},
		{id: 3, name: 'Pavilnys'},
		{id: 4, name: 'Pabradė'},
		{id: 5, name: 'Klaipėda'},
		{id: 1, name: 'Vilnius'},
		{id: 2, name: 'Kaunas',},
		{id: 3, name: 'Pavilnys'},
		{id: 4, name: 'Pabradė'},
		{id: 5, name: 'Klaipėda'},
		{id: 1, name: 'Vilnius'},
		{id: 2, name: 'Kaunas'},
		{id: 3, name: 'Pavilnys'},
		{id: 4, name: 'Pabradė'},
		{id: 5, name: 'Klaipėda'}
	];
	selectedCity:String;

	constructor(
	private formBuilder: FormBuilder,
	private http: HttpClient,
	private titleService: Title,
	private meta: Meta,
	config: NgbDatepickerConfig, 
	calendar: NgbCalendar,
	private toastr: ToastrService
	) {
		this.titleService.setTitle(this.title);
		
		/*this.meta.addTags([
		  {name: 'description', content: 'How to use Angular 7 meta service'},
		  {name: 'author', content: 'talkingdotnet'},
		  {name: 'keywords', content: 'Angular, Meta Service'},
		  {name: 'viewport', content: 'width=device-width, initial-scale=1'}
		]);*/
		
		this.meta.updateTag({name: 'description', content: 'How to use Angular 7 meta service'});
		this.meta.updateTag({name: 'keywords', content: 'Angular, Meta Service'});
		this.meta.updateTag({name: 'author', content: 'angular 7 author'});
		this.meta.updateTag({name: 'viewport', content: 'width=device-width, initial-scale=1'});
		
		this.fname	= "";

		// days that don't belong to current month are not visible
		config.outsideDays = 'hidden';
		// customize default values of datepickers used by this component tree
		config.minDate = {year: 2019, month: 4, day: 10};
		config.maxDate = {year: 2099, month: 12, day: 31};
		config.showWeekNumbers=true;

		if(calendar.getToday)
			console.log('Yes');
		else
			console.log('No');
	}

	typeahead_sel(item){
		console.log(item.item.text);
		//console.log(city_data);
	}

	ngOnInit() {
		
		/*this.seo.generateTags({
			title: 'Contact Page', 
			description: 'Contact me through this awesome search engine optimized Angular component', 
			image: 'https://instafire-app.firebaseapp.com/assets/meerkat.jpeg'
		})*/
	
		this.registerForm = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', Validators.required],
			dp:[this.jstoday, Validators.required],
			newdp:['', Validators.required],
			hobbie:[this.hobbie, Validators.required]
		}, {
			validator: [MustMatch('password', 'confirmPassword'),MustMatch('firstName', 'lastName')]
		});
	}
	
	getCity(evt:any){
		console.log(evt.name);
	}
	
	onSelect(evt:any){
		console.log(evt.year);
	}
	
	// convenience getter for easy access to form fields
	get f() { return this.registerForm.controls; }
	
	setOpen = () =>{
		this.select.open();
		//this.select.bindValue=this.cities[0].name;
		this.selectedCity='Vilnius';
		this.toastr.success('Hello world!', 'Toastr fun!');
	}
	
	setClose = () =>{
		this.select.close();
	}
	
	setFocus = () =>{
		this.select.focus();
	}

	onSubmit() {
		this.submitted = true;
		console.log(this.registerForm.value);
				
		//let headers = new HttpHeaders();
		//headers.append('Content-Type','application/json');
	
		var contactt = '{"vehicle":{"isVehicleNew":true,"idv":0,"mainCode":"1213810804","licensePlate":"GA06AH1234","vehicleIdentificationNumber":"DFGHJ34567678","engineNumber":"FDHBGH567876","permitAgency":"GA06","manufactureDate":"2018-09-01","initialRegistrationDate":"2018-09-14","hypothecation":{"isHypothecation":false,"hypothecationAgency":"","hypothecationCIty":"P"}},"previousInsurer":{"previousInsurerCode":"","previousInsurerPolicyExpiryDate":"","claimInLastYear":false,"previousNoClaimBonus":"ZERO","previousInsurerPolicyNumber":""},"contract":{"insuranceProductCode":"20201","startDate":"2018-10-05","endDate":"2019-10-04","term":1,"salesChannel":"ABSA","coverages":{"baseCover":{"thirdPartyLiabilityCover":{"selection":true,"insuredAmount":30000},"ownDamageCover":{"selection":false,"plan":"PLAN_D","insuredAmount":30000},"theftCover":{"selection":false},"fireCover":{"selection":false}},"addOnCover":{"partsDepreciationCover":{"selection":false,"plan":"PLAN_E","numberOfClaimsCovered":"ONE","coPay":0},"engineAndGearBoxProtectionCover":{"selection":false},"consumableCover":{"selection":false},"breakdownAssistanceCover":{"selection":false,"plan":"PLAN_C"},"ncbProtectionCover":{"selection":false},"returnToInvoiceCover":{"selection":false,"coPay":0}},"additionalCover":{"otherDriverCover":{"selection":false},"paUnnamedPersonCover":{"selection":false,"insuredAmount":1500000.0},"paOwnerDriverCover":{"selection":true,"insuredAmount":200000.0}},"accessoriesCover":{"electricalCover":{"selection":false,"insuredAmount":0.0},"nonElectricalCover":{"selection":false,"insuredAmount":0.0},"cngCover":{"selection":false,"insuredAmount":0.0}}},"voluntaryDeductible":"ZERO"},"person":{"gender":"MALE","firstName":"SHER SINGH","lastName":"OLAHAN","dateOfBirth":"1987-09-10","personType":"NATURALPERSON","communication":{"mobile":"9971489077","email":"SHER.SINGH@BINARYSEMANTICS.COM"},"address":{"addressType":"R","houseNumber":"","street":"GHSVFKJDFNV CVJKBNCVN BVKMNVBJKB KJBN","area":"KARNATAKA","city":"BANGALORE","state":"KARNATAKA","country":"IN","pin":"403802"}},"nominee":{"nomineeName":"HAPPY SINGH","nomineeRelation":"HEAD","dateOfBirth":"1990-09-14","appointeeName":null,"appointeeRelation":null},"enquiryId":"BYR14091899300","security":{"webUserId":"44242619","password":"digit123"}}';
		
		const headerDict = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin, Authorization',
			'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
		}

	
		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}
	
		//console.log(this.registerForm.value);
		//console.log(this.registerForm.value.firstName);
	
		/*this.http.post('https://my-json-server.typicode.com/typicode/demo/posts/1','')
		// http://damienkeoghassociates.ecelticgroup.com/cross.php
		.subscribe((res: Response) => {
				console.log(res);
				//this.result = JSON.stringify(res.json());
		// JSON.stringify(this.registerForm.value)
		}, error => {
				console.log(error);
				//this.errorFromSubscribe = error;
		});*/
		// https://preprod-qnb.godigit.com/motorinsurance/services/contract/quote
	
		this.http.post('https://www.gibl.in/ang_test/cross.php', contactt)
			.subscribe(
			(res:Response) => {
				console.log(res);
			},
			error => {
				console.log(error);
				//this.errorFromSubscribe = error;
			}
		);
		this.registerForm.reset();
	}
	
	/*addProduct (product): Observable<any> {
		alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
		return "ggg";
		return this.http.post<any>(endpoint + 'products', JSON.stringify(product), httpOptions).pipe(
			tap((product) => console.log(`added product w/ id=${product.id}`)),
			catchError(this.handleError<any>('addProduct'))
		);
	}*/
}