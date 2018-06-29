import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MusicasComponent } from './musicas/musicas.component';

import { MusicaService } from './musicas.service';
import { PesquisaMusicaComponent } from './home/pesquisa-musica/pesquisa-musica.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PesquisaPlaylistComponent } from './home/pesquisa-playlist/pesquisa-playlist.component';
import { DropDownComponent } from './drop-down/drop-down.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MusicasComponent,
    PesquisaMusicaComponent,
    PlaylistComponent,
    PesquisaPlaylistComponent,
    DropDownComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFontAwesomeModule
  ],
  providers: [MusicaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
