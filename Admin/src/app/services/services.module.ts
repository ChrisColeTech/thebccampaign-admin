import { NgModule } from '@angular/core';
import { AlertsService } from './alerts-service/alerts.service';
import { CommentService } from './comments/comments-service';
@NgModule({
    exports: [
        AlertsService,
        CommentService
    ]
})
export class ServicesModule { }