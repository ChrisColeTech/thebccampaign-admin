import { NgModule } from '@angular/core';
import { AlertsService } from './alerts-service/alerts.service';
@NgModule({
    exports: [
        AlertsService
    ]
})
export class ComponentsModule { }