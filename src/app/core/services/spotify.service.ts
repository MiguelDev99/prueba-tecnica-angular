import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private baseUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  searchArtists(query: string) {
    const token = localStorage.getItem('access_token');

    return this.http.get(`${this.baseUrl}/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: 'artist',
        limit: 10,
      },
    });
  }
  getArtistAlbums(artistId: string) {
    const token = localStorage.getItem('access_token');
  
    return this.http.get(`${this.baseUrl}/artists/${artistId}/albums`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        include_groups: 'album',
        limit: 20,
      },
    });
  }
  getAlbumTracks(albumId: string) {
    const token = localStorage.getItem('access_token');
  
    return this.http.get(`${this.baseUrl}/albums/${albumId}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 50,
      },
    });
  }
  getUserPlaylists() {
    const token = localStorage.getItem('access_token');
  
    return this.http.get(`${this.baseUrl}/me/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 20,
      },
    });
  }
  followPlaylist(playlistId: string) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return throwError(() => new Error('No access token'));
    }
  
    return this.http.put(
      `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
      {}, // cuerpo vacío
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }
  
  getPlaylistsByUser(userId: string) {
    const token = localStorage.getItem('access_token');
  
    return this.http.get(`${this.baseUrl}/users/${userId}/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 20,
      },
    });
  }
  
}
