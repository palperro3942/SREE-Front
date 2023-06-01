import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // no olvidar obtenerlo del api
  nombreMaestro: string = 'Nombre del Maestro';

  constructor() { }

  ngOnInit(): void {
  }
}