import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    private apiServer = 'http://localhost:3000';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient) { }

    getTopSellingProducts(): Observable<ProductSales[]> {
        return this.httpClient.get<ProductSales[]>(this.apiServer + '/report/top-selling-products')
            .pipe(
                catchError(this.errorHandler)
            );
    }

    getSalesByMonth(): Observable<YearMonthSales[]> {
        return this.httpClient.get<YearMonthSales[]>(this.apiServer + '/report/sales-by-month')
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
