import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {Package, Query} from "./package";
import {Delivery} from "../delivery-create/delivery";

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private url = `${environment.apiUrl}/package`
  httpOptions = {
    withCredentials: true,
    observe: 'response' as 'response',
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  addPackage(data: Package): Observable<Package | HttpResponse<Package>> {
    console.log(data)
    return this.http.post<Package>(this.url, data, this.httpOptions).pipe(
      catchError(this.handleError<Package>('add package'))
    )
  }

  getAllPackages(query: Query): Observable<Package[]> {
    const params = new HttpParams({fromObject: query})

    return this.http.get<Package[]>(this.url, { params }).pipe(
      catchError(this.handleError<Package[]>('get packages'))
    )
  }

  getPackagesCount(): Observable<number> {
    const params = new HttpParams()
    params.set('count', true)
    return this.http.get<number>(`${this.url}?count=${true}`, { params }).pipe(
      catchError(this.handleError<number>('count packages'))
    )
  }

  getPackageDetails(id: string) {
    return this.http.get<Package>(`${this.url}/${id}`).pipe(catchError(this.handleError<Package>('get package')));
  }

  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<T> => {

      console.log(`${operation} failed: ${error.message}`)
      return of(result);
    };
  }
}
