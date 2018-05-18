import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { MusicaService } from '../../musicas.service';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import "rxjs/add/operator/takeUntil";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';

import { Musica } from '../../musica.model'

@Component({
  selector: 'app-pesquisa-musica',
  templateUrl: './pesquisa-musica.component.html',
  styleUrls: ['./pesquisa-musica.component.css']
})

export class PesquisaMusicaComponent implements OnInit, OnDestroy {

  @Output() pesquisaRealizada: EventEmitter<any> = new EventEmitter<any>()
  public obsFind: Observable<any>;
  private subjectPesquisa: Subject<string> = new Subject<string>()
  public subscription: Subscription;

  constructor(private musicaService: MusicaService) { }

  ngOnInit() {
    this.inicializaObjetoPesquisa();
  }

  ngOnDestroy() {
    if (this.subscription != null)
      this.subscription.unsubscribe();
  }

  public inicializaObjetoPesquisa() {
    this.obsFind = this.subjectPesquisa
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap((termoBusca: string) => {
        if (termoBusca.trim().length > 1)
          return this.musicaService.getMusicas(termoBusca);
        else {
          return Observable.of<Musica[]>([]);
        }
      }).catch((erro: any) => {
        console.log('Chamada do catch ' + erro); return Observable.of<any>([])
      });

    this.subscription = this.obsFind.subscribe((result: Musica[]) => {
      this.pesquisaRealizada.emit(result);
    })
  }

  public pesquisar(nomeMusica: string) {
    this.subjectPesquisa.next(nomeMusica);
  }
}
