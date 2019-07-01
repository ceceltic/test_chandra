import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccordionComponent } from './new-accordion.component';

describe('NewAccordionComponent', () => {
  let component: NewAccordionComponent;
  let fixture: ComponentFixture<NewAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
