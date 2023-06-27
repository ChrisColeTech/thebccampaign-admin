import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewCommentsComponent } from './comments/view-comments/view-comments.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: ViewCommentsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
