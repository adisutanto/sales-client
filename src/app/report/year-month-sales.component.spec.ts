import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearMonthSalesComponent } from './year-month-sales.component';

describe('YearMonthSalesComponent', () => {
  let component: YearMonthSalesComponent;
  let fixture: ComponentFixture<YearMonthSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearMonthSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearMonthSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
