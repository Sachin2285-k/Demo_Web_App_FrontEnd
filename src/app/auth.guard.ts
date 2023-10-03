import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  if (loginService.isAuthenticated()) {
    return true;
  } else {
    alert('You are not authorized');
    router.navigateByUrl('/login');
    return false;
  }
};
