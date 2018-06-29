import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})

export class DropDownComponent implements OnInit {

  constructor() { }

  public listItem = [{ Name: "Item 01", Exibe: true }, { Name: "Item 02", Exibe: true },
  { Name: "Item 03", Exibe: true }, { Name: "Item 04", Exibe: true }];
  public valueItem: string = "";
  public exibeLista = false;

  ngOnInit() {
  }

  public pesquisarItem(event: Event) {
    let value = (<HTMLInputElement>event.target).value;
    this.listItem.forEach(element => {
      if (element.Name.indexOf(value) > -1) {
        element.Exibe = true;
      }
      else
        element.Exibe = false;
    });
  }

  public selecionarOpcao(value) {
    this.valueItem = value;
  }

  public MostrarLista() {
    if (this.exibeLista)
      this.exibeLista = false;
    else
      this.exibeLista = true;
  }
}
