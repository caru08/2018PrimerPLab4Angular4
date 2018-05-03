import { Routes } from '@angular/router';
import { AppComponent} from './app.component';


export const ROUTES: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: '', component: AppComponent }

];


