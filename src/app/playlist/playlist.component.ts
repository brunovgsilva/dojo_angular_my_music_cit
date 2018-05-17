import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input() musicasPlaylist: Array<any> = new Array<any>();
  @Output() removerTodasMusicas: EventEmitter<any> = new EventEmitter<any>()
  @Output() removerMusica: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit() {

  }

  public selecionarTodasMusicas(checked: any) {
    this.removerTodasMusicas.emit(checked);
  }

  public selecionarMusica(musica: any) {
    this.removerMusica.emit(musica)
  }

}
