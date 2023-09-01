import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfesoresComponent } from './profesores/profesores.component';


const appRoutes : Routes = [

  { path:'', component : LoginComponent},
  { path:'profesores', component: ProfesoresComponent},
 
]

@NgModule({
  imports: [
    RouterModule,
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }