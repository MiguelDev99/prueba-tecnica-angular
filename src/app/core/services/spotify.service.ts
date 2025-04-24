import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private baseUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  searchArtists(query: string) {
    return this.http.get(`${this.baseUrl}/search`, {
      params: {
        q: query,
        type: 'artist',
        limit: 10,
      },
    });
  }

  getArtistAlbums(artistId: string) {
    return this.http.get(`${this.baseUrl}/artists/${artistId}/albums`, {
      params: {
        include_groups: 'album',
        limit: 20,
      },
    });
  }

  getAlbumTracks(albumId: string) {
    return this.http.get(`${this.baseUrl}/albums/${albumId}/tracks`, {
      params: {
        limit: 50,
      },
    });
  }

  getUserPlaylists() {
    return this.http.get(`${this.baseUrl}/me/playlists`, {
      params: {
        limit: 20,
      },
    });
  }

  followPlaylist(playlistId: string) {
    return this.http.put(
      `${this.baseUrl}/playlists/${playlistId}/followers`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getPlaylistsByUser(userId: string) {
    return this.http.get(`${this.baseUrl}/users/${userId}/playlists`, {
      params: {
        limit: 20,
      },
    });
  }
}
