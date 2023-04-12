import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { checkAuthState } from './check-auth-state'; // Hier wird die checkAuthState-Funktion importiert

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AngularFireAuth, public router: Router){}

  async canActivate(
    route?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot): Promise<boolean | UrlTree> {
      const isAuthenticated = await checkAuthState(this.authService); // Hier wird die checkAuthState-Funktion aufgerufen
      if (!isAuthenticated) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}

export function authGuardFactory(authGuard: AuthGuard) {
  return () => authGuard.canActivate();
}
