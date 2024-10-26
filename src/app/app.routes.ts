import { Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { SuperAdminGuard } from './guards/superadmin.guard';
import { ConnexionGuard } from './guards/connexion.guard';
import { SeanceCreateComponent } from './seance/seance-create/seance-create.component';
import { SeanceListComponent } from './seance/seance-list/seance-list.component';
import { SeanceUpdateComponent } from './seance/seance-update/seance-update.component';
import { SeanceShowComponent } from './seance/seance-show/seance-show.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserShowComponent } from './user/user-show/user-show.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProfilComponent } from './connexion/profil/profil.component';
import { WeekListComponent } from './week/week-list/week-list.component';
import { WeekCreateComponent } from './week/week-create/week-create.component';
import { WeekShowComponent } from './week/week-show/week-show.component';
import { WeekUpdateComponent } from './week/week-update/week-update.component';

export const routes: Routes = [
  { path: '', component: WeekListComponent, canActivate: [ConnexionGuard] },
  { path: 'seance-create/:weekId/:id', component: SeanceCreateComponent, canActivate: [ConnexionGuard] },
  { path: 'seance-list', component: SeanceListComponent, canActivate: [AdminGuard,ConnexionGuard] },
  { path: 'seance-update/:id', component: SeanceUpdateComponent, canActivate: [ConnexionGuard] },
  { path: 'seance-show/:id', component: SeanceShowComponent, canActivate: [ConnexionGuard] },
  { path: 'user-list', component: UserListComponent, canActivate: [AdminGuard,ConnexionGuard] },
  { path: 'user-show/:id', component: UserShowComponent, canActivate: [AdminGuard,ConnexionGuard] },
  { path: 'user-update/:id', component: UserUpdateComponent, canActivate: [SuperAdminGuard,ConnexionGuard] },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [ConnexionGuard] },
  { path: 'week-list', component: WeekListComponent, canActivate: [ConnexionGuard] },
  { path: 'week-create', component: WeekCreateComponent, canActivate: [ConnexionGuard] },
  { path: 'week-show/:id', component: WeekShowComponent, canActivate: [ConnexionGuard] },
  { path: 'week-update/:id', component: WeekUpdateComponent, canActivate: [ConnexionGuard] },
];
