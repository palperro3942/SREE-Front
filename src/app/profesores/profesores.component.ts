import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent {
  alumnos: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Hacer la petición HTTP para obtener los datos de los alumnos desde el backend API REST
    this.http.get<any[]>('http://localhost:3000/alumnos').subscribe(
      (response) => {
        this.alumnos = response;
      },
      (error) => {
        console.log('Error al obtener los datos de los alumnos:', error);
      }
    );
  }
}
