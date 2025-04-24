import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf, NgFor, DatePipe } from '@angular/common';
import { SpotifyService } from '../../core/services/spotify.service';

@Component({
  selector: 'app-artist-albums',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, DatePipe, RouterModule],
  templateUrl: './artist-albums.component.html',
})
export class ArtistAlbumsComponent {
  albums: any[] = [];
  loading = true;
  error = false;
  artistId: string = '';

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService,
    private router: Router
  ) {
    const idFromRoute = this.route.snapshot.paramMap.get('id');

    if (!idFromRoute) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.artistId = idFromRoute;
    localStorage.setItem('artistId', this.artistId);

    this.spotify.getArtistAlbums(this.artistId).subscribe({
      next: (res: any) => {
        this.albums = res.items ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  goToTracks(albumId: string) {
    this.router.navigate(['/album', albumId, 'tracks']);
  }
}
