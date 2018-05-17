import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http, Response } from "@angular/http"

import { MusicaService } from '../../musicas.service'

@Component({
  selector: 'app-pesquisa-playlist',
  templateUrl: './pesquisa-playlist.component.html',
  styleUrls: ['./pesquisa-playlist.component.css']
})
export class PesquisaPlaylistComponent implements OnInit {

  constructor(private musicaService: MusicaService) { }

  @Output() public pesquisaUsuarioRealizada: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  public pesquisar(nomeUsuario: string) {
    let resultPlaylist = null;
    if (nomeUsuario.length > 0) {
      this.musicaService.getPlaylists(nomeUsuario)
        .then((result: any) => {
          if (result._body != null && result._body != "")
            resultPlaylist = result.json();
          this.pesquisaUsuarioRealizada.emit(resultPlaylist);
        });
    }
    else
      this.pesquisaUsuarioRealizada.emit(resultPlaylist);
  }

}
