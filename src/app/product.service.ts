import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL= environment.PRODUCTS_API_URL;
  private productsUrl = this.API_URL + '/products'; 

  constructor( private http: HttpClient) { }

  /* GET products whose name contains search term */
  searchProducts(term: string, httpHeaderWithToken: HttpHeaders): Observable<Product[]> {
    const getHttpOptions = {
      headers: httpHeaderWithToken
    };
    if (!term.trim()) {
      // if not search term, return empty product array.
      return of([]);
    }
    return this.http.get<Product[]>(`${this.API_URL}/search?q=${term}`, getHttpOptions).pipe(
      tap(x => x.length ?
        console.log(`found products matching "${term}"`) :
        console.log(`no products matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
