import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from './customer';
import { CustomerResponse } from './customer-response';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // TODO externalize config
  private customersUrl = 'http://localhost:8080/customers/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  create(customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, customer, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getById(id): Observable<Customer> {
    return this.http.get<Customer>(this.customersUrl + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAll(): Observable<Customer[]> {
    return this.http.get<CustomerResponse>(this.customersUrl)
      .pipe(
        map(response => response._embedded.customers),
        catchError(this.errorHandler)
      );
  }

  update(id, customer): Observable<Customer> {
    return this.http.put<Customer>(this.customersUrl + id, customer, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id) {
    return this.http.delete<Customer>(this.customersUrl + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
