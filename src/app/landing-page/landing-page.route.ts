import { Routes } from "@angular/router";

export const landingPageRoute:Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/landing-layout/landing-layout').then(m => m.LandingLayout),
    children: [
        {
            path: '',
            loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage)
        },
        {
            path: '**',
            redirectTo: ''
        }
    ]

  }
]