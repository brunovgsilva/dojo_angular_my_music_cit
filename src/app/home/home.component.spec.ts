import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

import { MusicaService } from '../musicas.service';
import { Musica } from '../musica.model'

fdescribe('HomeComponent', () => {
  const component = new HomeComponent(null);  
  it('Testando Preenchimento da Lista de Musicas', () => {
    const musicas : Musica[] = [{ id: "1", nome: "Musica 01", artistaId: "1" }];
    component.pesquisaMusicaRealizada(musicas);
    expect(component.musicas.length > 0).toBeTruthy();
  });

  it('Testando Preenchimento da Lista de Musicas', () => {
    const musicas = []
    component.pesquisaMusicaRealizada(musicas);
    expect(component.musicas.length > 0).toBeTruthy();
  });

  it('Testando Preenchimento da Lista de Musicas', () => {
    const musicas = null;
    component.pesquisaMusicaRealizada(musicas);
    expect(component.musicas.length > 0).toBeTruthy();
  });
});
