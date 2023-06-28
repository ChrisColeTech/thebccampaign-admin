import { NgModule } from '@angular/core';
import { ApproveCommentsComponent } from './comments/approve-comments/approve-comments.component';
import { CommentsComponent } from './comments/comments.component';
import { ViewCommentsComponent } from './comments/view-comments/view-comments.component';
import { MaterialModule } from '../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        CommentsComponent,
        ViewCommentsComponent,
        ApproveCommentsComponent,
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
        ViewCommentsComponent,
        ApproveCommentsComponent,
    ]
})
export class ComponentsModule { }