import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from './customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // TODO externalize config
  private apiServer = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  create(customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.apiServer + '/customers/', JSON.stringify(customer), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getById(id): Observable<Customer> {
    return this.httpClient.get<Customer>(this.apiServer + '/customers/' + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.apiServer + '/customers/')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id, customer): Observable<Customer> {
    return this.httpClient.put<Customer>(this.apiServer + '/customers/' + id, JSON.stringify(customer), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id) {
    return this.httpClient.delete<Customer>(this.apiServer + '/customers/' + id, this.httpOptions)
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
