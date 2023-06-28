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

@NgModule({
    declarations: [
        CommentsComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        ViewCommentsComponent,
        ApproveCommentsComponent,
        ExportCommentsComponent
    ],
    imports: [
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