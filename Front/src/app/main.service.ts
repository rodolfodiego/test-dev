import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  emitData(data) {
    this.observer.next(data);
  }
  getPolls(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/getpolls`);
  }

  sendVote(poll, option): Observable<any> {
    const request = {
      pollsId: poll,
      optionId: option,
    };
    console.log(request);
    //return;
    return this.http.post<any>(`${environment.api_url}/sendvote`, request);
  }
}
