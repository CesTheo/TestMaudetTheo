import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Post } from './models/post';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  apiUrl = 'http://localhost:3000';

  constructor(public http: HttpClient, ){
    console.log('Datajson marche bien');
  }


  getPost() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/posts').subscribe(data => {
        resolve(data);}, 
        err => {
          console.log(err);
        });
      });
    }

}


export class RestProvider {

  apiUrl = 'http://localhost:3000';

  constructor(public http: HttpClient, ){
    console.log('Datajson marche bien');
  }


    PutPost(data) {
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'/posts', JSON.stringify(data)).subscribe(res => {
        resolve(res);
        }, (err) => {
        reject(err);
        });
        });
  }

}


export class ApiService {

  // API path
  base_path = 'http://localhost:3000/Posts';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  // Create a new item
  createItem(item): Observable<Post> {
    return this.http
      .post<Post>(this.base_path, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single Post data by ID
  getItem(id): Observable<Post> {
    return this.http
      .get<Post>(this.base_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get Posts data
  getList(): Observable<Post> {
    return this.http
      .get<Post>(this.base_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update item by id
  updateItem(id, item): Observable<Post> {
    return this.http
      .put<Post>(this.base_path + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<Post>(this.base_path + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}