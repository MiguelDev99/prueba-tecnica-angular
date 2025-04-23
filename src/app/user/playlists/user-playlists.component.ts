import { Component } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify.service';
import { CommonModule, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-user-playlists',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './user-playlists.component.html',
})
export class UserPlaylistsComponent {
  playlists: any[] = [];
  loading = true;
  error = false;

  constructor(private spotify: SpotifyService) {
    this.spotify.getUserPlaylists().subscribe({
      next: (res: any) => {
        this.playlists = res.items ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener playlists:', err);
        this.error = true;
        this.loading = false;
      },
    });
  }
}
