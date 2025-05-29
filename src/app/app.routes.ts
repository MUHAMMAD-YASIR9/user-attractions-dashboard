import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () =>
            import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'users',
        loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
    },
    {
        path: 'attractions',
        loadChildren: () => import('./features/attractions/attractions.module').then(m => m.AttractionsModule)
    },
    {
        path: 'pet-sales',
        loadChildren: () => import('./features/pet-sales/pet-sales.module').then(m => m.PetSalesModule)
    }

];
