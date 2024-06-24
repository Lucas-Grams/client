import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TagComponent} from "./pages/tags/tag/tag.component";
import {NotFoundComponent} from "./layout/not-found/not-found.component";
import {ListClientsComponent} from "./pages/clients/list-clients/list-clients.component";
import {FormClientsComponent} from "./pages/clients/form-clients/form-clients.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'gerenciar-clientes'
    },
    {
        path: 'gerenciar-clientes',
        component: ListClientsComponent
    },
    {
        path: 'cadastrar-cliente',
        component: FormClientsComponent
    },
    {
        path: 'editar-cliente/:uuid',
        component: FormClientsComponent
    },
    {
        path: 'gerenciar-tags',
        component: TagComponent
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
