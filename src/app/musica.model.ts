
import { Artista } from './artista.model'

export class Musica {
    constructor() {
        this.checked = false;
    }

    public id: string;
    public nome: string;
    public artistaId: string;
    public checked: boolean;
    public artista: Artista;
}