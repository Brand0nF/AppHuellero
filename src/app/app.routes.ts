import { Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';  // Importa el guardia de autenticación
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UbicacionesComponent } from './components/ubicaciones/ubicaciones.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },  // Protege la ruta
  { path: 'ubicaciones', component: UbicacionesComponent, canActivate: [AuthGuard]}
];
