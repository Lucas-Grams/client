import {Component} from "@angular/core";

@Component({
    selector: 'app-not-found',
    template: `
        <div class="text-center">
            <div class="page-not-found">
                <h1>404</h1>
                <h2>Página Não Encontrada</h2>
                <p>Desculpe, a página que você está procurando não existe.</p>
                <a routerLink="/">Voltar para a Página Inicial</a>
            </div>
        </div>
    `,
    styleUrls: ['not-found.component.css']
})
export class NotFoundComponent {}
