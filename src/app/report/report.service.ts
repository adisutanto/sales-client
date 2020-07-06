import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductSales } from './product-sales';
import { YearMonthSales } from './year-month-sales';


@Injectable({
    providedIn: 'root'
})
export class ReportService {
    // TODO externalize config
    private reportUrl = 'http://localhost:8080/report';
    private countriesUrl = 'http://localhost:8080/customers/countries';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    getTopSellingProducts(country: string): Observable<ProductSales[]> {
        let params = new HttpParams();
        if (country) {
            params = params.set('country', country);
        }
        return this.http.get<ProductSales[]>(this.reportUrl + '/top-selling-products', { params })
            .pipe(
                catchError(this.errorHandler)
            );
    }

    getSalesByMonth(country: string): Observable<YearMonthSales[]> {
        let params = new HttpParams();
        if (country) {
            params = params.set('country', country);
        }
        return this.http.get<YearMonthSales[]>(this.reportUrl + '/sales-by-month', { params })
            .pipe(
                catchError(this.errorHandler)
            );
    }

    getCountries(): Observable<string[]> {
        return this.http.get<string[]>(this.countriesUrl)
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
