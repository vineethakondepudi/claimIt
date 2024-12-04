import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable, throwError } from 'rxjs'; // Import Observable
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private loginApi = "http://172.17.12.38:8081/api/users/login"; // Set the API endpoint
  private searchApi = 'http://172.17.12.38:8081/api/users/search';

  constructor(private http: HttpClient) { }

  // Login method that accepts email and password
  login(email: string): Observable<any> {
    console.log(email, 'emaildata')
    const loginData = { email };
    return this.http.post<any>(this.loginApi, loginData).pipe(
      catchError((error) => {
        // Handle the error and return it as an observable
        console.error('Login API error: ', error);
        return throwError(() => new Error('Login failed. Please try again later.'));
      })
    );
  }
  searchItems(query: string): Observable<any> {
    return this.http.get(`${this.searchApi}?query=${query}`);
    }
}