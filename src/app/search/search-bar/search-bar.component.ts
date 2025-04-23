import { Component } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify.service';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, DecimalPipe ],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  searchTerm = '';
  artists: any[] = [];

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  onSearch() {
    if (!this.searchTerm.trim()) return;

    this.spotifyService.searchArtists(this.searchTerm).subscribe((res: any) => {
      this.artists = res.artists.items;
      console.log('Artistas encontrados:', this.artists);
    });
  }
  goToAlbums(artistId: string) {
    console.log('ID del artista:', artistId);
    this.router.navigate(['/artist', artistId, 'albums']);
  }
}
