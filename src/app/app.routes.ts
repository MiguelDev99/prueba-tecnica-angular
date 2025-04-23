import { Routes } from '@angular/router';
import { CallbackComponent } from './auth/callback/callback.component';
import { LoginComponent } from './auth/login/login.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { ArtistAlbumsComponent } from './artist/albums/artist-albums.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'search', component: SearchBarComponent },
    { path: 'artist/:id/albums', component: ArtistAlbumsComponent },
];
