import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() inicioSesionExitoso: EventEmitter<any> = new EventEmitter<any>();

  profesor: any;
  nroEmpleado: string = '';
  contra: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  iniciarSesion(): void {
    const url = 'http://localhost:3000/profesores/login';
    const body = {
      nro_empleado: this.nroEmpleado,
      contra: this.contra
    };

    this.http.post(url, body).subscribe(
      (response) => {
        this.router.navigate(['/profesores'], { state: { profesor: response } });
      },
      (error) => {
        // Manejar el error de inicio de sesión...
        console.log('Error en el inicio de sesión:', error);
      }
    );
  }
}
