import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ApproveCommentsComponent } from './components/comments/approve-comments/approve-comments.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ExportCommentsComponent } from './components/comments/export-comments/export-comments.component';
import { ViewCommentsComponent } from './components/comments/view-comments/view-comments.component';
import { ContactComponent } from './components/contact/contact.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/security/auth.guard';
import { ApproveUsersComponent } from './components/users/approve-users/approve-users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'comments', canActivate: [AuthGuard], children: [
      { path: '', component: CommentsComponent },
      { path: 'approve-comments', component: ApproveCommentsComponent },
      { path: 'view-comments', component: ViewCommentsComponent },
      { path: 'export-comments', component: ExportCommentsComponent }
    ]
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'users', canActivate: [AuthGuard], children: [
      { path: '', component: UsersComponent },
      { path: 'approve-users', component: ApproveUsersComponent },
      { path: 'create-user', component: CreateUserComponent },
      { path: 'update-user/:id', component: UpdateUserComponent },
    ]
  },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
