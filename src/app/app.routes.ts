import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./landing-page/landing-page.route').then(m => m.landingPageRoute)   
    },
    {
        path:"**",
        redirectTo: ''
    }
];
