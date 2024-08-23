import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return headers;
  }
  private apiUrl = 'https://reqres.in/api/users';

  getData() {
    return this.http.get(`${this.apiUrl}/?page=1`, { headers: this.getHeaders() });
  }

  postData(data:any) {
    return this.http.post(`${this.apiUrl}/create`,data, { headers: this.getHeaders() });
  }
}
