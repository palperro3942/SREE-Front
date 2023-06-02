import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {
  alumnos: any[] = [];
  grupos: any[] = [];
  grupoSeleccionado: any;
  alumnosFiltrados: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerAlumnos();
  }

  obtenerAlumnos(): void {
    this.obtenerGrupos();
    // Hacer la petición HTTP para obtener los datos de los alumnos desde el backend API REST
    this.http.get<any[]>('http://localhost:3000/alumnos').subscribe(
      (response) => {
        this.alumnos = response;
        // Obtener los grupos únicos de los alumnos
        const gruposUnicos = [...new Set(this.alumnos.map((alumno) => alumno.grupo))];
        // Construir la lista de grupos con el formato requerido
        this.grupos = gruposUnicos.map((grupo) => ({ grupo }));
        // Después de obtener los datos de los alumnos, asociar los grupos
        this.alumnos.forEach((alumno) => {
          alumno.grupo = alumno.grupo;
        });
        console.log('Alumnos Obtenidos:', this.alumnos); // debug
        // Filtrar los grupos después de obtener los alumnos
        this.filtrarGrupos({ target: { value: '1' } });        
      },
      (error) => {
        console.log('Error al obtener los datos de los alumnos:', error);
      }
    );
  }

  obtenerGrupos(): void {
    this.http.get<any[]>('http://localhost:3000/grupos').subscribe(
      (grupos: any[]) => {
        this.grupos = grupos;
      },
      (error) => {
        console.error('Error al obtener los grupos:', error);
      }
    );
    console.log('Grupos filtrados:', this.grupos); // debug
  }

  filtrarGrupos(event: any): void {
    const valor = event.target.value;
    if (valor === 'todos') {
      this.alumnosFiltrados = [...this.alumnos];
    } else {
      this.alumnosFiltrados = this.alumnos.filter((alumno) => String(alumno.grupo) === valor);
    }
    console.log('Alumnos filtrados:', this.alumnosFiltrados); // debug
    this.grupoSeleccionado = valor;
  }

  getNombreCompleto(alumno: any): string {
    return `${alumno.nombre} ${alumno.apellido_1} ${alumno.apellido_2}`;
  }
}
