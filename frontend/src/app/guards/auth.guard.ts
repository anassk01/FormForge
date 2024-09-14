//frontend/guard/guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      if (!currentUser.isEmailVerified && currentUser.role !== 'admin') {
        this.router.navigate(['/request-verification-email'], { queryParams: { email: currentUser.email } });
         return false;
      }
      
      
      if (currentUser.requires2FA && !currentUser.twoFactorCompleted) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url, requires2FA: true } });
        return false;
      }

      // Check if the route requires admin role
      if (route.data['roles'] && route.data['roles'].indexOf(currentUser.role) === -1) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}