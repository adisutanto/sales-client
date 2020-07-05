import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopSellingProductsComponent } from './report/top-selling-products.component';
import { YearMonthSalesComponent } from './report/year-month-sales.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    DashboardComponent,
    TopSellingProductsComponent,
    YearMonthSalesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
