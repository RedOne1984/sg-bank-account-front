import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {NgModule} from '@angular/core';
import {OperationsComponent} from './components/operations/operations.component';
import {OperationsGuardService} from './guards/operations-guard.service';
import {HistoryComponent} from './components/history/history.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'operations',
    canActivate: [OperationsGuardService],
    component: OperationsComponent
  },
  {
    path: 'history',
    canActivate: [OperationsGuardService],
    component: HistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
