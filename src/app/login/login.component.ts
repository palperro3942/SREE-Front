import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { AlumnoService } from '../services/alumno.service';
//import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent //implements OnInit //
{
  

  /*activeClass: boolean;
  login_form: FormGroup = new FormGroup({});
  isCheck: any;

  /*constructor( private fb: FormBuilder, private servicio: AlumnoService, private route: Router ) { 
    this.activeClass = true;
  }

  onClick(){
    this.activeClass = !this.activeClass
  }

  ngOnInit(): void {

    this.login_form = this.fb.group( {
      nro_cuenta: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      password: ['', [Validators.required]]
    } );

  }

  sendLogin(): void {
    
    if( this.login_form.valid ){
      this.servicio.loginAlumno(
        { 
          nro_cuenta: this.login_form.controls['nro_cuenta'].value,
          contraseña: this.login_form.controls['password'].value
        }
      ).subscribe( (data) => {

        localStorage.setItem('info_alumno', JSON.stringify(data));  
        this.route.navigate(['/Inicio']);

      },
      (error) => {
        Swal.fire({
          title: 'Error de inicio de sesión',
          html: 'Error: ' + 'Datos no válidos o cuenta inexistente, intentelo de nuevo... ',
          icon: 'error',
          customClass: {
            container: 'my-swal',
          },
        })
      } )
    }else {
      Swal.fire({
        title: 'Error de registro',
        html: 'Por favor, llene todos los campos correctamente e inténtelo de nuevo.',
        icon: 'error',
        customClass: {
          container: 'my-swal',
        },
      });
    }



  }/*/

}
