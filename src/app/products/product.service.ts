import { Injectable } from '@angular/core';
import { Product } from './product.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { delay, tap, catchError, shareReplay } from "rxjs/operators";
import { delayedRetry } from '@app/delayedRetry.operator';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'http://storerestservice.azurewebsites.net/api/products/';

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }

  insertProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  private handleError(error: HttpErrorResponse) {
    // in a real world app, you may send the error to the server using some remote logging infrastructure
    // instead of just logging it to the console
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMsg = 'An error occurred:' + error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMsg = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errorMsg);
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  products$: Observable<Product[]>;

  loadProducts() {
    this.products$ =
      this
        .http
        .get<Product[]>(this.baseUrl)
        .pipe(
          delay(200),
          tap(() => console.groupCollapsed("Products")),
          tap(console.table),
          tap(() => console.groupEnd),
          delayedRetry(1000, 3),
          shareReplay(),
          catchError(this.handleError)
        );
  }


}
