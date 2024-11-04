import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { HorarioComponent } from './components/horario/horario.component';
import { PuertaComponent } from './components/puerta/puerta.component';
import { RegistroPuertaComponent } from './components/registro-puerta/registro-puerta.component';

export const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'acceso', component: AccesoComponent },
  { path: 'horario', component: HorarioComponent },
  { path: 'puerta', component: PuertaComponent },
  { path: 'registro-puerta', component: RegistroPuertaComponent },
  { path: '', redirectTo: '/usuario', pathMatch: 'full' }, // Redirecciona a la página de usuario al inicio
];
