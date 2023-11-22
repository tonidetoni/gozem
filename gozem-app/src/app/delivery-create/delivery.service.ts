import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Delivery } from './delivery';
import { environment } from '../../environments/environment';
import { Query } from '../package-create/package';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private url = `${environment.apiUrl}/delivery`;
  httpOptions = {
    withCredentials: true,
    observe: 'response' as 'response',
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  addDelivery(packageId: string): Observable<Delivery | HttpResponse<Delivery>> {
    return this.http
      .post<Delivery>(this.url, { package_id: packageId }, this.httpOptions)
      .pipe(catchError(this.handleError<Delivery>('add package', { message: 'bad request' })));
  }

  getAllDeliveries(query: Query): Observable<Delivery[]> {
    const params = new HttpParams({ fromObject: query });

    return this.http.get<Delivery[]>(this.url, { params }).pipe(catchError(this.handleError<Delivery[]>('get deliveries')));
  }

  getDelivery(id: string): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.url}/${id}`).pipe(catchError(this.handleError<Delivery>('get deliveries')));
  }

  getDeliveriesCount(): Observable<number> {
    const params = new HttpParams();
    params.set('count', true);
    return this.http.get<number>(`${this.url}?count=${true}`, { params }).pipe(catchError(this.handleError<number>('count deliveries')));
  }

  update(id: string, data: Partial<Delivery>): Observable<HttpResponse<Delivery>> {
    return this.http
      .put<Delivery>(`${this.url}/${id}`, data, this.httpOptions)
      .pipe(catchError(this.handleError<HttpResponse<Delivery>>('add package', { message: 'bad request' })));
  }
  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result);
    };
  }
}
