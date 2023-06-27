import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './app.material.module';
import { ComponentsModule } from './components/components.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ComponentsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],

  bootstrap: [AppComponent]
})
export class AppModule { }
