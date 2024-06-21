import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

    options = [
        {label: 'Gerenciar Clientes', value: 1},
        {label: 'Cadastrar Clientes', value: 2},
        {label: 'Gerenciar Tags', value: 3},
    ];
    option: number = 1;

    constructor(
        private router: Router,
    ) {}

    ngOnInit(): void {}

    onChange(event: number) {
        let route;
        switch (event) {
            case 1:
                route = '/gerenciar-clientes'
                this.option = 1;
                break;
            case 2:
                route = '/cadastrar-cliente'
                this.option = 2;
                break;
            case 3:
                route = '/gerenciar-tags'
                this.option = 3;
                break;
        }
        this.router.navigate([route]);
    }
}
