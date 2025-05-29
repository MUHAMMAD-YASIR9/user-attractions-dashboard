import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetSalesComponent } from './components/pet-sales/pet-sales.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
      path: '',
      component: PetSalesComponent,
      canActivate: [authGuard],
      data: { title: 'Pet Sales Statistics' }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetSalesRoutingModule { }
