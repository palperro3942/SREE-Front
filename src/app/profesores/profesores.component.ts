import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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
  profesor: any;
  carreras: string[] = ['Ing. Software','Ing. Civil', 'Ing. Geodesia'];
  carreraSeleccionada: string | null = null;
  materias: string[] = ['IHC','Lenguajes de Programacion','POO','Ingenieria de Software'];
  materiaSeleccionada: string[] = [];
  materiasFiltradas: string[] = [];
  datos: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerAlumnos();
    this.obtenerEstrategias();
    this.route.paramMap.subscribe((params) => {
      const profesor = params.get('profesor');
      if (profesor) {
        this.profesor = JSON.parse(profesor);
        this.obtenerMaterias();
        console.log('Profesor:', this.profesor);
      }
    });
  }

  obtenerEstrategias(): void{
    const id = 4; //debug reemplaza por id de alumno seleccionado

    const url = `http://localhost:3000/perfil-final-inventario-de-felder/${id}`;
    this.http.get(url).subscribe(
      (response: any) => {
        this.datos = response;
        console.log(this.datos);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  obtenerMaterias(): void {
    const url = 'http://localhost:3000/materias';
    this.http.get<any[]>(url).subscribe(
      (materias: any[]) => {
        this.materiasFiltradas = materias.filter((materia) => materia.id_profesor === this.profesor.id_profesor);
        console.log('Materias filtradas:', this.materiasFiltradas, this.profesor);
      },
      (error) => {
        console.error('Error al obtener las materias:', error);
      }
    );
  }

  obtenerAlumnos(): void {
    this.obtenerGrupos();

    this.http.get<any[]>('http://localhost:3000/alumnos').subscribe(
      (response) => {
        this.alumnos = response;
        const gruposUnicos = [...new Set(this.alumnos.map((alumno) => alumno.grupo))];
        this.grupos = gruposUnicos.map((grupo) => ({ grupo }));
        this.alumnos.forEach((alumno) => {
          alumno.grupo = alumno.grupo;
        });
        console.log('Alumnos Obtenidos:', this.alumnos);
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
    console.log('Grupos filtrados:', this.grupos);
  }

  filtrarGrupos(event: any): void {
    const valor = event.target.value;
    if (valor === 'todos') {
      this.alumnosFiltrados = [...this.alumnos];
    } else {
      this.alumnosFiltrados = this.alumnos.filter((alumno) => String(alumno.grupo) === valor);
    }
    console.log('Alumnos filtrados:', this.alumnosFiltrados);
    this.grupoSeleccionado = valor;
  }

  onCarreraSelectionChange(){
    //todo carreras
  }

  getNombreCompleto(alumno: any): string {
    return `${alumno.nombre} ${alumno.apellido_1} ${alumno.apellido_2}`;
  }
}
