import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../api/auth.service';

export const loginGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isAuthenticated();

  if (!isLoggedIn) {
    return true;
  }

  // Redirect to dashboard
  return router.parseUrl('home/dashboard');
};
