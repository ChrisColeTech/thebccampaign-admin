import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    constructor(private http: HttpClient) { }
    createComment(comment: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/.netlify/functions/create-comment`, comment).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

    updateComment(id: string, comment: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/.netlify/functions/update-comment`, comment).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

    deleteComment(id: string): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/.netlify/functions/delete-comment`).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

    approveComment(id: string): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/.netlify/functions/approve-comment`, null).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

    getComments(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/.netlify/functions/get-comments`);
    }

    getApprovedComments(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/.netlify/functions/get-approved-comments`);
    }

    getUnapprovedComments(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/.netlify/functions/get-unapproved-comments`);
    }
}
