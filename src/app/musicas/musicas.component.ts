import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-musicas',
  templateUrl: './musicas.component.html',
  styleUrls: ['./musicas.component.css']
})

export class MusicasComponent implements OnInit {

  @Input() listaMusicas: Array<any> = new Array<any>();
  @Output() adicionado: EventEmitter<any> = new EventEmitter<any>()
  @Output() selecionarTodas: EventEmitter<any> = new EventEmitter<any>()
  @Output() ordenarMusica: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit() {

  }

  public selecionarMusica(musica: any) {
    this.adicionado.emit(musica);
  }

  public selecionarTodasMusicas(checked: any) {
    this.selecionarTodas.emit(checked);
  }

  public ordernarListaMusica(fieldName: any) {
    this.ordenarMusica.emit(fieldName);
  }
}
