import { Routes } from '@angular/router';
import { CounterPage } from './pages/counter/counter-page';
import { HeroPage } from './pages/hero/hero-page';

export const routes: Routes = [
  {
    path: '',
    component: CounterPage
  },
  {
    path: 'hero',
    component: HeroPage
  }
];
