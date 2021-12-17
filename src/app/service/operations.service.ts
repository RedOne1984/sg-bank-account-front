import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Operation} from '../model/operation.model';

@Injectable({providedIn: 'root'})
export class OperationsService {
  constructor(
    private http: HttpClient
  ) {
  }

  postOperation(accountId: string, amount: number): Observable<Response> {
    return this.http.post<Response>(`${environment.apiUrl}/api/operations`, { accountId: accountId, operationAmount: amount })
      .pipe(map(response => {
        return response;
      }));
  }

  getOperationByAccount(accountId: string): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${environment.apiUrl}/api/operations?accountId=` + accountId)
      .pipe(map(response => {
        return response;
      }));
  }
}
