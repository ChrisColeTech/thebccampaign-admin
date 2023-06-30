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
    constructor(private http: HttpClient) {
        // Check if the token exists in local storage
        const token = localStorage.getItem('authToken');
        if (token) {
            this.authToken = token;
            this.authenticated = true;
        }
    }

    get isAuthenticated(): boolean {
        return this.authenticated;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post<any>(`${environment.apiUrl}/.netlify/functions/login`, { username, password }).pipe(
            map(response => {
                if (response.success) {
                    this.authenticated = true;
                    this.authToken = response.token;
                    // Save the token to local storage
                    localStorage.setItem('authToken', this.authToken);
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

    updateUser(user): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/.netlify/functions/update-user`, user).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

    deleteUser(user): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/.netlify/functions/delete-user`, user).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

    approveUser(user): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/.netlify/functions/approve-user`, user).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

    approveUsers(data): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/.netlify/functions/approve-users`, data).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

    deleteUsers(data): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/.netlify/functions/delete-users`, data).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }


    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/.netlify/functions/get-users`);
    }

    getUnapprovedUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/.netlify/functions/get-unapproved-users`);
    }

    getUser(ref): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/.netlify/functions/get-user`, ref).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }
}
