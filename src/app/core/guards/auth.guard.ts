import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    // si no hay token, redirige al login
    window.location.href = '/';
    return false;
  }

  return true;
};
