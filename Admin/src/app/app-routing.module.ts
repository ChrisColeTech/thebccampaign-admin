import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ApproveCommentsComponent } from './components/comments/approve-comments/approve-comments.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ExportCommentsComponent } from './components/comments/export-comments/export-comments.component';
import { ViewCommentsComponent } from './components/comments/view-comments/view-comments.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'comments', children: [
      { path: '', component: CommentsComponent },
      { path: 'approve-comments', component: ApproveCommentsComponent },
      { path: 'view-comments', component: ViewCommentsComponent },
      { path: 'export-comments', component: ExportCommentsComponent }
    ]
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
