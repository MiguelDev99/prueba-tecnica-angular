import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-callback',
  template: `<p>Procesando login...</p>`,
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
  
    if (code) {
      this.auth.handleCallback(code).subscribe({
        next: (res: any) => {
          this.http.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
            },
          }).subscribe({
            next: (user) => {
              console.log('Usuario autenticado:', user);
              alert(`¡Bienvenido ${(user as any).display_name}!`);
              this.router.navigate(['/search']);
            },
            error: (err) => console.error('Error al obtener usuario:', err),
          });
        },
        error: (err) => console.error('Token error:', err),
      });      
    }
  }
  
}
