import { Component } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { SpotifyService } from '../../core/services/spotify.service';

@Component({
  selector: 'app-public-playlists',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './public-playlists.component.html',
})
export class PublicPlaylistsComponent {
  playlists: any[] = [];
  loading = true;
  error = false;

  constructor(private spotify: SpotifyService) {
    this.spotify.getPlaylistsByUser('spotify').subscribe({
      next: (res: any) => {
        this.playlists = res.items ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener playlists públicas:', err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  follow(playlistId: string) {
    this.spotify.followPlaylist(playlistId).subscribe({
      next: () => {
        alert('Seguiste la playlist con éxito 🎉');
      },
      error: (err) => {
        console.error('Error al seguir playlist:', err);
        alert('Ocurrió un error al seguir la playlist');
      },
    });
  }
}
