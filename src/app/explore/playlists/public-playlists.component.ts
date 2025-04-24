import { Component, ViewChild } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { SpotifyService } from '../../core/services/spotify.service';
import { RouterLink } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-public-playlists',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, RouterLink, ToastComponent],
  templateUrl: './public-playlists.component.html',
})
export class PublicPlaylistsComponent {
  @ViewChild(ToastComponent) toast!: ToastComponent;
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
        this.error = true;
        this.loading = false;
      },
    });
  }

  follow(playlistId: string) {
    this.spotify.followPlaylist(playlistId).subscribe({
      next: () => {
        this.toast.show('Seguiste la playlist con éxito');
      },
      error: (err) => {
        this.toast.show('Ocurrió un error al seguir la playlist');
      },
    });
  }
}
