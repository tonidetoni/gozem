import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {Login, User} from "./login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${environment.apiUrl}/auth`
  public authenticatedUser: User | null = null
  httpOptions = {
    withCredentials: true,
    observe: 'response' as 'response',
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(data: Login): Observable<any> {
    return this.http.post<string>(`${this.url}/login`, data, this.httpOptions).pipe(
      catchError(this.handleError<string>('login', ''))
    )
  }

  getAuthUser(): Observable<User> {
    return this.http.get<User>(`${this.url}/profile`).pipe(
      tap(user => {
        this.authenticatedUser = user
      }),
      catchError(this.handleError<User>('getUser'))
    )
  }

  logout() :Observable<void> {
    return this.http.post<void>(`${this.url}/logout`, {}).pipe(
      tap(user => {
        this.authenticatedUser = null
      }),
      catchError(this.handleError<void>('logout'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      console.log(`${operation} failed: ${error.message}`)
      return of(result as T);
    };
  }

}
