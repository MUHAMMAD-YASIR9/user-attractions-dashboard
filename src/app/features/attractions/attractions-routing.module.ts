import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttractionListComponent } from './components/attraction-list/attraction-list.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AttractionListComponent,
    canActivate: [authGuard],
    data: { title: 'Attractions Management' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttractionsRoutingModule { }
