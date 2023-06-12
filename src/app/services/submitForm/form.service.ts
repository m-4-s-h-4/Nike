import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  submitOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order, { responseType: 'text' });
  }
}
