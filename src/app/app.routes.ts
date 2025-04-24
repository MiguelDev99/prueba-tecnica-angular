import { Routes } from '@angular/router';
import { CallbackComponent } from './auth/callback/callback.component';
import { LoginComponent } from './auth/login/login.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { ArtistAlbumsComponent } from './artist/albums/artist-albums.component';
import { AlbumTracksComponent } from './artist/albums/tracks/album-tracks.component';
import { UserPlaylistsComponent } from './user/playlists/user-playlists.component';
import { PublicPlaylistsComponent } from './explore/playlists/public-playlists.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [noAuthGuard] },
    { path: 'callback', component: CallbackComponent, canActivate: [noAuthGuard] },
    { path: 'search', canActivate: [authGuard], component: SearchBarComponent },
    { path: 'artist/:id/albums', canActivate: [authGuard], component: ArtistAlbumsComponent },
    { path: 'album/:id/tracks', canActivate: [authGuard], component: AlbumTracksComponent },
    { path: 'playlists', canActivate: [authGuard], component: UserPlaylistsComponent },
    { path: 'public-playlists', canActivate: [authGuard], component: PublicPlaylistsComponent },
];
