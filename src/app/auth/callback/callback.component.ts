import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-callback',
  template: `<p>Procesando login...</p>`,
})
export class CallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    const codeVerifier = localStorage.getItem('code_verifier');
    const clientId = '802dbde4bae04a4dbd072ba74541f257';

    if (!code || !codeVerifier) return;

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', 'http://127.0.0.1:4200/callback')
      .set('client_id', clientId)
      .set('code_verifier', codeVerifier);

    this.http
      .post('https://accounts.spotify.com/api/token', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('access_token', res.access_token);

          // 👉 Aquí hacemos la petición al perfil del usuario
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
            error: (err) => {
              console.error('Error al obtener usuario:', err);
            }
          });
        },
        error: (err) => console.error('Token error:', err),
      });
  }
}
