import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Account} from '../model/account.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AccountService {
  constructor(
    private http: HttpClient
  ) {
  }

  getAccounts(): Observable<Account[]> {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return this.http.get<Account[]>(`${environment.apiUrl}/api/clients/` + user.userId + `/accounts`);
  }
}
