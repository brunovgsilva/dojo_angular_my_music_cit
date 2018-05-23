import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { Injectable } from '@angular/core';

import { HttpModule, Response, ResponseOptions, ResponseOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppComponent } from '../app.component';
import { HomeComponent } from './home.component';
import { MusicasComponent } from '../musicas/musicas.component';
import { PesquisaMusicaComponent } from './pesquisa-musica/pesquisa-musica.component';
import { PlaylistComponent } from '../playlist/playlist.component';
import { PesquisaPlaylistComponent } from './pesquisa-playlist/pesquisa-playlist.component';

import { MusicaService } from '../musicas.service';
import { Musica } from '../musica.model'
import { By } from '@angular/platform-browser';

class MockService extends MusicaService {
  public getMusicas(filter: string): Observable<Musica[]> {
    let listMusic = [{ id: "1", nome: "Musica 01", artistaId: "1", checked: false, artista: { nome: "Bruno", id: "1" } }];
    return Observable.of<Musica[]>(listMusic);
  }

  public putPlayList(musicas: Array<Musica>): Observable<Response> {
    console.log('Testado')
    return Observable.of<Response>(new Response(new ResponseOptions()));
  }
}

fdescribe('HomeComponent', () => {
  //Teste Unitários
  const componentUnit = new HomeComponent(null);
  let musicas: Musica[] = [];
  let componentService;

  xit('Deve ser criado uma Lista de Musicas diferente de vazio', () => {
    this.musicas = [{ id: "1", nome: "Musica 01", artistaId: "1", checked: false, artista: { nome: "Bruno", id: "1" } }];
    componentUnit.pesquisaMusicaRealizada(this.musicas);
    expect(component.musicas.length > 0).toBeTruthy();
  });

  xit('Deve ser criado uma Lista de Musicas vazia', () => {
    this.musicas = []
    componentUnit.pesquisaMusicaRealizada(this.musicas);
    expect(component.musicas.length == 0).toBeTruthy();
  });

  xit('Deve ser criado uma Lista de Musicas vazia', () => {
    this.musicas = null;
    componentUnit.pesquisaMusicaRealizada(this.musicas);
    expect(component.musicas.length == 0).toBeTruthy();
    expect(this.musicas).toBeDefined();
  });

  //Teste do Componente

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let musicaService: MusicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,
        HomeComponent,
        MusicasComponent,
        PesquisaMusicaComponent,
        PlaylistComponent,
        PesquisaPlaylistComponent],
      providers: [MusicaService],
      imports: [
        HttpModule
      ]
    }).compileComponents();

    // TestBed.overrideComponent(HomeComponent, {
    //   set: {
    //     providers: [{
    //       provide: MusicaService, useClass: MockService
    //     }]
    //   }
    // })

    this.musicas = null;

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    musicaService = TestBed.get(MusicaService);
    this.musicas = [{ id: "1", nome: "Musica 01", artistaId: "1", checked: false, artista: { nome: "Bruno", id: "1" } },
    { id: "2", nome: "Musica 02", artistaId: "1", checked: false, artista: { nome: "Bruno", id: "1" } }];
    spyOn(musicaService, 'getMusicas').and.returnValue(Observable.of<Musica[]>(this.musicas))
    spyOn(musicaService, 'putPlayList');

    componentService = fixture.debugElement.injector.get(MusicaService);
  });

  it('Deve se preencher a tabela de musicas', () => {
    let input = fixture.debugElement.query(By.css('#nomeMusica')).nativeElement;
    input.value = "Bruno";
    
    musicaService.getMusicas(input.value);
    component.pesquisaMusicaRealizada(this.musicas);
    fixture.detectChanges();
    let id = fixture.debugElement.query(By.css('table > tbody'));
    expect(id.nativeElement.childElementCount > 0).toBeTruthy()
  });

  it('Método GetMusicas do Serviço, precisa ser chamado uma vez', () => {

    let input = fixture.debugElement.query(By.css('#nomeMusica')).nativeElement;
    input.value = "Bruno";    
    musicaService.getMusicas(input.value);
    component.pesquisaMusicaRealizada(this.musicas);
    fixture.detectChanges();
    let id = fixture.debugElement.query(By.css('h2'));
    expect(id.nativeElement.textContent).toEqual("My Music")
    expect(musicaService.getMusicas).toHaveBeenCalledTimes(1);
    expect(musicaService.getMusicas).toHaveBeenCalledWith('Bruno');
  });

  it('Método executa Adicionar Playlist', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    let btn = fixture.debugElement.query(By.css('#btnAdd'));
    btn.triggerEventHandler('click', null);
    tick();
    expect(musicaService.putPlayList).toHaveBeenCalledTimes(0);
  }));

});
