import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [NgIf],
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
  userName: string | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');

    if (code) {
      console.log('Código recibido:', code);
      this.auth.handleCallback(code).subscribe({
        next: (res: any) => {
          this.http.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
            },
          }).subscribe({
            next: (user: any) => {
              this.userName = user.display_name;
              this.loading = false;
            },
            error: (err) => console.error('Error al obtener usuario:', err),
          });
        },
        error: (err) => console.error('Token error:', err),
      });
    }
    
  }
  goToSearch() {
    this.router.navigate(['/search']);
  }  
}
