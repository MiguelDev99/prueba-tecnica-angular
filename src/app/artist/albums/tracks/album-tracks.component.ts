import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { SpotifyService } from '../../../core/services/spotify.service';

@Component({
  selector: 'app-album-tracks',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, RouterLink],
  templateUrl: './album-tracks.component.html',
})
export class AlbumTracksComponent {
  tracks: any[] = [];
  loading = true;
  error = false;
  artistId: string | null = null;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {
    const albumId = this.route.snapshot.paramMap.get('id');
    this.artistId = this.route.snapshot.paramMap.get('artistId') || localStorage.getItem('artistId');

    if (!albumId) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.spotify.getAlbumTracks(albumId).subscribe({
      next: (res: any) => {
        this.tracks = res.items ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
