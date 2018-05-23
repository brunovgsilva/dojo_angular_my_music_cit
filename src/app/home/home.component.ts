import { Component, OnInit } from '@angular/core';
import { MusicaService } from '../musicas.service';

import { Observable } from 'rxjs/Rx';

import { Musica } from '../musica.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public enableRemove: boolean;
  public enableAdd: boolean;
  musicas: Musica[] = [];
  musicasPlaylist: Array<Musica> = [];

  public orderDesc = true;

  constructor(private musicaService: MusicaService) { }

  ngOnInit() {

  }

  public pesquisaMusicaRealizada(musicas: Musica[]) {
    if (musicas != null) {
      this.OrderByArray(musicas, "nome").map(item => item.nome);
      this.musicas = musicas;
      this.musicas.forEach(element => {
        element.checked = false;
      });
    }
  }

  public pesquisaUsuarioRealizada(playList: any) {
    this.musicasPlaylist = [];
    if (playList != null && playList.playlistMusicas != null) {
      this.enableAdd = true;
      this.enableRemove = true;
      playList.playlistMusicas.forEach((play) => {
        this.musicasPlaylist.push(play.musica);
      })
    } else {
      this.enableAdd = true;
      this.enableRemove = true;
    }
  }

  public OrderByArray(values: any[], orderType: any) {
    return values.sort((a, b) => {
      if (a[orderType] < b[orderType]) {
        return this.orderDesc ? 1 : -1;
      }

      if (a[orderType] > b[orderType]) {
        return !this.orderDesc ? 1 : -1;
      }

      return 0
    });
  }

  public OrderByArtistaArray(values: any[], orderType: any) {
    return values.sort((a, b) => {
      if (a['artista'].nome < b['artista'].nome) {
        return this.orderDesc ? 1 : -1;
      }

      if (a['artista'].nome > b['artista'].nome) {
        return !this.orderDesc ? 1 : -1;
      }

      return 0
    });
  }

  public removerTodasMusicas(checked: any) {
    if (checked === true) {
      this.musicasPlaylist.forEach(element => {
        element.checked = true;
      });
    }
    else {
      this.musicasPlaylist.forEach(element => {
        element.checked = false;
      });
    }
  }

  public removerMusica(musica: any) {
    const resultFind = this.musicasPlaylist.filter(filter => filter.id === musica.id);
    if (resultFind != null && resultFind[0].id === musica.id) {
      if (resultFind[0].checked === true) {
        resultFind[0].checked = false;

      }
      else
        resultFind[0].checked = true;
    }
  }

  public selecionarTodasMusicas(checked: any) {
    if (checked === true) {
      this.musicas.forEach(element => {
        element.checked = true;
      });
    }
    else {
      this.musicas.forEach(element => {
        element.checked = false;
      });
    }
  }

  public selecionarMusica(musica: any) {
    const results: Musica[] = this.musicas.filter(m => m.id === musica.id);
    if (results != null && results.length > 0) {
      const resultMusic: Musica = results[0];
      if (resultMusic.checked === true) {
        resultMusic.checked = false;
      }
      else
        resultMusic.checked = true;
    }
  }

  public criaPlaylist() {    
    this.musicaService.putPlayList([])
      .toPromise().then((resposta: any) => {
        console.log(resposta)
        if (resposta.status == "200") {
          this.musicas.forEach((musica) => {
            const resFind = this.musicasPlaylist.filter(f => f.id === musica.id);

            if (musica.checked === true && resFind.length === 0) {
              const newMusica = new Musica();
              newMusica.checked = false;
              newMusica.id = musica.id;
              newMusica.nome = musica.nome;
              newMusica.artista = musica.artista
              this.musicasPlaylist.push(newMusica);
            }
          });

          this.OrderByArray(this.musicasPlaylist, "nome").map(item => item.nome);
        }
      })
  }

  public removerMusicas() {
    for (let index = this.musicasPlaylist.length; index--; index >= 0) {
      const musica = this.musicasPlaylist[index];
      if (musica.checked === true) {
        this.musicaService.deleteMusicaPlayList(musica)
          .subscribe((result) => {
            const indexPlayList = this.musicasPlaylist.indexOf(musica);
            this.musicasPlaylist.splice(indexPlayList, 1);
          });
      }
    }
  }

  public ordenarListaMusica(value: any) {
    if (value === "nome") {
      this.OrderByArray(this.musicas, "nome").map(item => item.nome);
    } else {
      this.OrderByArtistaArray(this.musicas, "nome").map(item => item.nome);
    }

    this.orderDesc = !this.orderDesc;
  }
}
