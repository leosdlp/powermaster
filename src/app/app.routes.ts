import { Routes } from '@angular/router';
import { SeanceCreateComponent } from './seance/seance-create/seance-create.component';
import { SeanceListComponent } from './seance/seance-list/seance-list.component';
import { SeanceUpdateComponent } from './seance/seance-update/seance-update.component';
import { SeanceShowComponent } from './seance/seance-show/seance-show.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProfilComponent } from './connexion/profil/profil.component';
import { WeekListComponent } from './week/week-list/week-list.component';
import { WeekCreateComponent } from './week/week-create/week-create.component';
import { WeekShowComponent } from './week/week-show/week-show.component';
import { WeekUpdateComponent } from './week/week-update/week-update.component';

export const routes: Routes = [
  { path: '', component: WeekListComponent },
  { path: 'seance-create/:weekId/:id', component: SeanceCreateComponent },
  { path: 'seance-list', component: SeanceListComponent },
  { path: 'seance-update/:id', component: SeanceUpdateComponent },
  { path: 'seance-show/:id', component: SeanceShowComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'week-list', component: WeekListComponent },
  { path: 'week-create', component: WeekCreateComponent },
  { path: 'week-show/:id', component: WeekShowComponent },
  { path: 'week-update/:id', component: WeekUpdateComponent },
];
