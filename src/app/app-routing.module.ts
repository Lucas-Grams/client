import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListClientsComponent} from "./pages/clients/list-clients/list-clients.component";
import {PrincipalComponent} from "./pages/principal/principal.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'principal'
  },
  {
    path: 'principal',
    component: PrincipalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
