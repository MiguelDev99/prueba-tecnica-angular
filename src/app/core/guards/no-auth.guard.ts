import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = () => {
  const token = localStorage.getItem('access_token');
  const router = inject(Router);

  if (token) {
    router.navigate(['/search']);
    return false;
  }

  return true;
};
