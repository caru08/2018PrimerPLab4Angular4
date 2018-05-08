import { Routes } from '@angular/router';
import { AppComponent} from './app.component';
import { LoginFormComponent } from './components/login-form.component';
import { ListadoPersonasComponent } from './components/listadoPersonas.component';
import { FormPersonaComponent } from './components/form-persona.component';


export const ROUTES: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: AppComponent },
  { path: 'Listado', component: ListadoPersonasComponent },
  { path: 'Login', component: LoginFormComponent },
  { path: 'Persona', component: FormPersonaComponent}

];


