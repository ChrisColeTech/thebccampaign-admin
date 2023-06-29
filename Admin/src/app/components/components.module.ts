import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ApproveCommentsComponent } from './comments/approve-comments/approve-comments.component';
import { CommentsComponent } from './comments/comments.component';
import { ExportCommentsComponent } from './comments/export-comments/export-comments.component';
import { ViewCommentsComponent } from './comments/view-comments/view-comments.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { UsersComponent } from './users/users.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { ApproveUserComponent } from './users/approve-user/approve-user.component';
import { LoginComponent } from './users/login/login.component';

@NgModule({
    declarations: [
        CommentsComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        ViewCommentsComponent,
        ApproveCommentsComponent,
        ExportCommentsComponent,
        UsersComponent,
        CreateUserComponent,
        UpdateUserComponent,
        DeleteUserComponent,
        ApproveUserComponent,
        LoginComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        MaterialModule,
    ],
    exports: [
        CommentsComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        ViewCommentsComponent,
        ApproveCommentsComponent,
        ExportCommentsComponent
    ]
})
export class ComponentsModule { }