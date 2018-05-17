import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MusicaService } from '../../musicas.service'

import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { Subscription } from 'rxjs/Subscription'
import { Subject } from 'rxjs/Subject'

@Component({
  selector: 'app-pesquisa-musica',
  templateUrl: './pesquisa-musica.component.html',
  styleUrls: ['./pesquisa-musica.component.css']
})
export class PesquisaMusicaComponent implements OnInit {

  constructor(private musicaService: MusicaService) { }
  @Output() pesquisaRealizada: EventEmitter<any> = new EventEmitter<any>()

  ngOnInit() {
  }

  public "nome-musica": string = null;
  public pesquisar(nomeMusica: string) {
    if (nomeMusica.length > 3) {
      this.musicaService.getMusicas(nomeMusica)
        .subscribe((result: any) => {
          this.pesquisaRealizada.emit(result.json());
        });
    }
    else{
      this.pesquisaRealizada.emit([]);
    }
  }

}
