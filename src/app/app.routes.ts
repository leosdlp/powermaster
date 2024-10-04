import { Routes } from '@angular/router';
// import { SeanceCreateComponent } from './seance/seance-create.component';
import { SeanceCreateComponent } from './seance/seance-create/seance-create.component';
import { SeanceListComponent } from './seance/seance-list/seance-list.component';
import { SeanceUpdateComponent } from './seance/seance-update/seance-update.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProfilComponent } from './connexion/profil/profil.component';

export const routes: Routes = [
  { path: '', component: SeanceCreateComponent },
  { path: 'seance-create', component: SeanceCreateComponent },
  { path: 'seance-list', component: SeanceListComponent },
  { path: 'seance-update', component: SeanceUpdateComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-update', component: UserUpdateComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'profil', component: ProfilComponent },
];
