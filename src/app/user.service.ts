import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  $authenticationState: any;
  extractData: any;
  user: any;
  user$: Observable<void>;

  private API_URL= environment.USERS_API_URL;
  private usersUrl = this.API_URL + '/users'; 


  constructor(private http: HttpClient) { }

  addUser(body): Observable<HttpResponse<Response>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      observe: 'response' as const
    };
    return this.http.post<Response>(this.usersUrl, body, httpOptions)
      .pipe(
        catchError(this.handleError('addUser', body))
      );
  }



  getUser(httpHeaderWithToken: HttpHeaders): Observable<any> {
    console.log("Intentando solicitar user info con headers " + httpHeaderWithToken);
    const getHttpOptions = {
      headers: httpHeaderWithToken
    };
    return this.http.get(`${this.usersUrl}/me`, getHttpOptions).pipe(
      tap(x => x ?
        console.log(`found user matching`) :
        console.log(`no user matching`)),
      catchError(this.handleError<User>('getUser', this.user))
    );
  }

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