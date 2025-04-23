import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgIf, NgFor, DatePipe } from '@angular/common';
import { SpotifyService } from '../../core/services/spotify.service';

@Component({
  selector: 'app-artist-albums',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, DatePipe],
  templateUrl: './artist-albums.component.html',
})
export class ArtistAlbumsComponent {
  albums: any[] = [];
  loading = true;
  error = false;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService, private router: Router) {
    const artistId = this.route.snapshot.paramMap.get('id');

    if (!artistId) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.spotify.getArtistAlbums(artistId).subscribe({
      next: (res: any) => {
        this.albums = res.items ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener álbumes:', err);
        this.error = true;
        this.loading = false;
      },
    });
  }
  goToTracks(albumId: string) {
    this.router.navigate(['/album', albumId, 'tracks']);
  }
}
