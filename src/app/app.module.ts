import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ListClientsComponent} from "./pages/clients/list-clients/list-clients.component";
import {PrincipalComponent} from "./pages/principal/principal.component";
import {HeaderComponent} from "./layout/header/header.component";
import {LoadingComponent} from "./layout/loading/loading.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import {FormClientsComponent} from "./pages/clients/form-clients/form-clients.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {TagComponent} from "./pages/tags/tag/tag.component";

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HeaderComponent,
    NotFoundComponent,
    PrincipalComponent,
    ListClientsComponent,
    FormClientsComponent,
      TagComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
