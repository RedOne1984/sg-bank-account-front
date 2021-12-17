import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

@Injectable({providedIn: 'root'})
export class OperationsGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      return !!user.token;
    }
    return false;
  }
}
