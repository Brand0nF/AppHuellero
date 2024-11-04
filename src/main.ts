import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { UsuarioComponent } from './app/components/usuario/usuario.component';
import { AccesoComponent } from './app/components/acceso/acceso.component';
import { HorarioComponent } from './app/components/horario/horario.component';
import { PuertaComponent } from './app/components/puerta/puerta.component';
import { RegistroPuertaComponent } from './app/components/registro-puerta/registro-puerta.component';
import { LoginComponent } from './app/login/login.component'; // Asegúrate de crear este componente

// Definición de las rutas
const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'acceso', component: AccesoComponent },
  { path: 'horario', component: HorarioComponent },
  { path: 'puerta', component: PuertaComponent },
  { path: 'registro-puerta', component: RegistroPuertaComponent },
  { path: 'login', component: LoginComponent }, // Ruta para el login
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirecciona al login por defecto
];

// Bootstrap de la aplicación
bootstrapApplication(UsuarioComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule // Necesario para hacer solicitudes HTTP en el servicio de autenticación
    ),
  ],
});
