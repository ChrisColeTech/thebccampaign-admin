import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private authenticated = false;
    private authToken: string | null = null;

    constructor(private http: HttpClient) { }

    get isAuthenticated(): boolean {
        return this.authenticated;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post<any>(`${environment.apiUrl}/.netlify/functions/login`, { username, password }).pipe(
            map(response => {
                if (response.success) {
                    this.authenticated = true;
                    this.authToken = response.token;
                    return true;
                } else {
                    throw new Error('Invalid username or password');
                }
            }),
            catchError(error => {
                return throwError(error);
            })
        );
    }

    createUser(user: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/.netlify/functions/create-user`, user).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

    updateUser(id: string, user: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/.netlify/functions/update-user`, user).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/.netlify/functions/delete-user`).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

    approveUser(id: string): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/.netlify/functions/approve-user`, null).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }
}
