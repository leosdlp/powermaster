import { Routes } from '@angular/router';
// import { SeanceCreateComponent } from './seance/seance-create.component';
import { SeanceCreateComponent } from './seance/seance-create/seance-create.component';
import { SeanceListComponent } from './seance/seance-list/seance-list.component';
import { SeanceUpdateComponent } from './seance/seance-update/seance-update.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProfilComponent } from './connexion/profil/profil.component';
import { WeekListComponent } from './week/week-list/week-list.component';
import { WeekCreateComponent } from './week/week-create/week-create.component';

export const routes: Routes = [
  { path: '', component: SeanceCreateComponent },
  { path: 'seance-create', component: SeanceCreateComponent },
  { path: 'seance-list', component: SeanceListComponent },
  { path: 'seance-update', component: SeanceUpdateComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'week-list', component: WeekListComponent },
  { path: 'week-create', component: WeekCreateComponent },
];
