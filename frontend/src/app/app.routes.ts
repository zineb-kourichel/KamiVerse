import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { KamiList } from './pages/kami-list/kami-list';
import { KamiDetail } from './pages/kami-detail/kami-detail';
import { Quiz } from './pages/quiz/quiz';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'kami', component: KamiList },
  { path: 'kami/:id', component: KamiDetail },
  { path: 'quiz', component: Quiz },
];