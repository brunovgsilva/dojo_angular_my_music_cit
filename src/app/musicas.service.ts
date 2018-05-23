import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Guid } from 'guid-typescript';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

import { Observable } from 'rxjs/Observable'

import { Musica } from './musica.model'

@Injectable()
export class MusicaService {

    constructor(private http: Http) {
    }

    public urlService = 'https://intense-ocean-93206.herokuapp.com/api/';

    public getMusicas(filter: string): Observable<Musica[]> {
        const apiUrl = this.urlService + "musicas/?filtro=" + filter;
        return this.http.get(apiUrl)
            .map(x => x.json());
    }

    public getPlaylists(usuario: string): Promise<any> {
        const apiUrl = this.urlService + "playlists/?user=" + usuario;
        return this.http.get(apiUrl).toPromise();
    }

    public putPlayList(musicas: Array<Musica>) {
        const idUsuario = Guid.create();
        const apiUrl = this.urlService + "playlists/" + idUsuario + "/musicas";
        return this.http.put(apiUrl, []);
    }

    public deleteMusicaPlayList(musica: any) {
        const idUsuario = Guid.create();
        const apiUrl = this.urlService + "playlists/" + idUsuario + "/musicas/" + musica.id;
        return this.http.delete(apiUrl);
    }
}
