import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() inicioSesionExitoso: EventEmitter<any> = new EventEmitter<any>();
  
  nroEmpleado: string = '';
  contra: string = '';
  urlprincipal = "https://apiv2.powerhashing.io";  //WebProd
  //urlprincipal = "http://localhost:3000";         //DevMode
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  iniciarSesion(): void {
    const url = this.urlprincipal+'/profesores/login';
    const body = {
      nro_empleado: this.nroEmpleado,
      contra: this.contra
    };

    this.http.post(url, body).subscribe(
      (response) => {
        this.authService.guardarUsuario(response); // Guardar el usuario en el AuthService
        this.router.navigate(['/profesores']);
      },
      (error) => {
        // Manejar el error de inicio de sesión...
        console.log('Error en el inicio de sesión:', error);
      }
    );
  }
}
