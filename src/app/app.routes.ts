import { Routes } from '@angular/router';
import { CallbackComponent } from './auth/callback/callback.component';
import { LoginComponent } from './auth/login/login.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { ArtistAlbumsComponent } from './artist/albums/artist-albums.component';
import { AlbumTracksComponent } from './artist/albums/tracks/album-tracks.component';
import { UserPlaylistsComponent } from './user/playlists/user-playlists.component';
import { PublicPlaylistsComponent } from './explore/playlists/public-playlists.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'search', component: SearchBarComponent },
    { path: 'artist/:id/albums', component: ArtistAlbumsComponent },
    { path: 'album/:id/tracks', component: AlbumTracksComponent },
    { path: 'playlists', component: UserPlaylistsComponent },
    { path: 'public-playlists', component: PublicPlaylistsComponent },
];
