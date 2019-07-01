import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NewAccordionComponent } from './new-accordion/new-accordion.component';

const routes: Routes = [
  { 
	  path: '', 
	  component: HomeComponent,
	  data: {
      title: 'Home Angular',
      description:'Description Meta Tag for home'
    }
  },
  { 
	  path: 'about', 
	  component: AboutComponent,
	  data: {
      title: 'About Us',
      description:'Description Meta Tag Content'
    }
  },
  { 
    path: 'contact', 
    component: ContactComponent,
    data: {
      title: 'Contact Us',
      description:'Description Meta Tag Content'
    } 
  },
  { path: 'contact', redirectTo: 'contact',pathMatch: 'full' },
  { path: 'accordion', component: NewAccordionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }