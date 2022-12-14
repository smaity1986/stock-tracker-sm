import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './component/main/main.component';
import { SentimentComponent } from './component/sentiment/sentiment.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  {
    path: 'sentiment/:symbol',
    component: SentimentComponent,
    pathMatch: 'full',
  },

  { path: '**', component: MainComponent, redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
