import { Component, OnInit } from '@angular/core';
import { MusicaService } from '../musicas.service';


import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  musicas: any = [];
  musicasPlaylist: Array<any> = [];

  public orderDesc = true;

  constructor(private musicaService: MusicaService) { }

  ngOnInit() {

  }

  public enableRemove = false;
  public enableAdd = false;
  public pesquisaUsuarioRealizada(playList: any) {
    if (playList != null) {
      this.enableAdd = true;
      this.enableRemove = true;
      this.musicasPlaylist = [];
      playList.playlistMusicas.forEach((play) => {
        this.musicasPlaylist.push(play.musica);
      })
    }
    else {
      this.enableAdd = true;
      this.enableRemove = true;
    }
  }

  public pesquisaMusicaRealizada(musicas: any) {
    this.OrderByArray(musicas, "nome").map(item => item.nome);
    this.musicas = musicas;
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
    let resultFind = this.musicasPlaylist.filter(filter => filter.id === musica.id);
    if (resultFind != null && resultFind[0].id === musica.id) {
      if (resultFind[0].checked === true) {
        resultFind[0].checked = false;
      }
      else {
        resultFind[0].checked = true;
      }
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
    this.musicas.find(function (element) {
      if (element.id === musica.id) {
        if (element.checked === true) {
          element.checked = false;
        }
        else {
          element.checked = true;
        }
      }
    });
  }

  public criaPlaylist() {
    this.musicaService.putPlayList([])
      .toPromise().then((resposta: any) => {
        if (resposta.status == "200") {
          this.musicas.forEach((musica) => {
            let resFind = this.musicasPlaylist.filter(f => f.id == musica.id);

            if (musica.checked === true && resFind.length == 0) {
              let newMusica = {
                checked: false, id: musica.id,
                nome: musica.nome, artista: musica.artista
              };
              this.musicasPlaylist.push(newMusica)
            }
          })
          this.OrderByArray(this.musicasPlaylist, "nome").map(item => item.nome);
        }
      })
  }

  public removerMusicas() {
    for (let index = this.musicasPlaylist.length; index--; index >= 0) {
      let musica = this.musicasPlaylist[index];
      if (musica.checked === true) {
        this.musicaService.deleteMusicaPlayList(musica)
          .subscribe((result) => {

            let index = this.musicasPlaylist.indexOf(musica);
            this.musicasPlaylist.splice(index, 1);
          });
      }
    }
  }

  public ordenarListaMusica(value: any) {
    if (value === "nome") {
      this.OrderByArray(this.musicas, "nome").map(item => item.nome);
    }
    else {
      this.OrderByArtistaArray(this.musicas, "nome").map(item => item.nome);
    }

    this.orderDesc = !this.orderDesc;
  }
}
