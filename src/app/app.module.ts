import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {TagComponent} from "./pages/tags/tag/tag.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "./layout/header/header.component";
import {LoadingComponent} from "./layout/loading/loading.component";
import {PrincipalComponent} from "./pages/principal/principal.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import {ListClientsComponent} from "./pages/clients/list-clients/list-clients.component";
import {FormClientsComponent} from "./pages/clients/form-clients/form-clients.component";

@NgModule({
    declarations: [
        AppComponent,
        TagComponent,
        HeaderComponent,
        LoadingComponent,
        NotFoundComponent,
        PrincipalComponent,
        FormClientsComponent,
        ListClientsComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
