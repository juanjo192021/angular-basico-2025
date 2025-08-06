import { Routes } from '@angular/router';
import { CounterPage } from './pages/counter/counter-page';
import { HeroPage } from './pages/hero/hero-page';
import { DragonballPage } from './pages/dragonball/dragonball';
import { DragonballSuperPage } from './pages/dragonball-super/dragonball-super';

export const routes: Routes = [
  {
    path: '',
    component: CounterPage
  },
  {
    path: 'hero',
    component: HeroPage
  },
  {
    path: 'dragonball',
    component: DragonballPage
  },
  {
    path: 'dragonball-super',
    component: DragonballSuperPage
  },
  {
    path: '**',
    redirectTo: '',
  }
];
